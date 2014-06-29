"""
   Copyright 2013, 2014 Ricardo Tubio-Pardavila

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
"""
__author__ = 'rtubiopa@calpoly.edu'

from datetime import timedelta
import ephem

from booking.models import tle
from common import misc
from common import gis


class OrbitalSimulator(object):
    """
    This class holds all the methods necessary for the simulation of the
    passes of the Spacecraft over GroundStations.
    """

    # Flag that indicates whether the simulator should assume that it is
    # being used for a test and, therefore, return hard coded results. These
    # hard-coded results can be used instead of unpredictable slots and,
    # therefore, the behavior of the functions that depend on the results of
    # the simulations can be verified.
    _test_mode = False

    # Observer for the simulation (GroundStation simulation object).
    _observer = None
    # Body for the simulation (Spacecraft simulation object).
    _body = None
    # TLE in use for the simulation (taken from Spacecraft).
    _tle = None

    def __init__(self, reload_tle_database=False):
        """
        Initializes the OrbitalSimulator, updating the TLE's if required.
        :param reload_tle_database: Reloads the TLE's database if so required.
        """
        super(OrbitalSimulator, self).__init__()
        if reload_tle_database:
            tle.TwoLineElementsManager.load_tles()

    @staticmethod
    def create_test_operational_slots():
        """
        Static method that creates the OperationalSlots to be used for
        testing purposes.
        :return: List with the testing OperationalSlots.
        """
        now = misc.get_now_utc()
        return [
            (now, now+timedelta(hours=2)),
            (now+timedelta(days=1, hours=1), now+timedelta(days=1, hours=6)),

        ]

    @staticmethod
    def ephem_date_2_utc_datetime(e_date):
        """
        Method that converts an Ephem.date object into a Python Datetime object
        located in the UTC timezone.
        :param e_date: The Ephem.date object to be converted.
        :return: The resulting Python UTC-aware Datetime object.
        """
        return misc.localize_datetime_utc(e_date.datetime())

    @staticmethod
    def datetime_2_ephem_string(dt):
        """
        Converts a datetime object into a string that can be used as an input
        for the Ephem implementation of the Date object: 'yyyy/mm/dd hh:ii:ss'
        # ### Datetime object does not
        :param dt: Datetime object to be converted.
        :return: String to be used as an input for the date object.
        """
        if dt is None:
            dt = misc.get_today_utc()
        return dt.strftime("%Y/%m/%d %I:%M:%S")

    def set_groundstation(self, groundstation):
        """
        Creates an PyEphem observer object with the data from a GroundStation
        object.
        :param groundstation: Object from where to take the data required
        """
        self._observer = ephem.Observer()
        self._observer.lat = gis.decimal_2_degrees(groundstation.latitude)
        self._observer.lon = gis.decimal_2_degrees(groundstation.longitude)
        self._observer.horizon = gis.decimal_2_degrees(
            groundstation.contact_elevation
        )
        self._observer.elevation = groundstation.altitude

    def set_spacecraft(self, spacecraft):
        """
        Creates an PyEphem body object with the data from a Spacecraft object.
        :param spacecraft: Object from where to take the data required
        """
        self._tle = tle.TwoLineElement.objects.get(
            identifier=spacecraft.tle_id
        )
        self._body = OrbitalSimulator.create_spacecraft(
            l0=self._tle.identifier,
            l1=self._tle.first_line,
            l2=self._tle.second_line
        )

    @staticmethod
    def create_spacecraft(l0, l1, l2):
        """
        Method to convert a Spacecraft object from the database into a PyEphem
        spacecraft that can be used with that same library for simulation
        purposes.
        :param l0: Line#0 of the TLE file.
        :param l1: Line#1 of the TLE file.
        :param l2: Line#2 of the TLE file.
        :return: The object that has to be used with the PyEphem library.
        :raises: ObjectDoesNotExist in case there is no cush tle_id in the
        database.
        """
        return ephem.readtle(str(l0), str(l1), str(l2))

    def calculate_pass_slots(self, availability_slots):
        """
        Calculates the passess for the given spacecraft over the ground_station,
        for all the availability slots included in the list.
        :param availability_slots: List of tuples with UTC DateTime objects
        defining the slots of availability.
        :return: A list with all the pass slots linked with the AvailabilitySlot
        that generated them.
        """
        pass_slots = []

        for a_slot_i in availability_slots:

            pass_slots.append((
                self.calculate_pass_slot(a_slot_i[0], a_slot_i[1]),
                a_slot_i[2]
            ))

        return pass_slots

    def calculate_pass_slot(
        self, start, end, minimum_slot_duration=timedelta(minutes=1)
    ):
        """
        Calculates the passes available for the given spacecraft in between the
        start and end dates.
        :param start: The datetime object (UTC) that defines the start of the
        simulation.
        :param end: The datetime object (UTC) that defines the end of the
        simulation.
        :return: List with the datetime objects (UTC) with the passess for
        the given Spacecraft over the given GroundStation
        :raises ephem.CircumpolarError: Raised whenever a pass for a given
        simulation is either always up or the satellite never shows up above the
        defined horizon.
        """
        if self._test_mode:
            return OrbitalSimulator.create_test_operational_slots()

        pass_slots = []
        self._observer.date = OrbitalSimulator.datetime_2_ephem_string(start)
        last_end = start

        while last_end < end:

            tr, azr, tt, altt, ts, azs = self._observer.next_pass(self._body)
            self._body.compute(self._observer)

            dt_tr = misc.localize_datetime_utc(tr.datetime())
            dt_ts = misc.localize_datetime_utc(ts.datetime())

            if dt_tr > end:
                break

            if dt_ts > end:
                slot_end = end
            else:
                slot_end = dt_ts

            if (slot_end - dt_tr) > minimum_slot_duration:
                pass_slots.append((dt_tr, slot_end))

            self._observer.date = ts + ephem.minute
            last_end = misc.localize_datetime_utc(
                self._observer.date.datetime()
            )

        return pass_slots

    def set_debug(self, on):
        """
        This method sets the OrbitalSimulator debug mode ON (on=True) or OFF
        (on=False).
        """
        self._test_mode = on

    def __unicode__(self):

        return '# ### Body (Spacecraft): ' + str(self._body)\
               + '\n* l0 = ' + self._tle.identifier\
               + '\n* l1 = ' + self._tle.first_line\
            + '\n* l2 = ' + self._tle.second_line\
            + '\n# ### Observer (Ground Station):'\
            + '\n* (lat, long) = (' + str(self._observer.lat) + ', '\
               + str(self._observer.lon) + ')'\
            + '\n* elevation = ' + str(self._observer.elevation)\
            + '\n* horizon = ' + str(self._observer.horizon)\
            + '\n* date = ' + str(self._observer.date)