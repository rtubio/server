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

from datetime import timedelta as py_timedelta
from django import test
import logging
logger = logging.getLogger('simulation')

from services.common import misc as sn_misc
from services.common import helpers as db_tools
from services.configuration.models import tle as tle_models
from services.simulation.models import passes as pass_models


class TestModels(test.TestCase):
    """Test class for the pass model methods
    """

    def setUp(self):
        """Database setup for the tests.
        """
        self.__verbose_testing = False

        self.__user = db_tools.create_user_profile()
        self.__request_1 = db_tools.create_request(user_profile=self.__user)

        self.__gs_1_id = 'gs-uvigo'
        self.__gs_1 = db_tools.create_gs(
            user_profile=self.__user, identifier=self.__gs_1_id
        )

        self.__sc_1_id = 'xatcobeo-sc'
        self.__sc_1_tle_id = 'CANX-2'
        self.__sc_1 = db_tools.create_sc(
            user_profile=self.__user,
            identifier=self.__sc_1_id, tle_id=self.__sc_1_tle_id,
        )

    def test_pass_models(self):
        """UNIT test: services.simulation.create_pass_slots_sc
        Validation of the creation of the pass slots
        """

        # 1) pass slots creation
        sc_slots_1 = pass_models.PassSlots.objects.create_pass_slots_sc(
            self.__sc_1
        )
        self.assertIsNot(
            len(sc_slots_1), 0,
            'Spacecraft pass slots should have been created'
        )
        gs_slots_1 = pass_models.PassSlots.objects.create_pass_slots_gs(
            self.__gs_1
        )
        self.assertIsNot(
            len(gs_slots_1), 0,
            'Groundstation pass slots should have been created'
        )
        self.assertTrue(
            pass_models.PassSlots.objects.filter(
                spacecraft=self.__sc_1
            ).exists(),
            'Spacecraft associated pass slots should have been created'
        )
        self.assertTrue(
            pass_models.PassSlots.objects.filter(
                groundstation=self.__gs_1
            ).exists(),
            'GroundStation associated pass slots should have been created'
        )

        # 2) pass slots removal
        pass_models.PassSlots.objects.remove_pass_slots_sc(self.__sc_1)
        self.assertFalse(
            pass_models.PassSlots.objects.filter(
                spacecraft=self.__sc_1
            ).exists(),
            'Spacecraft associated pass slots should have been removed'
        )
        pass_models.PassSlots.objects.remove_pass_slots_gs(self.__gs_1)
        self.assertFalse(
            pass_models.PassSlots.objects.filter(
                groundstation=self.__gs_1
            ).exists(),
            'GroundStation associated pass slots should have been removed'
        )

    def test_create_passes(self):
        """UNIT test: services.simulation.models.passes
        This test validates the creation of an availability slot and the
        further automatic rejections for the creation of availability slots
        that match the start and end of this one.
        """

        slot_s = sn_misc.get_next_midnight()
        slot_e = slot_s + py_timedelta(days=1)

        self.assertIsNotNone(
            pass_models.PassSlots.objects.create(
                spacecraft=self.__sc_1, groundstation=self.__gs_1,
                start=slot_s, end=slot_e
            )
        )
        self.assertIsNone(
            pass_models.PassSlots.objects.create(
                spacecraft=self.__sc_1, groundstation=self.__gs_1,
                start=slot_s, end=slot_e
            )
        )

        slot_s = slot_s + py_timedelta(days=1)
        slot_e = slot_s + py_timedelta(days=1)

        self.assertIsNotNone(
            pass_models.PassSlots.objects.create(
                spacecraft=self.__sc_1, groundstation=self.__gs_1,
                start=slot_s, end=slot_e
            )
        )
        self.assertIsNone(
            pass_models.PassSlots.objects.create(
                spacecraft=self.__sc_1, groundstation=self.__gs_1,
                start=slot_s, end=slot_e
            )
        )

    def test_firebird(self):
        """UNIT test: Firebird TLE bug
        Test carried out to find what is the problem with the Firebird TLE and
        UVIGO groundstation.
        """
        self.__tle_fb = tle_models.TwoLineElement.objects.create(
            'testingsource',
            db_tools.ISS_TLE_ID, db_tools.ISS_TLE[0], db_tools.ISS_TLE[1]
        )
        self.__sc_fb = db_tools.create_sc(
            user_profile=self.__user, tle_id=db_tools.ISS_TLE_ID
        )

        self.__gs_uvigo_id = 'uvigo-gs'
        self.__gs_uvigo_e = 0
        self.__gs_uvigo_lat = 42.170075
        self.__gs_uvigo_lng = -8.68826

        self.__gs_uvigo = db_tools.create_gs(
            user_profile=self.__user,
            identifier=self.__gs_uvigo_id,
            latitude=self.__gs_uvigo_lat,
            longitude=self.__gs_uvigo_lng,
            contact_elevation=self.__gs_uvigo_e
        )

    def test_passes_reboot(self):
        """UNIT test: services.simulation.models - passes generation REBOOT
        This test validates that subsequent attempts to generate passes do not
        succeed in case that for the given update window, the passes had
        already been generated.
        """

        # 1) consecutive propagations should not be permitted
        logger.debug('#### FIRST PART OF THE TEST, CURRENT INTERVAL')

        pass_models.PassSlots.objects.propagate()
        sc_passes_n_1 = pass_models.PassSlots.objects.filter(
            spacecraft=self.__sc_1
        ).count()
        pass_models.PassSlots.objects.propagate()
        sc_passes_n_2 = pass_models.PassSlots.objects.filter(
            spacecraft=self.__sc_1
        ).count()
        self.assertEquals(sc_passes_n_1, sc_passes_n_2)

        # 2) now, we change the interval of application for avoiding reboots
        logger.debug('#### SECOND PART OF THE TEST, FUTURE INTERVAL')

        interval = (
            sn_misc.get_next_midnight() + py_timedelta(days=30),
            sn_misc.get_next_midnight() + py_timedelta(days=33)
        )
        pass_models.PassSlots.objects.propagate(interval=interval)
        sc_passes_n_3 = pass_models.PassSlots.objects.filter(
            spacecraft=self.__sc_1
        ).count()
        self.assertGreater(sc_passes_n_3, sc_passes_n_2)
        pass_models.PassSlots.objects.propagate(interval=interval)
        sc_passes_n_4 = pass_models.PassSlots.objects.filter(
            spacecraft=self.__sc_1
        ).count()
        self.assertEquals(sc_passes_n_4, sc_passes_n_3)
