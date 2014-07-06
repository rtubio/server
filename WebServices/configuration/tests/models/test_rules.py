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

import datadiff
import datetime
from django import test
import logging

from common import misc, simulation, testing as db_tools
from configuration.jrpc import rules as jrpc_rules_if
from configuration.models import availability, rules


class TestRules(test.TestCase):

    def setUp(self):

        self.__verbose_testing = False

        if not self.__verbose_testing:
            logging.getLogger('configuration').setLevel(level=logging.CRITICAL)

        self.__gs_1_id = 'gs-castrelos'
        self.__gs_1_ch_1_id = 'chan-cas-1'

        db_tools.init_available()
        db_tools.init_tles_database()
        self.__band = db_tools.create_band()
        self.__user_profile = db_tools.create_user_profile()
        self.__gs_1 = db_tools.create_gs(
            user_profile=self.__user_profile, identifier=self.__gs_1_id,
        )
        self.__gs_1_ch_1 = db_tools.gs_add_channel(
            self.__gs_1, self.__band, self.__gs_1_ch_1_id
        )

    def test_1_a_slots_daily(self):
        """
        Validates the generation of slots by a daily rule.
        """
        if self.__verbose_testing:
            print '>>> test_1_generate_available_slots_daily:'

        now = misc.get_now_utc()
        r_1_s_time = now + datetime.timedelta(minutes=30)
        r_1_e_time = now + datetime.timedelta(minutes=45)

        r_cfg = db_tools.create_jrpc_daily_rule(
            starting_time=r_1_s_time,
            ending_time=r_1_e_time
        )
        r_1_id = jrpc_rules_if.add_rule(
            self.__gs_1_id, self.__gs_1_ch_1_id, r_cfg
        )

        rs = rules.AvailabilityRuleManager.get_applicable_rule_values(
            self.__gs_1_ch_1
        )
        if self.__verbose_testing:
            misc.print_list(rs, list_name='Rules')

        expected = [
            (
                r_1_s_time,
                r_1_e_time
            ),
            (
                r_1_s_time + datetime.timedelta(days=1),
                r_1_e_time + datetime.timedelta(days=1),
            ),
            (
                r_1_s_time + datetime.timedelta(days=2),
                r_1_e_time + datetime.timedelta(days=2),
            ),
        ]
        actual = rules.AvailabilityRuleManager.generate_available_slots_daily(
            rs[0][0],
        )

        if self.__verbose_testing:
            print '>>> window = ' + str(
                simulation.OrbitalSimulator.get_simulation_window()
            )
            misc.print_list(actual, list_name='Generated Slots')

        self.assertEquals(
            actual, expected, 'Wrong slots, diff = ' + str(datadiff.diff(
                actual, expected
            ))
        )

        jrpc_rules_if.remove_rule(self.__gs_1_id, self.__gs_1_ch_1_id, r_1_id)

    def test_2_a_slots_daily_first_cut(self):
        """
        This test validates the generation of AvailabilitySlots by a daily
        rule when the slot has already started.
        """
        if self.__verbose_testing:
            print '>>> test_2_a_slots_daily_first_cut:'

        now = misc.get_now_utc()
        r_1_s_time = now - datetime.timedelta(minutes=30)
        r_1_e_time = now + datetime.timedelta(minutes=30)

        r_cfg = db_tools.create_jrpc_daily_rule(
            starting_time=r_1_s_time,
            ending_time=r_1_e_time
        )
        r_1_id = jrpc_rules_if.add_rule(
            self.__gs_1_id, self.__gs_1_ch_1_id, r_cfg
        )

        if self.__verbose_testing:
            print '$ window = ' + str(
                simulation.OrbitalSimulator.get_simulation_window()
            )
            misc.print_list(rules.AvailabilityRule.objects.all())
            misc.print_list(availability.AvailabilitySlot.objects.all())

        expected = [
            (now, r_1_e_time),
            (
                r_1_s_time + datetime.timedelta(days=1),
                r_1_e_time + datetime.timedelta(days=1),
            ),
            (
                r_1_s_time + datetime.timedelta(days=2),
                r_1_e_time + datetime.timedelta(days=2),
            ),
        ]
        actual = list(
            availability.AvailabilitySlot.objects.values_list(
                'start', 'end'
            )
        )

        if self.__verbose_testing:
            misc.print_list(actual, list_name='ACTUAL_VALUES')
            misc.print_list(expected, list_name='EXPECTED_LIST')

        self.assertEquals(
            actual, expected, 'Wrong slots, diff = ' + str(datadiff.diff(
                actual, expected
            ))
        )

        jrpc_rules_if.remove_rule(self.__gs_1_id, self.__gs_1_ch_1_id, r_1_id)