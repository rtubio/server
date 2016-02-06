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

import os
import sys
from .secrets import auth, database, email, pusher, server


# Django website for WebServices project.
DEBUG = True
TESTING = sys.argv[1:2] == ['test']
RUNNING_AS_SERVER = sys.argv[1:2] == ['runserver']

ADMINS = [
    ("Ricardo Tubio-Pardavila", "rtubiopa@calpoly.edu"),
]
MANAGERS = ADMINS

DATABASES = database.DATABASES

BASE_DIR = os.path.join(
    os.path.dirname(__file__), '..'
)

# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en/1.4/ref/website/#allowed-hosts
ALLOWED_HOSTS = []

TIME_ZONE = 'UTC'
LANGUAGE_CODE = 'en-us'
SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/home/media/media.lawrence.com/media/"
MEDIA_ROOT = ''

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://media.lawrence.com/media/", "http://example.com/media/"
MEDIA_URL = ''

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in services' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/home/media/media.lawrence.com/static/"
STATIC_ROOT = os.path.join(
    os.path.dirname(__file__), '..', 'public_html/static/'
)

# URL prefix for static files.
# Example: "http://media.lawrence.com/static/"
STATIC_URL = '/static/'

# Additional locations of static files
STATICFILES_DIRS = (
    os.path.join(
        os.path.dirname(__file__), 'static', 'dist'
    ),
    os.path.join(
        os.path.dirname(__file__), '..', 'services', 'accounts', 'static'
    )
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder'
)

# Make this unique, and don't share it with anybody.
SECRET_KEY = auth.SECRET_KEY

# ### Creates the super user so that when loading the fixtures, there is a
# super user already available in the database.

if TESTING:
    from django.db.models import signals
    from . import utils
    signals.post_syncdb.connect(utils.test_create_admin)

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
)

MIDDLEWARE_CLASSES = (
    # ### TESTING (enabling CORS)
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.contrib.sessions.middleware.SessionMiddleware',
    'user_sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.RemoteUserMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # ### Session security middleware
    'session_security.middleware.SessionSecurityMiddleware',
)

# ### Context processors as required by django-session-security
TEMPLATE_CONTEXT_PROCESSORS = (
    'django.core.context_processors.request',
    'django.contrib.auth.context_processors.auth',
    'allauth.account.context_processors.account',
    'allauth.socialaccount.context_processors.socialaccount',
)

ROOT_URLCONF = 'website.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'website.wsgi.application'

# ### templates directories loading, relative to project's structure
TEMPLATE_DIRS = (
    os.path.join(
        os.path.dirname(__file__), 'templates'
    ),
    os.path.join(
        os.path.dirname(__file__),
        '..', 'services', 'accounts', 'templates'
    ),
    os.path.join(
        os.path.dirname(__file__),
        '..', 'services', 'communications', 'templates'
    ),
    os.path.join(
        os.path.dirname(__file__),
        '..', 'services', 'scheduling', 'templates'
    ),
    os.path.join(
        os.path.dirname(__file__),
        '..', 'services', 'leop', 'templates'
    )
)

# 'django_nose.NoseTestSuiteRunner'
TEST_RUNNER = 'website.tests.SatnetTestRunner'


INSTALLED_APPS = (

    # ### default applications
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'user_sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'allauth',
    'allauth.account',
    'session_security',
    'periodically',
    'rpc4django',
    'django_extensions',
    'datetimewidget',
    'django_nose',

    # ### developed applications
    'services.accounts',
    'services.configuration',
    'services.scheduling',
    'services.communications',
    'services.simulation',
    'services.leop',
    'services.network',

    # ### django-admin
    'django.contrib.admin',

)

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'mail_admins': {
            'level': 'DEBUG',
            'class': 'django.utils.log.AdminEmailHandler',
            'formatter': 'simple',
        },
        'null': {
            'level': 'DEBUG',
            'class': 'django.utils.log.NullHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'propagate': True,
            'level': 'DEBUG',
        },
        'django.db.backends': {
            'handlers': ['null'],
            'propagate': False,
            'level': 'DEBUG',
        },
        'django.request': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'periodically': {
            'handlers': ['console', 'mail_admins'],
            'level': 'WARNING',
            'propagate': True,
        },
        'rpc4django': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'accounts': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'configuration': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'common': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'push': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'communications': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'leop': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'network': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'scheduling': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'simulation': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'website': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    }
}

