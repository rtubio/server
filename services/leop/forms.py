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

from django import forms as django_forms
from datetimewidget import widgets as datetime_widgets
from services.common import simulation
from services.configuration.models import tle as tle_models
from services.leop import utils as leop_utils
from services.leop.models import launch as launch_models


class LaunchForm(django_forms.ModelForm):
    """Form
    Form for creating a manager for the LEOP operations phase.
    """

    tle_l1 = django_forms.CharField(
        label='TLE - First Line',
        max_length=tle_models.TwoLineElement.MAX_TLE_LINE_LEN,
        error_messages={'invalid': "Not a valid TLE line."},
        widget=django_forms.Textarea
    )
    tle_l2 = django_forms.CharField(
        label='TLE - Second Line',
        max_length=tle_models.TwoLineElement.MAX_TLE_LINE_LEN,
        error_messages={'invalid': "Not a valid TLE line."},
        widget=django_forms.Textarea
    )

    class Meta:
        """Model to be used from within this form."""
        model = launch_models.Launch
        fields = ('identifier', 'date')
        widgets = {
            'date': datetime_widgets.DateTimeWidget(
                usel10n=True, bootstrap_version=3
            )
        }

    def clean(self):
        """OVERRIDEN clean
        Overriden clean method that checks the validity of the provided TLE.
        """
        cleaned_data = super(LaunchForm, self).clean()

        tle_l1 = cleaned_data.get('tle_l1')
        tle_l2 = cleaned_data.get('tle_l2')
        tle_id = leop_utils.generate_cluster_tle_id(
            cleaned_data.get('identifier')
        )
        try:
            simulation.OrbitalSimulator.check_tle_format(
                tle_id, tle_l1, tle_l2
            )
        except Exception as ex:
            raise django_forms.ValidationError('Wrong TLE, error = ' + str(ex))

        return cleaned_data