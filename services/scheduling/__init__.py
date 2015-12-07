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

# Necessary to import this module here for rpc4django to detect the RPC methods.
from services.scheduling.jrpc.views import availability
from services.scheduling.jrpc.views import compatibility
from services.scheduling.jrpc.views.operational import groundstations
from services.scheduling.jrpc.views.operational import slots
from services.scheduling.jrpc.views.operational import spacecraft

# Import signal receivers
from services.scheduling.signals import availability
from services.scheduling.signals import compatibility
from services.scheduling.signals import operational