# ### django-allauth configuration:
AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    "django.contrib.auth.backends.RemoteUserBackend",
    # `allauth` specific authentication methods, such as login by e-mail
    "allauth.account.auth_backends.AuthenticationBackend",
    # specific backend for automatically authenticating anonymous users
    'services.accounts.backend.AnonymousAuthenticationBackend'
)

# ### django-allauth configuration:
ACCOUNT_DEFAULT_HTTP_PROTOCOL = 'https'
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 4
ACCOUNT_LOGOUT_REDIRECT_URL = 'services.accounts.views.redirect_home'
ACCOUNT_SESSION_REMEMBER = False
ACCOUNT_SIGNUP_PASSWORD_VERIFICATION = True
ACCOUNT_SIGNUP_FORM_CLASS = 'services.accounts.forms.RegistrationForm'
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_MIN_LENGTH = 5
ACCOUNT_USERNAME_REQUIRED = True
EMAIL_CONFIRMATION_SIGNUP = True

ACCOUNT_LOGIN_ON_EMAIL_CONFIRMATION = True
ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = 'account_login'
ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = 'mail_confirmed'

LOGIN_URL = 'account_login'
LOGIN_REDIRECT_URL = 'services.accounts.views.redirect_login'
LOGOUT_URL = 'services.accounts.views.redirect_home'
CSRF_FAILURE_VIEW = 'services.accounts.views.csrf_failure_handler'

# ### this parameter links __my__ UserProfile with the User from contrib.auth
AUTH_PROFILE_MODULE = 'services.accounts.UserProfile'

################################################################################
# ##################################################################### SESSIONS
################################################################################
# ### Session engine changed: user_sessions improvement
SESSION_ENGINE = 'user_sessions.backends.db'
# ### this parameter provokes that a user has to re-log-in every time the
# browser is closed
# value required to be True bye django-session-security
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
# ### django-session-security
SESSION_SECURITY_WARN_AFTER = 450
SESSION_SECURITY_EXPIRE_AFTER = 600
# ### List with the urls that do not provoke the inactivity timer to be 
# restarted
# SESSION_SECURITY_PASSIVE_URLS = 

################################################################################
# ######################################################################## EMAIL
################################################################################
EMAIL_BACKEND = email.EMAIL_BACKEND

if hasattr(email, 'EMAIL_FILE_PATH'):
    EMAIL_FILE_PATH = email.EMAIL_FILE_PATH
else:
    EMAIL_HOST = email.EMAIL_HOST
    EMAIL_PORT = email.EMAIL_PORT
    EMAIL_HOST_USER = email.EMAIL_HOST_USER
    EMAIL_HOST_PASSWORD = email.EMAIL_HOST_PASSWORD
    EMAIL_USE_TLS = email.EMAIL_USE_TLS

# https://github.com/dstufft/django-passwords/
PASSWORD_MIN_LENGTH = 8
PASSWORD_COMPLEXITY = {
    "UPPER": 1,
    "LOWER": 1,
    "DIGITS": 1
}

APPEND_SLASH = False

# XMLRequest Header formatted in JSON
RPC4DJANGO_RESTRICT_OOTB_AUTH = False

# ### For Django NOSE to reuse the previous database
# REUSE_DB = 1
JRPC_LOGIN_REQUIRED = server.JRPC_LOGIN_REQUIRED
JRPC_PERMISSIONS = server.JRPC_PERMISSIONS

# ### Flag that allows disabling the usage of the PUSHER services specifically
USE_PUSHER = False

# ### Username used during tests
TEST_USERNAME = 'rtubio'

# ### pusher.com configuration
PUSHER_APP_ID = pusher.PUSHER_APP_ID
PUSHER_APP_KEY = pusher.PUSHER_APP_KEY
PUSHER_APP_SECRET = pusher.PUSHER_APP_SECRET

# ### DJANGO NOSE TESTING FRAMEWORK
# TO ADD COVERAGE CALCULATIONS: '--with-coverage',

NOSE_ARGS = [
    '--verbosity=3',
    '--cover-package='
    'services.accounts,'
    'services.common,'
    'services.communications,'
    'services.configuration,'
    'services.leop,'
    'services.network,'
    'services.scheduling,'
    'services.simulation'
]

# ### TESTING : CORS enabled
if not JRPC_LOGIN_REQUIRED:
    CORS_ORIGIN_ALLOW_ALL = True
    INSTALLED_APPS += ('corsheaders',)
