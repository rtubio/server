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

import logging

from django import test

from services.common import helpers as db_tools
from services.leop import views as leop_views


class TestLeopViews(test.TestCase):
    """Test class for the LEOP views.
    """

    def setUp(self):

        self.__verbose_testing = False

        self.__sc_id = 'humsat-d'
        self.__ufo_id = 'object-111'

        self.__user_1 = db_tools.create_user_profile()
        self.__user_2 = db_tools.create_user_profile(username='User2')

        self.__request_1 = db_tools.create_request(user_profile=self.__user_1)
        self.__request_2 = db_tools.create_request(user_profile=self.__user_2)

        self.__sc = db_tools.create_sc(
            user_profile=self.__user_1, identifier=self.__sc_id
        )

        self.__ufo = db_tools.create_sc(
            user_profile=self.__user_2, identifier=self.__ufo_id, is_ufo=True
        )

        self.__admin = db_tools.create_user_profile(
            username='user_admin',
            email='admin@satnet.org',
            is_staff=True
        )
        self.__request_3 = db_tools.create_request(user_profile=self.__admin)
        self.__cluster = db_tools.create_launch(admin=self.__admin)

        if not self.__verbose_testing:
            logging.getLogger('leop').setLevel(level=logging.CRITICAL)

    def test_get_queryset(self):
        """Unit test: services.leop - view processing
        Simply checks this method of the LeopManagementView since it had to
        be implemented slightly different than what expected beforehand.
        """
        cm = leop_views.LaunchManagementView()
        cm.request = self.__request_1

        qs = cm.get_queryset()
        self.assertEqual(len(qs), 0, 'No LEOPs should be owned by user 1.')

        cm.request = self.__request_3
        qs_2 = cm.get_queryset()
        self.assertEqual(len(qs_2), 1, '1 LEOP should be owned by user 2.')
