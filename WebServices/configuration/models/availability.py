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

:Author:
    Ricardo Tubio-Pardavila (rtubiopa@calpoly.edu)
"""
__author__ = 'rtubiopa@calpoly.edu'

from datetime import timedelta
from django.db import models

from common import misc
from configuration.models.channels import GroundStationChannel
from configuration.models.rules import AvailabilityRule


class AvailabilitySlotsManager(models.Manager):
    """
    Manager for handling the main operations over the availability slots.
    """

    def create(self, groundstation_channel, start, end):
        """
        Creates a new AvailabilitySlot object in the database and associates
        the timestamp for the start of the slot as its identifier.
        :param groundstation_channel Chanel that this slot belongs to.
        :param start Datetime object (UTC localized) with the start of the slot.
        :param end Datetime object (UTC localized) with the end of the slot.
        :return A reference to the new object.
        """
        return super(AvailabilitySlotsManager, self).create(
            identifier=AvailabilitySlot.create_identifier(
                groundstation_channel, start
            ),
            groundstation_channel=groundstation_channel,
            start=start,
            end=end
        )

    def update_slots(self, groundstation_channel, new_slots):
        """
        Updates the table with the availability slots by checking the
        existance of the new ones into the table. If they do not exist,
        it removes them from the database. If they do exist, they are kept in
        the database.
        :param groundstation_channel The GroundStationChannel object that
        generates these new slots.
        :param new_slots List with the new availability slots to be
        cross-checked with the existing ones. The items in this list must be
        tuples of DateTime objects UTC localized.
        """

        # 1) First, slots that do not appear in the current list of available
        # slots, are removed from the database. If the slot is already found
        # in the database, then it will be removed from the given list of
        # availability slots. Therefore, the ones who are left in the list
        # after this first step are those who are available but were not
        # included in the database yet.
        added = []
        removed = []

        for a_slot in self.all():

            s, e = a_slot.start, a_slot.end

            if not (s, e) in new_slots:
                removed.append((s, e))
                a_slot.delete()
            else:
                new_slots.remove((s, e))

        # 2) The remaining slots are added to the database.
        for n_a_slot in new_slots:

            self.create(groundstation_channel, n_a_slot[0], n_a_slot[1])
            added.append((n_a_slot[0], n_a_slot[1]))

        return added, removed

    @staticmethod
    def get_availability_slots(
            groundstation_channel, start=None, duration=timedelta(days=1)
    ):
        """
        This method returns all the availability slots that can be applied
        within the given interval defined by the start and the duration.
        :param groundstation_channel: The channel of the GroundStation.
        :param start: Start of the applicability slot.
        :param duration: The duration of the applicability slot.
        :return: The list of the applicable AvailabilitySlots during the
        defined applicability slot.
        """
        slots = []

        if start is None:
            start = misc.get_midnight()
        end = start + duration

        for a_i in AvailabilitySlot.objects.filter(
            groundstation_channel=groundstation_channel
        ).filter(start__lt=end).filter(end__gt=start):

            if a_i.start < start:
                s_0 = start
            else:
                s_0 = a_i.start
            if a_i.end > end:
                s_1 = end
            else:
                s_1 = a_i.end

            slots.append((s_0, s_1))

        return slots


    @staticmethod
    def availability_rule_updated(sender, instance, **kwargs):
        """
        Callback for updating the AvailabilitySlots table whenenver a new
        rule is added to the database.
        :param sender The object that sent the signal.
        :param instance The instance of the object itself.
        """
        new_slots = AvailabilityRule.objects.get_availability_slots(
            instance.gs_channel
        )
        AvailabilitySlot.objects.update_slots(
            instance.gs_channel, new_slots
        )


class AvailabilitySlot(models.Model):
    """
    This class models the availability slots for the GroundStations. All of
    them will be stored in this table in the database.
    """
    class Meta:
        app_label = 'configuration'

    ID_FIELDS_SEPARATOR = '-'

    objects = AvailabilitySlotsManager()

    identifier = models.CharField(
        'Unique identifier for this slot',
        max_length=100,
        unique=True
    )
    groundstation_channel = models.ForeignKey(
        GroundStationChannel,
        verbose_name='GroundStationChannel that this slot belongs to'
    )
    start = models.DateTimeField('Slot start')
    end = models.DateTimeField('Slot end')

    @staticmethod
    def create_identifier(groundstation_channel, start):

        gs = groundstation_channel.groundstation_set.all()[0]

        return gs.identifier + AvailabilitySlot.ID_FIELDS_SEPARATOR\
            + groundstation_channel.identifier\
            + AvailabilitySlot.ID_FIELDS_SEPARATOR\
            + str(misc.get_utc_timestamp(start))

    def __unicode__(self):
        """
        Unicode string representation of the contents of this object.
        :return: Unicode string.
        """
        return 'id = ' + str(self.identifier) + ', start = '\
               + str(self.start) + ', end = ' + str(self.end)