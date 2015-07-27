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

from django import dispatch as django_dispatch
from django.core import exceptions
from django.db import models
from django.db.models import signals as django_signals
from django.forms import model_to_dict

from services.common import misc
from services.configuration.models import channels as channel_models

logger = logging.getLogger(__name__)

compatibility_add_gs_ch_signal = django_dispatch.Signal(
    providing_args=['instance', 'compatible_channels']
)
compatibility_delete_gs_ch_signal = django_dispatch.Signal(
    providing_args=['instance', 'compatible_channels']
)
compatibility_add_sc_ch_signal = django_dispatch.Signal(
    providing_args=['instance', 'compatible_channels']
)
compatibility_delete_sc_ch_signal = django_dispatch.Signal(
    providing_args=['instance', 'compatible_channels']
)


class ChannelCompatibilityManager(models.Manager):
    """
    Manager for the ChannelCompatibility table.
    """

    # @django_dispatch.receiver(
    #    django_signals.post_save,
    #    sender=channel_models.SpacecraftChannel
    # )
    @staticmethod
    def sc_channel_saved(sender, instance, created, raw, **kwargs):
        """
        Updates the compatible channels table with this new channel.

        ### FILTERING RULES:
        1) enabled = True
        2) gs_min_frequency < sc_frequency < gs_max_frequency
        3) sc_modulation in [gs_modulation_1, ..., gs_modulation_n]
        4) sc_bitrate in [gs_bitrate_1, ..., gs_bitrate_n]
        5) sc_polarization in [gs_polarization_1, ..., gs_polarization_n] or
              ( gs_polarization == ANY ) or ( sc_polarization == ANY )

        ### (3) filter objects taking into account modulations, exact match
        required from the list of available modulations
        ### (4) filter objects taking into account bitrates, exact match
        required from the list of available bitrates
        ### filter objects taking into account the polarizations implemented by
        the GS (RHPC, LHPC or ANY) and the one required by the spacecraft. In
        this case, the ANY polarization indicates that either the spacecraft or
        the ground station implement/require any value.
        """
        if created or raw:
            return

        compatibility = None
        was_compatible = False
        is_compatible = False

        try:
            compatibility = ChannelCompatibility.objects.get(
                spacecraft_channel=instance
            )
            was_compatible = True
        except exceptions.ObjectDoesNotExist:
            logger.warn(
                'Compatibility not found for channel not found, sc = ' + str(
                    instance.__unicode__())
            )

        # 1) first, we get the list of compatible channels with the given one.
        compatible_chs = channel_models.GroundStationChannel.objects\
            .find_compatible_channels(instance)

        if not compatible_chs:
            logger.info(
                'No compatible GS channels found for SC channel = ' + str(
                    instance.__unicode__()
                )
            )
        else:
            is_compatible = True

        # 2) we execute the correct update
        if not was_compatible and is_compatible:
            ChannelCompatibilityManager.create_compatibility(
                instance, compatible_chs
            )
        elif was_compatible and is_compatible:
            ChannelCompatibilityManager.update_compatibility(
                instance, compatible_chs
            )
        elif was_compatible and not is_compatible:
            compatibility.delete()
        else:
            return

        # 3) notify other tables with a custom signal
        compatibility_add_sc_ch_signal.send(
            sender=ChannelCompatibility,
            instance=instance,
            compatible_channels=compatible_chs
        )

    @staticmethod
    def create_compatibility(spacecraft_ch, compatible_chs):
        """
        Method that creates the compatibility object.
        :param compatible_chs: List with the just calculated compatible
        channels
        """
        c = ChannelCompatibility.objects.create(
            spacecraft_channel=spacecraft_ch
        )
        c.groundstation_channels.add(*compatible_chs)
        c.save()

    @staticmethod
    def update_compatibility(compatibility, compatible_chs):
        """
        Updates the compatibility of for the given spacecraft channel
        compatibility object.
        :param compatibility: Compatibility to be updated
        :param compatible_chs: List of the new compatible channels
        """
        compatibility.groundstation_channels.clear()
        for ch in compatible_chs:
            compatibility.groundstation_channels.add(ch)

    @staticmethod
    def sc_channel_deleted(sender, instance, **kwargs):
        """
        Updates the compatible channels table by removing the entries for
        this spacecraft channel that has just been removed from the database.
        :param sc_ch_id: Identifier of the Spacecraft channel to be removed.
        """
        compatible_chs = []

        try:

            s = ChannelCompatibility.objects.get(
                spacecraft_channel=instance
            )
            compatible_chs = s.groundstation_channels.all()
            s.groundstation_channels.clear()
            s.delete()

        except IndexError:
            logger.info(
                'Deleted SpacecraftChannel <' + str(instance.identifier)
                + '> does not exist in the Compatibility table.'
            )
            return

        # 3) table change notification through a custom signal
        compatibility_delete_sc_ch_signal.send(
            sender=ChannelCompatibility,
            instance=instance,
            compatible_channels=compatible_chs
        )

    @staticmethod
    def gs_channel_saved(sender, instance, created, raw, **kwargs):
        """
        Updates the compatible channels table with this new GS channel. This
        means that this function must:

        (1) Get the list of compatible SC channels.
        (2) For each of the compatible SC channels, add itself as a new
            compatible GS channel to the table.
            (*) If this GS channel is already added for one SC channel,
            then just skip to the next row of the table.

        The filtering rules for checking the compatibility of this new GS
        channel with the existing SC channels,
        """
        # ### We wait for the object to be updated after creation with all
        # the information in the ManyToMany fields.
        if created or raw:
            return

        # 1) first we get the list of the compatible SC channels
        compatible_chs = channel_models.SpacecraftChannel.objects\
            .find_compatible_channels(instance)
        if not compatible_chs:
            return

        # 2) for each of them, we add the new GS channel to its list if it
        # has not been added yet
        for ch in compatible_chs:

            c = None

            try:
                c = ChannelCompatibility.objects.get(spacecraft_channel=ch)
            except exceptions.ObjectDoesNotExist:
                c = ChannelCompatibility.objects.create(spacecraft_channel=ch)

            if instance not in c.groundstation_channels.all():

                c.groundstation_channels.add(instance)
                c.save()

        # 3) notify other tables with a custom signal
        compatibility_add_gs_ch_signal.send(
            sender=ChannelCompatibility,
            instance=instance,
            compatible_channels=compatible_chs
        )

    @staticmethod
    def gs_channel_deleted(sender, instance, **kwargs):
        """
        Updates the compatible channels table by removing the entries for
        this GroundStation channel that has just been removed from the database.
        :param gs_ch_id: Identifier of the GroundStation channel to be removed.
        """
        compatible_chs = ChannelCompatibility.objects.filter(
            groundstation_channels=instance
        )
        if not compatible_chs:
            logger.info(
                'Deleted GroundStationChannel <' + str(instance.identifier)
                + '> does not exist in the Compatibility table.'
            )
            return

        for c_ch in compatible_chs:

            c_ch.groundstation_channels.remove(instance)

            if not c_ch.groundstation_channels.all():

                c_ch.delete()

        # 3) table change notification through a custom signal
        compatibility_delete_gs_ch_signal.send(
            sender=ChannelCompatibility,
            instance=instance,
            compatible_channels=compatible_chs
        )


class ChannelCompatibility(models.Model):
    """
    This model permits handle a table where the information about the
    compatibility in between SpacecraftConfiguration, SpacecraftChannel,
    GroundStationChannel and GroundStationConfiguration objects is stored.
    """
    class Meta:
        app_label = 'configuration'

    objects = ChannelCompatibilityManager()

    spacecraft_channel = models.ForeignKey(
        channel_models.SpacecraftChannel,
        verbose_name='Reference to the compatible Spacecraft channel.'
    )
    groundstation_channels = models.ManyToManyField(
        channel_models.GroundStationChannel,
        verbose_name='Reference to all the compatible GroundStation channels.'
    )

    def __unicode__(self):
        """
        Transforms the contents of this object into a human readable string.
        """
        return str(self.__class__.__name__)\
            + ', sc_ch = ' + str(self.spacecraft_channel)\
            + ', gs_chs = '\
            + misc.list_2_string(
                self.groundstation_channels.all(),
                list_name='gs_chs'
            )
