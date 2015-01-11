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

import rpc4django
from django.core import exceptions as django_ex
from services.configuration.models import segments as segment_models
from services.leop.models import launch as launch_models
from services.leop.jrpc.serializers import launch as launch_serial


@rpc4django.rpcmethod(
    name='leop.gs.list',
    signature=['String'],
    login_required=True
)
def list_groundstations(leop_id, **kwargs):
    """JRPC method (LEOP service).
    Returns the list of groundstations available for creating this LEOP
    system. In case a Ground Station is already in use for this system, it will
    not be listed.
    :param leop_id: Identifier of the LEOP cluster.
    :param kwargs: Dictionary with additional variables like the HTTP request
                    itself (defined by RPC4Django).
    :return: List of the identifiers of the available groundstations.
    """

    # user must be obtained from the request, since this has already been
    # validated by the authentication backend
    http_request = kwargs.get('request', None)
    if not http_request or not http_request.user.is_staff:
        raise django_ex.PermissionDenied()

    leop_cluster = launch_models.Launch.objects.get(identifier=leop_id)

    # List construction: ground stations in use and available for LEOP
    u_gs = leop_cluster.groundstations.all()
    all_gs = segment_models.GroundStation.objects.all()
    a_gs = [item for item in all_gs if item not in u_gs]

    # Serialization to a JSON-RPC-like object
    return launch_serial.serialize_gs_lists(a_gs, u_gs)


@rpc4django.rpcmethod(
    name='leop.gs.add',
    signature=['String', 'Object'],
    login_required=True
)
def add_groundstations(launch_identifier, groundstations, **kwargs):
    """JRPC method (LEOP service).
    Adds the array of GroundStations to the LEOP cluster. If any of the given
    GroundStation identifiers does not exist, the operation is cancelled and
    an 'ObjectDoesNotExist' exception is raised.
    :param launch_identifier: Identifier of the LEOP cluster
    :param groundstations: List with the GroundStations to be added
    :return: Identifier of the just-updated LEOP cluster
    """
    # user must be obtained from the request, since this has already been
    # validated by the authentication backend
    http_request = kwargs.get('request', None)
    if not http_request or not http_request.user.is_staff:
        raise django_ex.PermissionDenied()
    if not groundstations:
        raise Exception('No groundstations provided')

    # Serialization to a JSON-RPC-like object
    return launch_serial.serialize_leop_id(
        launch_models.Launch.objects.add_ground_stations(
            launch_identifier, groundstations
        )
    )


@rpc4django.rpcmethod(
    name='leop.gs.remove',
    signature=['String', 'Object'],
    login_required=True
)
def remove_groundstations(launch_identifier, groundstations, **kwargs):
    """JRPC method (LEOP service).
    Removes the array of GroundStations from the LEOP cluster. If any of the
    given GroundStation identifiers does not exist, the operation is
    cancelled and an 'ObjectDoesNotExist' exception is raised.
    :param launch_identifier: Identifier of the LEOP cluster.
    :param groundstations: List with the GroundStations to be added.
    :return: True if the operation was succesfully completed
    """
    # user must be obtained from the request, since this has already been
    # validated by the authentication backend
    http_request = kwargs.get('request', None)
    if not http_request or not http_request.user.is_staff:
        raise django_ex.PermissionDenied()
    if not groundstations:
        return launch_serial.serialize_leop_id(launch_identifier)

    # Serialization to a JSON-RPC-like object
    return launch_models.Launch.objects.remove_groundstations(
        launch_identifier, groundstations
    )


@rpc4django.rpcmethod(
    name='leop.launch.addUnknown',
    signature=['String', 'int'],
    login_required=True
)
def add_unknown(launch_identifier, identifier, **kwargs):
    """JRPC method
    Adds a new unknown object to the list.
    :param launch_identifier: Identifier of the Launch
    :param identifier: Identifier for the unknown object
    :return: Identifier for the unknown object (int)
    """
    return launch_models.Launch.objects.add_unknown(
        launch_identifier, identifier
    )


@rpc4django.rpcmethod(
    name='leop.launch.removeUnknown',
    signature=['String', 'int'],
    login_required=True
)
def remove_unknown(launch_identifier, identifier, **kwargs):
    """JRPC method
    Removes an unknown object from the list
    :param launch_identifier: Identifier of the Launch
    :param identifier: Identifier for the unknown object
    :return: True if the operation was succesful
    """
    return launch_models.Launch.objects.remove_unknown(
        launch_identifier, identifier
    )


@rpc4django.rpcmethod(
    name='leop.launch.identify',
    signature=['String', 'int', 'String', 'String', 'String'],
    login_required=True
)
def identify(launch_identifier, identifier, callsign, tle_l1, tle_l2, **kwargs):

    # user must be obtained from the request, since this has already been
    # validated by the authentication backend
    http_request = kwargs.get('request', None)
    if not http_request or not http_request.user.is_staff:
        raise django_ex.PermissionDenied()

    if identifier < 0:
        raise Exception('Identifier has to be > 0')

    launch = launch_models.Launch.objects.get(identifier=launch_identifier)
    u_objects = launch.unknown_objects
    if not identifier in u_objects:
        raise Exception('Identifier not found')

    return identifier

@rpc4django.rpcmethod(
    name='leop.getConfiguration',
    signature=['String'],
    login_required=True
)
def get_configuration(leop_id):
    """JRPC method
    Serializes the configuration for the requested LEOP cluster and returns it.
    :param leop_id: The identifier of the LEOP cluster
    :return: JSON-like serialized structure
    """
    leop = launch_models.Launch.objects.get(identifier=leop_id)
    return launch_serial.serialize_launch(leop)