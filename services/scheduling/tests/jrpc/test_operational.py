
import datetime
from django import test as django_test
from services.common import misc as common_misc
from services.scheduling.jrpc.views.operational import slots as scheduling_slots

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


class JRPCBookingProcessTest(django_test.TestCase):
    """Testing class for the slot information process
    """

    def setUp(self):
        """
        This method populates the database with some information to be used
        only for this test.
        """
        self.__verbose_testing = False
        self.__test_slot_id = -1

    def test_1_test_slot(self):
        """JRPC test: services.scheduling - TESTING slot
        Basic TEST slot test
        """
        if self.__verbose_testing:
            print('##### test_1_test_slot')

        s_time = common_misc.get_now_utc(no_microseconds=True)
        e_time = s_time + datetime.timedelta(hours=2)

        if self.__verbose_testing:
            print('s_time = ' + str(s_time.isoformat()))
            print('e_time = ' + str(e_time.isoformat()))

        self.assertEquals(
            scheduling_slots.get_slot(self.__test_slot_id), {
                'state': 'TEST',
                'gs_username': 'test-gs-user',
                'sc_username': 'test-sc-user',
                'starting_time': s_time.isoformat(),
                'ending_time': e_time.isoformat()
            }
        )
