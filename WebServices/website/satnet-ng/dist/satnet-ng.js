/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/24/14.
 */

/** Module definition (empty array is vital!). */
angular.module('celestrak-services', []);

/**
 * CELESTRAK service that permits retrieving the TLE's for the spacecraft from
 * the information at celestrak.com. It uses a CORSS proxy to avoid that
 * limitation.
 */
angular.module('celestrak-services').service('celestrak', [function () {

    'use strict';

    // Base URL
    this.CELESTRAK_URL_BASE = 'http://celestrak.com/NORAD/elements/';
    //this.CELESTRAK_URL_BASE = 'https://satnet.aero.calpoly.edu/celestrak/';
    // Weather and Earth Resources
    this.CELESTRAK_SECTION_1 = 'Weather & Earth Resources';
    this.CELESTRAK_WEATHER = this.CELESTRAK_URL_BASE + 'weather.txt';
    this.CELESTRAK_NOAA = this.CELESTRAK_URL_BASE + 'noaa.txt';
    this.CELESTRAK_GOES = this.CELESTRAK_URL_BASE + 'goes.txt';
    this.CELESTRAK_EARTH_RESOURCES = this.CELESTRAK_URL_BASE + 'resource.txt';
    this.CELESTRAK_SARSAT = this.CELESTRAK_URL_BASE + 'sarsat.txt';
    this.CELESTRAK_DISASTER_MONITORING = this.CELESTRAK_URL_BASE + 'dmc.txt';
    this.CELESTRAK_TRACKING_DATA_RELAY = this.CELESTRAK_URL_BASE + 'tdrss.txt';
    this.CELESTRAK_ARGOS = this.CELESTRAK_URL_BASE + 'argos.txt';
    // Communications
    this.CELESTRAK_SECTION_2 = 'Communications';
    this.CELESTRAK_GEOSTATIONARY = this.CELESTRAK_URL_BASE + 'geo.txt';
    this.CELESTRAK_INTELSAT = this.CELESTRAK_URL_BASE + 'intelsat.txt';
    this.CELESTRAK_GORIZONT = this.CELESTRAK_URL_BASE + 'gorizont.txt';
    this.CELESTRAK_RADUGA = this.CELESTRAK_URL_BASE + 'raduga.txt';
    this.CELESTRAK_MOLNIYA = this.CELESTRAK_URL_BASE + 'molniya.txt';
    this.CELESTRAK_IRIDIUM = this.CELESTRAK_URL_BASE + 'iridium.txt';
    this.CELESTRAK_ORBCOMM = this.CELESTRAK_URL_BASE + 'orbcomm.txt';
    this.CELESTRAK_GLOBALSTAR = this.CELESTRAK_URL_BASE + 'globalstar.txt';
    this.CELESTRAK_AMATEUR_RADIO = this.CELESTRAK_URL_BASE + 'amateur.txt';
    this.CELESTRAK_EXPERIMENTAL = this.CELESTRAK_URL_BASE + 'x-comm.txt';
    this.CELESTRAK_COMMS_OTHER = this.CELESTRAK_URL_BASE + 'other-comm.txt';
    // Navigation
    this.CELESTRAK_SECTION_3 = 'Navigation';
    this.CELESTRAK_GPS_OPERATIONAL = this.CELESTRAK_URL_BASE + 'gps-ops.txt';
    this.CELESTRAK_GLONASS_OPERATIONAL = this.CELESTRAK_URL_BASE + 'glo-ops.txt';
    this.CELESTRAK_GALILEO = this.CELESTRAK_URL_BASE + 'galileo.txt';
    this.CELESTRAK_BEIDOU = this.CELESTRAK_URL_BASE + 'beidou.txt';
    this.CELESTRAK_SATELLITE_AUGMENTATION = this.CELESTRAK_URL_BASE + 'sbas.txt';
    this.CELESTRAK_NNSS = this.CELESTRAK_URL_BASE + 'nnss.txt';
    this.CELESTRAK_RUSSIAN_LEO_NAVIGATION = this.CELESTRAK_URL_BASE + 'musson.txt';
    // Scientific
    this.CELESTRAK_SECTION_4 = 'Scientific';
    this.CELESTRAK_SPACE_EARTH_SCIENCE = this.CELESTRAK_URL_BASE + 'science.txt';
    this.CELESTRAK_GEODETIC = this.CELESTRAK_URL_BASE + 'geodetic.txt';
    this.CELESTRAK_ENGINEERING = this.CELESTRAK_URL_BASE + 'engineering.txt';
    this.CELESTRAK_EDUCATION = this.CELESTRAK_URL_BASE + 'education.txt';
    // Miscellaneous
    this.CELESTRAK_SECTION_5 = 'Miscellaneous';
    this.CELESTRAK_MILITARY = this.CELESTRAK_URL_BASE + 'military.txt';
    this.CELESTRAK_RADAR_CALLIBRATION = this.CELESTRAK_URL_BASE + 'radar.txt';
    this.CELESTRAK_CUBESATS = this.CELESTRAK_URL_BASE + 'cubesat.txt';
    this.CELESTRAK_OTHER = this.CELESTRAK_URL_BASE + 'other.txt';
    // CELESTRAK resources within a structured data type...
    this.CELESTRAK_RESOURCES = {
        'Weather': this.CELESTRAK_WEATHER,
        'NOAA': this.CELESTRAK_NOAA,
        'GOES': this.CELESTRAK_GOES,
        'Earth Resources': this.CELESTRAK_EARTH_RESOURCES,
        'SARSAT': this.CELESTRAK_SARSAT,
        'Disaster Monitoring': this.CELESTRAK_DISASTER_MONITORING,
        'Tracking & Data Relay': this.CELESTRAK_TRACKING_DATA_RELAY,
        'ARGOS': this.CELESTRAK_ARGOS,
        'Geostationary': this.CELESTRAK_GEOSTATIONARY,
        'Intelsat': this.CELESTRAK_INTELSAT,
        'Gorizont': this.CELESTRAK_GORIZONT,
        'Raduga': this.CELESTRAK_RADUGA,
        'Molniya': this.CELESTRAK_MOLNIYA,
        'Iridium': this.CELESTRAK_IRIDIUM,
        'Orbcomm': this.CELESTRAK_ORBCOMM,
        'Globalstar': this.CELESTRAK_GLOBALSTAR,
        'Amateur Radio': this.CELESTRAK_AMATEUR_RADIO,
        'Experimental': this.CELESTRAK_EXPERIMENTAL,
        'Others': this.CELESTRAK_COMMS_OTHER,
        'GPS Operational': this.CELESTRAK_GPS_OPERATIONAL,
        'Glonass Operational': this.CELESTRAK_GLONASS_OPERATIONAL,
        'Galileo': this.CELESTRAK_GALILEO,
        'Beidou': this.CELESTRAK_BEIDOU,
        'Satellite-based Augmentation System': this.CELESTRAK_SATELLITE_AUGMENTATION,
        'Navy Navigation Satellite System': this.CELESTRAK_NNSS,
        'Russian LEO Navigation': this.CELESTRAK_RUSSIAN_LEO_NAVIGATION,
        'Space & Earth Science': this.CELESTRAK_SPACE_EARTH_SCIENCE,
        'Geodetic': this.CELESTRAK_GEODETIC,
        'Engineering': this.CELESTRAK_ENGINEERING,
        'Education': this.CELESTRAK_EDUCATION,
        'Military': this.CELESTRAK_MILITARY,
        'Radar Callibration': this.CELESTRAK_RADAR_CALLIBRATION,
        'CubeSats': this.CELESTRAK_CUBESATS,
        'Other': this.CELESTRAK_OTHER
    };

    this.CELESTRAK_SELECT_SECTIONS = [
        /////////////////////////////////////////////////////////////////  SECTION 1
        { 'section': this.CELESTRAK_SECTION_1, 'subsection': 'Weather' },
        { 'section': this.CELESTRAK_SECTION_1, 'subsection': 'NOAA' },
        { 'section': this.CELESTRAK_SECTION_1, 'subsection': 'GOES' },
        { 'section': this.CELESTRAK_SECTION_1, 'subsection': 'Earth Resources' },
        { 'section': this.CELESTRAK_SECTION_1, 'subsection': 'SARSAT' },
        { 'section': this.CELESTRAK_SECTION_1, 'subsection': 'Disaster Monitoring' },
        { 'section': this.CELESTRAK_SECTION_1, 'subsection': 'Tracking & Data Relay' },
        { 'section': this.CELESTRAK_SECTION_1, 'subsection': 'ARGOS' },
        /////////////////////////////////////////////////////////////////  SECTION 2
        { 'section': this.CELESTRAK_SECTION_2, 'subsection': 'Geostationary' },
        { 'section': this.CELESTRAK_SECTION_2, 'subsection': 'Intelsat' },
        { 'section': this.CELESTRAK_SECTION_2, 'subsection': 'Gorizont' },
        { 'section': this.CELESTRAK_SECTION_2, 'subsection': 'Raduga' },
        { 'section': this.CELESTRAK_SECTION_2, 'subsection': 'Molniya' },
        { 'section': this.CELESTRAK_SECTION_2, 'subsection': 'Iridium' },
        { 'section': this.CELESTRAK_SECTION_2, 'subsection': 'Orbcomm' },
        { 'section': this.CELESTRAK_SECTION_2, 'subsection': 'Globalstar' },
        { 'section': this.CELESTRAK_SECTION_2, 'subsection': 'Amateur Radio' },
        { 'section': this.CELESTRAK_SECTION_2, 'subsection': 'Experimental' },
        { 'section': this.CELESTRAK_SECTION_2, 'subsection': 'Others' },
        /////////////////////////////////////////////////////////////////  SECTION 3
        { 'section': this.CELESTRAK_SECTION_3, 'subsection': 'GPS Operational' },
        { 'section': this.CELESTRAK_SECTION_3, 'subsection': 'Glonass Operational' },
        { 'section': this.CELESTRAK_SECTION_3, 'subsection': 'Galileo' },
        { 'section': this.CELESTRAK_SECTION_3, 'subsection': 'Beidou' },
        { 'section': this.CELESTRAK_SECTION_3, 'subsection': 'Satellite-based Augmentation System' },
        { 'section': this.CELESTRAK_SECTION_3, 'subsection': 'Navy Navigation Satellite System' },
        { 'section': this.CELESTRAK_SECTION_3, 'subsection': 'Russian LEO Navigation' },
        /////////////////////////////////////////////////////////////////  SECTION 4
        { 'section': this.CELESTRAK_SECTION_4, 'subsection': 'Space & Earth Science' },
        { 'section': this.CELESTRAK_SECTION_4, 'subsection': 'Geodetic' },
        { 'section': this.CELESTRAK_SECTION_4, 'subsection': 'Engineering' },
        { 'section': this.CELESTRAK_SECTION_4, 'subsection': 'Education' },
        /////////////////////////////////////////////////////////////////  SECTION 5
        { 'section': this.CELESTRAK_SECTION_5, 'subsection': 'Military' },
        { 'section': this.CELESTRAK_SECTION_5, 'subsection': 'Radar Callibration' },
        { 'section': this.CELESTRAK_SECTION_5, 'subsection': 'CubeSats' },
        { 'section': this.CELESTRAK_SECTION_5, 'subsection': 'Other' }
    ];

}]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/24/14.
 */

/** Module definition (empty array is vital!). */
angular.module('broadcaster', []);

/**
 * Service used for broadcasting UI events in between controllers.
 */
angular.module('broadcaster').service('broadcaster', [ '$rootScope',
    function ($rootScope) {

        'use strict';

        this.GS_ADDED_EVENT = 'gs.added';
        this.GS_REMOVED_EVENT = 'gs.removed';
        this.GS_UPDATED_EVENT = 'gs.updated';

        /**
         * Function that broadcasts the event associated with the creation of a
         * new GroundStation.
         * @param gsId The identifier of the GroundStation.
         */
        this.gsAdded = function (gsId) {
            $rootScope.$broadcast(this.GS_ADDED_EVENT, gsId);
        };

        /**
         * Function that broadcasts the event associated with the removal of a
         * new GroundStation.
         * @param gsId The identifier of the GroundStation.
         */
        this.gsRemoved = function (gsId) {
            $rootScope.$broadcast(this.GS_REMOVED_EVENT, gsId);
        };

        /**
         * Function that broadcasts the event associated with the update of
         * new GroundStation.
         * @param gsId The identifier of the GroundStation.
         */
        this.gsUpdated = function (gsId) {
            $rootScope.$broadcast(this.GS_UPDATED_EVENT, gsId);
        };

        this.SC_ADDED_EVENT = 'sc.added';
        this.SC_REMOVED_EVENT = 'sc.removed';
        this.SC_UPDATED_EVENT = 'sc.updated';

        /**
         * Function that broadcasts the event associated with the creation of a
         * new Spacececraft.
         * @param scId The identifier of the Spacececraft.
         */
        this.scAdded = function (scId) {
            $rootScope.$broadcast(this.SC_ADDED_EVENT, scId);
        };

        /**
         * Function that broadcasts the event associated with the removal of a
         * new Spacececraft.
         * @param scId The identifier of the Spacececraft.
         */
        this.scRemoved = function (scId) {
            $rootScope.$broadcast(this.SC_REMOVED_EVENT, scId);
        };

        /**
         * Function that broadcasts the event associated with the update of
         * new Spacececraft.
         * @param scId The identifier of the Spacececraft.
         */
        this.scUpdated = function (scId) {
            $rootScope.$broadcast(this.SC_UPDATED_EVENT, scId);
        };

    }]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 11/01/14.
 */

/** Module definition (empty array is vital!). */
angular.module('map-services', [
    'leaflet-directive',
    'satnet-services'
]);

angular.module('map-services')
    .constant('T_OPACITY', 0.125)
    .constant('LAT', 37.7833)
    .constant('LNG', -122.4167)
    .constant('ZOOM', 7)
    .constant('DETAIL_ZOOM', 10)
    .constant('DEFAULT_MOVEME', 'Drag me!')
    .service('maps', [
        '$q',
        'leafletData',
        'satnetRPC',
        'ZOOM',
        'DETAIL_ZOOM',
        'T_OPACITY',
        'DEFAULT_MOVEME',
        function (
            $q,
            leafletData,
            satnetRPC,
            ZOOM,
            DETAIL_ZOOM,
            T_OPACITY,
            DEFAULT_MOVEME
        ) {

            'use strict';

            /**
             * Returns the mapInfo structure for the rest of the chained
             * promises.
             * @returns {$q} Promise that returns the mapInfo structure with
             *               a reference to the Leaflet map object.
             */
            this.getMainMap = function () {
                return leafletData.getMap('mainMap').then(function (m) {
                    return { map: m };
                });
            };

            this.getAddGSMap = function () {
                return leafletData.getMap('addGSMap').then(function (m) {
                    return { map: m };
                });
            };

            this.getEditGSMap = function () {
                return leafletData.getMap('editGSMap').then(function (m) {
                    return { map: m };
                });
            };

            /**
             * Redraws the Terminator to its new position.
             * @returns {*} Promise that returns the updated Terminator object.
             * @private
             */
            this.updateTerminator = function (t) {
                var t2 = L.terminator();
                t.setLatLngs(t2.getLatLngs());
                t.redraw();
                return t;
            };

            /**
             * Creates the main map and adds a terminator for the illuminated
             * surface of the Earth.
             * @returns {$q} Promise that returns the mapInfo object
             *               {map, terminator}.
             */
            this.createTerminatorMap = function () {
                var update_function = this.updateTerminator;
                return this.getMainMap().then(function (mapInfo) {
                    var t = L.terminator({ fillOpacity: T_OPACITY });
                    t.addTo(mapInfo.map);
                    mapInfo.terminator = t;
                    setInterval(function () { update_function(t); }, 500);
                    return mapInfo;
                });
            };

            /**
             * This promise returns a simple object with a reference to the
             * just created map.
             *
             * @param terminator If 'true' adds the overlaying terminator line.
             * @returns {$q} Promise that returns the 'mapData' structure with
             *               a reference to the Leaflet map and to the
             *               terminator overlaying line (if requested).
             */
            this.createMainMap = function (terminator) {

                var p = [];

                if (terminator) {
                    p.push(this.createTerminatorMap());
                } else {
                    p.push(this.getMainMap());
                }
                p.push(satnetRPC.getUserLocation());

                return $q.all(p).then(function (results) {
                    var ll = new L.LatLng(
                            results[1].latitude,
                            results[1].longitude
                        ),
                        map = results[0].map;

                    map.setView(ll, ZOOM);

                    return ({
                        map: results[0].map,
                        terminator: results[0].terminator,
                        center: {
                            lat: results[1].latitude,
                            lng: results[1].longitude
                        }
                    });

                });

            };

            /**
             * Initializes the map, centers it with the estimated position
             * of the user (GeoIP) and adds a "move-me" draggable marker.
             *
             * @param {L} map Reference to the Leaflet map.
             * @param {String} message Message to be added to the marker.
             * @returns {$q} Promise that returns the 'mapData' structure with
             *               an additional marker.
             */
            this.createMoveMeMap = function (map, message) {

                if (message === null) { message = DEFAULT_MOVEME; }

                return satnetRPC.getUserLocation().then(function (location) {
                    var lat = location.lat,
                        lng = location.lng,
                        ll = new L.LatLng(lat, lng),
                        marker = L.marker({
                            lat: lat,
                            lng: lng,
                            message: message,
                            focus: true,
                            draggable: true
                        });

                    map.setView(ll, DETAIL_ZOOM);
                    marker.addTo(map);

                    return ({
                        map: map,
                        marker: marker,
                        center: {
                            lat: location.lat,
                            lng: location.lng
                        }
                    });

                });

            };

            /**
             * Returns the base layers in the format required by the Angular
             * Leaflet plugin.
             *
             * @returns {{esri_baselayer: {name: string, type: string, url: string, layerOptions: {attribution: string}}, osm_baselayer: {name: string, type: string, url: string, layerOptions: {attribution: string}}}}
             */
            this.getBaseLayers = function () {
                return {
                    esri_baselayer: {
                        name: 'ESRI Base Layer',
                        type: 'xyz',
                        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
                        layerOptions: {
                            noWrap: true,
                            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
                        }
                    },
                    osm_baselayer: {
                        name: 'OSM Base Layer',
                        type: 'xyz',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        layerOptions: {
                            noWrap: true,
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        }
                    }
                };
            };

            /**
             * Returns the overlays in the format required by the Angular
             * Leaflet plugin.
             *
             * @returns {{oms_admin_overlay: {name: string, type: string, url: string, visible: boolean, layerOptions: {minZoom: number, maxZoom: number, attribution: string}}, hydda_roads_labels_overlay: {name: string, type: string, url: string, layerOptions: {minZoom: number, maxZoom: number, attribution: string}}, stamen_toner_labels_overlay: {name: string, type: string, url: string, layerOptions: {attribution: string, subdomains: string, minZoom: number, maxZoom: number}}, owm_rain_overlay: {name: string, type: string, url: string, layerOptions: {attribution: string, opacity: number}}, owm_temperature_overlay: {name: string, type: string, url: string, layerOptions: {attribution: string, opacity: number}}}}
             */
            this.getOverlays = function () {
                return {
                    oms_admin_overlay: {
                        name: 'Administrative Boundaries',
                        type: 'xyz',
                        url: 'http://openmapsurfer.uni-hd.de/tiles/adminb/x={x}&y={y}&z={z}',
                        visible: true,
                        layerOptions: {
                            noWrap: true,
                            minZoom: 0,
                            maxZoom: 19,
                            attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        }
                    },
                    hydda_roads_labels_overlay: {
                        name: 'Roads and Labels',
                        type: 'xyz',
                        url: 'http://{s}.tile.openstreetmap.se/hydda/roads_and_labels/{z}/{x}/{y}.png',
                        layerOptions: {
                            noWrap: true,
                            minZoom: 0,
                            maxZoom: 18,
                            attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        }
                    },
                    stamen_toner_labels_overlay: {
                        name: 'Labels',
                        type: 'xyz',
                        url: 'http://{s}.tile.stamen.com/toner-labels/{z}/{x}/{y}.png',
                        layerOptions: {
                            noWrap: true,
                            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                            subdomains: 'abcd',
                            minZoom: 0,
                            maxZoom: 20
                        }
                    },
                    owm_rain_overlay: {
                        name: 'Rain',
                        type: 'xyz',
                        url: 'http://{s}.tile.openweathermap.org/map/rain/{z}/{x}/{y}.png',
                        layerOptions: {
                            noWrap: true,
                            attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
                            opacity: 0.35
                        }
                    },
                    owm_temperature_overlay: {
                        name: 'Temperature',
                        type: 'xyz',
                        url: 'http://{s}.tile.openweathermap.org/map/temp/{z}/{x}/{y}.png',
                        layerOptions: {
                            noWrap: true,
                            attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
                            opacity: 0.5
                        }
                    }
                };
            };

            /**
             * Returns a string with the data from a MapInfo like structure.
             *
             * @param   {Object} mapInfo The structure to be printed out.
             * @returns {String} Human-readable representation (string).
             */
            this.asString = function (mapInfo) {
                return 'mapInfo = {' +
                    '"center": ' + JSON.stringify(mapInfo.center) + ', ' +
                    '"terminator": ' + mapInfo.terminator + ', ' +
                    '"map": ' + mapInfo.map +
                    '}';
            };

        }
    ]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/24/14.
 */

/** Module definition (empty array is vital!). */
angular.module('satnet-services', []);

/**
 * Service that defines the basic calls to the services of the SATNET network
 * through JSON RPC. It defines a common error handler for all the errors that
 * can be overriden by users.
 */
angular.module('satnet-services').service('satnetRPC', [
    'jsonrpc', '$location', '$log', '$q', '$http',
    function (jsonrpc, $location, $log, $q, $http) {
        'use strict';

        var rpc = $location.protocol() + '://' +
            $location.host() + ':' + $location.port() +
            '/jrpc/';

        this.configuration = jsonrpc.newService('configuration', rpc);
        this.simulation = jsonrpc.newService('simulation', rpc);
        this.leop = jsonrpc.newService('leop', rpc);

        this.services = {
            // Configuration methods (Ground Stations)
            'gs.list':
                this.configuration.createMethod('gs.list'),
            'gs.add':
                this.configuration.createMethod('gs.create'),
            'gs.get':
                this.configuration.createMethod('gs.getConfiguration'),
            'gs.update':
                this.configuration.createMethod('gs.setConfiguration'),
            'gs.delete':
                this.configuration.createMethod('gs.delete'),
            // Configuration methods (Spacecraft)
            'sc.list':
                this.configuration.createMethod('sc.list'),
            'sc.add':
                this.configuration.createMethod('sc.create'),
            'sc.get':
                this.configuration.createMethod('sc.getConfiguration'),
            'sc.update':
                this.configuration.createMethod('sc.setConfiguration'),
            'sc.delete':
                this.configuration.createMethod('sc.delete'),
            // User configuration
            'user.getLocation':
                this.configuration.createMethod('user.getLocation'),
            // TLE methods
            'tle.celestrak.getSections':
                this.configuration.createMethod('tle.celestrak.getSections'),
            'tle.celestrak.getResource':
                this.configuration.createMethod('tle.celestrak.getResource'),
            'tle.celestrak.getTle':
                this.configuration.createMethod('tle.celestrak.getTle'),
            // Simulation methods
            'sc.getGroundtrack':
                this.simulation.createMethod('spacecraft.getGroundtrack'),
            // LEOP services
            'leop.gs.list':
                this.leop.createMethod('gs.list'),
            'leop.gs.add':
                this.leop.createMethod('gs.add'),
            'leop.gs.remove':
                this.leop.createMethod('gs.remove'),
            'leop.sc.cluster':
                this.leop.createMethod('sc.cluster')
        };

        /**
         * Method for calling the remote service through JSON-RPC.
         * @param service The name of the service, as per the internal services
         * name definitions.
         * @param paramArray The parameters for the service (as an array).
         * @returns {*}
         */
        this.rCall = function (service, paramArray) {
            if ((this.services.hasOwnProperty(service)) === false) {
                throw '[satnetRPC] service not found, id = <' + service + '>';
            }
            $log.log('[satnetRPC] Invoked service = <' + service + '>');
            return this.services[service](paramArray).then(
                function (data) {
                    return data.data;
                },
                function (error) {
                    var msg = '[satnetRPC] Error invoking = <' +
                        service + '>' + ', description = <' + error + '>';
                    $log.warn(msg);
                }
            );
        };

        /**
         * Retrieves the user location using an available Internet service.
         * @returns Promise that returns a { latitude, longitude } object.
         */
        this.getUserLocation = function () {
            return $http
                .get('/configuration/user/geoip')
                .then(function (data) { return data.data; });
        };

        /**
         * Retrieves the server location using an available Internet service.
         * @returns Promise that returns a { latitude, longitude } object.
         */
        this.getServerLocation = function (hostname) {
            return $http
                .post('/configuration/hostname/geoip', {'hostname': hostname})
                .then(function (data) { return data.data; });
        };

        /**
         * Reads the configuration for a given spacecraft, including the
         * estimated groundtrack.
         * @param scId The identifier of the spacecraft.
         * @returns Promise that resturns the Spacecraft configuration object.
         */
        this.readSCCfg = function (scId) {
            var cfg = null,
                p = [
                    this.rCall('sc.get', [scId]),
                    this.rCall('sc.getGroundtrack', [scId]),
                    this.rCall('tle.celestrak.getTle', [scId])
                ];
            return $q.all(p).then(function (results) {
                cfg = results[0];
                cfg.id = results[0].spacecraft_id;
                cfg.groundtrack = results[1];
                cfg.tle = results[2];
                return cfg;
            });
        };

    }]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/24/14.
 */

/** Module definition (empty array is vital!). */
angular.module('x-satnet-services', [ 'satnet-services' ]);

/**
 * Service that defines the basic calls to the services of the SATNET network
 * through JSON RPC. It defines a common error handler for all the errors that
 * can be overriden by users.
 */
angular.module('x-satnet-services').service('xSatnetRPC', [
    '$q', 'satnetRPC', function ($q, satnetRPC) {

        'use strict';

        /**
         * Reads the configuration for all the GroundStation objects available
         * in the server.
         * @returns Promise that returns an array with the configuration
         *               for each of the GroundStation objects.
         */
        this.readAllGS = function () {
            return satnetRPC.rCall('gs.list', []).then(function (gss) {
                var p = [];
                angular.forEach(gss, function (gs) {
                    p.push(satnetRPC.rCall('gs.get', [gs]));
                });
                return $q.all(p).then(function (results) {
                    var cfgs = [], j;
                    for (j = 0; j < results.length; j += 1) {
                        cfgs.push(results[j]);
                    }
                    return cfgs;
                });
            });
        };

        /**
         * Reads the configuration for all the GroundStation objects available
         * in the server.
         * @returns Promise that returns an array with the configuration for
         *          each of the GroundStation objects.
         */
        this.readAllSC = function () {
            return satnetRPC.rCall('sc.list', []).then(function (scs) {
                var p = [];
                angular.forEach(scs, function (sc) {
                    p.push(satnetRPC.readSCCfg(sc));
                });
                return $q.all(p).then(function (results) {
                    var cfgs = [], j;
                    for (j = 0; j < results.length; j += 1) {
                        cfgs.push(results[j]);
                    }
                    return cfgs;
                });
            });
        };

        /**
         * Reads the configuration for all the GroundStation objects available
         * in the server.
         * @param leop_id Identifier of the LEOP cluster.
         * @returns Promise that returns an array with the configuration
         *               for each of the GroundStation objects.
         */
        this.readInUseLEOPGS = function (leop_id) {
            return satnetRPC.rCall('leop.gs.list', [leop_id])
                .then(function (gss) {
                    var p = [];
                    angular.forEach(gss.leop_gs_inuse, function (gs) {
                        p.push(satnetRPC.rCall('gs.get', [gs]));
                    });
                    return $q.all(p).then(function (results) {
                        var cfgs = [], j;
                        for (j = 0; j < results.length; j += 1) {
                            cfgs.push(results[j]);
                        }
                        return cfgs;
                    });
                });
        };

        /**
         * Reads the configuration for all the GroundStations associated with
         * this LEOP cluster.
         * @param leop_id Identifier of the LEOP cluster.
         * @returns {*} { leop_gs_available: [gs_cfg], leop_gs_inuse: [gs_cfg]}
         */
        this.readAllLEOPGS = function (leop_id) {
            return satnetRPC.rCall('leop.gs.list', [leop_id])
                .then(function (gss) {
                    var p = [];
                    angular.forEach(gss.leop_gs_available, function (gs) {
                        p.push(satnetRPC.rCall('gs.get', [gs]));
                    });
                    angular.forEach(gss.leop_gs_inuse, function (gs) {
                        p.push(satnetRPC.rCall('gs.get', [gs]));
                    });
                    return $q.all(p).then(function (results) {
                        var a_cfgs = [], u_cfgs = [], j, r_j, r_j_id;
                        for (j = 0; j < results.length; j += 1) {
                            r_j = results[j];
                            r_j_id = r_j.groundstation_id;
                            if (gss.leop_gs_available.indexOf(r_j_id) >= 0) {
                                a_cfgs.push(r_j);
                            } else {
                                u_cfgs.push(r_j);
                            }
                        }
                        return {
                            leop_gs_available: a_cfgs,
                            leop_gs_inuse: u_cfgs
                        };
                    });
                });
        };

        this.readLEOPCluster = function (leop_id) {
            console.log('@readLEOPCluster, leop_id = ' + leop_id);
            return satnetRPC.rCall('leop.sc.cluster', [leop_id])
                .then(function (cluster) {
                    console.log('>>> cluster_cfg = ' + JSON.stringify(cluster));
                });
        };

    }
]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/24/14.
 */

/** Module definition (empty array is vital!). */
angular.module('marker-models', ['map-services']);

/**
 * eXtended GroundStation models. Services built on top of the satnetRPC
 * service and the basic GroundStation models.
 */
angular.module('marker-models')
    .constant('_RATE', 1)
    .constant('_SIM_DAYS', 1)
    .constant('_GEOLINE_STEPS', 5)
    .service('markers', [
        '$log', 'maps', '_RATE', '_SIM_DAYS', '_GEOLINE_STEPS',
        function ($log, maps, _RATE, _SIM_DAYS, _GEOLINE_STEPS) {

            'use strict';

            /******************************************************************/
            /****************************************************** MAP SCOPE */
            /******************************************************************/

            // Structure that holds a reference to the map and to the
            // associated structures.
            this._mapInfo = null;
            // Scope where the leaflet angular pluing has its variables.
            this._mapScope = null;

            /**
             * Returns the current scope to which this markers service is bound
             * to.
             * @returns {null|*} The _mapScope object.
             */
            this.getScope = function () {
                if (this._mapScope === null) {
                    throw '<_mapScope> has not been set.';
                }
                return this._mapScope;
            };

            /**
             * Configures the scope of the Map controller to set the variables
             * for the angular-leaflet plugin.
             *
             * @param scope Scope ($scope) of the controller for the
             *              angular-leaflet plugin.
             */
            this.configureMapScope = function (scope) {

                this._mapScope = scope;

                angular.extend(this._mapScope, {
                    center: { lat: maps.LAT, lng: maps.LNG, zoom: maps.ZOOM },
                    layers: {
                        baselayers: {},
                        overlays: {}
                    },
                    markers: {},
                    paths: {},
                    maxbounds: {}
                });

                this._mapScope.layers.baselayers = angular.extend(
                    {},
                    this._mapScope.layers.baselayers,
                    maps.getBaseLayers()
                );

                this._mapScope.layers.overlays = angular.extend(
                    {},
                    maps.getOverlays(),
                    this.getOverlays()
                );

                var mapInfo = this._mapInfo;
                maps.createMainMap(true).then(function (data) {
                    $log.log(
                        '[map-controller] Created map = <' +
                            maps.asString(data) + '>'
                    );
                    mapInfo = angular.extend({}, mapInfo, data);
                });

            };

            /******************************************************************/
            /**************************************************** MARKER KEYS */
            /******************************************************************/

            this._KEY_HEADER = 'MK'; // "MK" stands for "marker key"
            this._key_number = 0;

            /**
             * Dictionary that contains the relation between the identifiers
             * of the objects and the keys for the markers that represent those
             * objects.
             * @type {{}}
             */
            this._ids2keys = {};

            /**
             * Creates a new key for the given identifier and adds it to the
             * dictionary of identifiers and keys.
             * @param identifier Identifier of the marker.
             * @returns {string} Key for accessing to the marker.
             */
            this.createMarkerKey = function (identifier) {

                if (this._ids2keys[identifier] !== undefined) {
                    return this.getMarkerKey(identifier);
                }

                var key = this._KEY_HEADER + this._key_number;
                this._key_number += 1;
                this._ids2keys[identifier] = key;
                return key;

            };

            /**
             * Returns the key for the given object that holds a marker.
             * @param identifier Identifier of the object.
             * @returns {string} Key for accessing to the marker.
             */
            this.getMarkerKey = function (identifier) {
                return this._ids2keys[identifier];
            };

            /**
             * Returns the marker for the server, in case it exists!
             *
             * @param gs_identifier Identifier of the GroundStation object that
             *                      is bound to the server.
             * @returns {null|*} String with the key for the marker of the
             *                      server.
             */
            this.getServerMarker = function (gs_identifier) {
                if (this._serverMarkerKey === null) {
                    throw 'No server has been defined';
                }
                console.log('@gs = ' + gs_identifier);
                return this.getScope().markers[this._serverMarkerKey];
            };

            /**
             * Returns the marker for the object with the given identifier.
             *
             * @param identifier Identifier of the object, which can be either
             *                      a GroundStation, a Spacecraft or a Server.
             * @returns {*} Marker object.
             */
            this.getMarker = function (identifier) {
                return this.getScope().markers[this.getMarkerKey(identifier)];
            };

            /**
             * Returns the overlays to be included as markerclusters within
             * the map.
             *
             * @returns {{servers: {name: string, type: string, visible: boolean}, groundstations: {name: string, type: string, visible: boolean}, spacecraft: {name: string, type: string, visible: boolean}}}
             */
            this.getOverlays = function () {
                return {
                    network : {
                        name: 'Network',
                        type: 'markercluster',
                        visible: true
                    },
                    groundstations: {
                        name: 'Ground Stations',
                        type: 'markercluster',
                        visible: true
                    }
                    /*, TODO Native angular-leaflet support for MovingMarker
                    spacecraft: {
                        name: 'Spacecraft',
                        type: 'markercluster',
                        visible: true
                    }
                    */
                };
            };

            /******************************************************************/
            /***************************************** NETWORK SERVER MARKERS */
            /******************************************************************/

            this._serverMarkerKey = null;

            /**
             * Creates a new marker for the given Network Server.
             * @param {String} id Identifier of the server.
             * @param {Number} latitude Server's estimated latitude.
             * @param {Number} longitude Server's estimated longitude.
             *
             * TODO Check possible bug: when 'noHide = false', once the layer
             * TODO is removed, the label does not appear again when the mouse
             * TODO is over the icon.
             */
            this.createServerMarker = function (id, latitude, longitude) {
                this._serverMarkerKey = this.createMarkerKey(id);
                this.getScope().markers[this._serverMarkerKey] = {
                    lat: latitude,
                    lng: longitude,
                    focus: true,
                    draggable: false,
                    layer: 'network',
                    icon: {
                        iconUrl: '/static/images/server-icon.svg',
                        iconSize: [15, 15]
                    },
                    label: {
                        message: id,
                        options: {
                            noHide: true
                        }
                    },
                    groundstations: [],
                    identifier: id
                };
                return id;
            };

            /******************************************************************/
            /***************************************** GROUND STATION MARKERS */
            /******************************************************************/

            /**
             * Creates a unique identifier for the connector of this
             * GroundStation and the Standalone network server.
             *
             * @param gs_identifier Identifier of the GroundStation object.
             * @returns {string} Identifier for the connector.
             */
            this.createConnectorIdentifier = function (gs_identifier) {
                return 'connect:' + gs_identifier + '_2_' +
                    this.getServerMarker(gs_identifier).identifier;
            };

            /**
             * This function creates a connection line object to be draw on the
             * map in between the provided Server and the Ground Station
             * objects.
             *
             * @param {Object} gs_identifier Identifier of the GroundStation
             *                                  object.
             * @returns {*} L.polyline object
             *
             * TODO The structure for modelling what server owns each
             * TODO GroundStation has already started to be implemented. In the
             * TODO 'this.servers' dictionary, each entry has a field called
             * TODO 'groundstations' that enables the correct modelling of the
             * TODO network. Right now, the first server is always chosen and
             * TODO all the GroundStations are bound to it. In the future, each
             * TODO time a GroundStation is added, the server that it belongs
             * TODO to should be specified and used accordingly.
             */
            this.createGSConnector = function (gs_identifier) {

                var s_marker = this.getServerMarker(gs_identifier),
                    g_marker = this.getMarker(gs_identifier),
                    c_id = this.createConnectorIdentifier(gs_identifier),
                    c_key,
                    r = {};

                c_key = this.createMarkerKey(c_id);
                r[c_key] = {
                    layer: 'network',
                    color: '#036128',
                    type: 'polyline',
                    weight: 2,
                    opacity: 0.5,
                    latlngs: [s_marker, g_marker],
                    identifier: c_id
                };

                this.getScope().paths =
                    angular.extend({}, this.getScope().paths, r);
                return c_id;

            };

            /**
             * Creates a new marker object for the given GroundStation.
             *
             * @param cfg The configuration of the GroundStation.
             * @returns Angular leaflet marker.
             */
            this.createGSMarker = function (cfg) {

                var id = cfg.groundstation_id;

                this.getScope().markers[this.createMarkerKey(id)] = {
                    lat: cfg.groundstation_latlon[0],
                    lng: cfg.groundstation_latlon[1],
                    focus: true,
                    draggable: false,
                    layer: 'groundstations',
                    icon: {
                        iconUrl: '/static/images/gs-icon.svg',
                        iconSize: [15, 15]
                    },
                    label: {
                        message: cfg.groundstation_id,
                        options: {
                            noHide: true
                        }
                    },
                    identifier: id
                };

                this.createGSConnector(id);
                return id;

            };

            /**
             * Updates the configuration for the markers of the given
             * GroundStation object.
             *
             * @param cfg New configuration of the object.
             * @returns {cfg.groundstation_id|*} Identifier.
             *
             * TODO Validate
             */
            this.updateGSMarker = function (cfg) {
                var new_lat = cfg.groundstation_latlon[0],
                    new_lng = cfg.groundstation_latlon[1],
                    marker = this.getMarker(cfg.groundstation_id);
                if (marker.lat !== new_lat) {
                    marker.lat = new_lat;
                }
                if (marker.lng !== new_lng) {
                    marker.lng = new_lng;
                }
                return cfg.groundstation_id;
            };

            /**
             * Removes a given GroundStation marker, together with its
             * associated connector path to the server and with the identifier
             * within the servers lists of bounded GroundStations.
             *
             * @param identifier Identifier of the GroundStation whose markers
             *                      are going to be removed.
             */
            this.removeGSMarker = function (identifier) {
                delete this.getScope().paths[this.getMarkerKey(
                    this.createConnectorIdentifier(identifier)
                )];
                delete this.getScope().markers[this.getMarkerKey(identifier)];
            };

            /******************************************************************/
            /********************************************* SPACECRAFT MARKERS */
            /******************************************************************/

            this.sc = {};
            this.scLayers = L.layerGroup();
            this.trackLayers = L.layerGroup();

            this.scStyle = {
                autostart: true,
                draggable: false,
                icon: L.icon({
                    iconUrl: '/static/images/sc-icon.svg',
                    iconSize: [10, 10]
                })
            };

            this.trackStyle = {
                weight: 3,
                opacity: 0.25,
                steps: _GEOLINE_STEPS
            };

            this.colors = ['red', 'blue', 'yellow'];
            this.color_n = 0;

            /**
             * For a given Spacecraft configuration object, it creates the
             * marker for the spacecraft, its associated label and the
             * groundtrack.
             *
             * @param cfg Configuration object.
             * @returns {{marker: L.Marker.movingMarker, track: L.polyline}}
             */
            this.createSCMarkers = function (cfg) {

                var id = cfg.spacecraft_id,
                    gt = this.readTrack(cfg.groundtrack),
                    mo = this.scStyle,
                    color =  this.colors[this.color_n % this.colors.length];
                this.color_n += 1;
                this.trackStyle.color = color;

                return {
                    marker: L.Marker.movingMarker(
                        gt.positions,
                        gt.durations,
                        mo
                    ).bindLabel(id, { noHide: true }),
                    track: L.geodesic([gt.geopoints], this.trackStyle)
                };

            };

            /**
             * Finds the current point at which the marker has to be positioned.
             * Using the parameter {nowUs}, this function searchs for the
             * following point of the GroundTrack at which the Spacecraft is
             * supposed to be positioned.
             *
             * TODO Best unit testing for this algorithm.
             *
             * @param groundtrack RAW groundtrack from the server.
             * @param nowUs Now time in microsecnods.
             * @returns {number} Position of the array.
             */
            this.findPrevious = function (groundtrack, nowUs) {
                var i;
                for (i = 0; i < groundtrack.length; i += 1) {
                    if (groundtrack[i].timestamp > nowUs) {
                        return i - 1;
                    }
                }
                throw 'GroundTrack is too old!';
            };

            /**
             * Function that reads the RAW groundtrack from the server and
             * transforms it into a usable one for the JS client.
             *
             * TODO What if the groundtrack has not started yet?
             * TODO A better unit testing for this algorithm.
             *
             * @param groundtrack RAW groundtrack from the server.
             * @returns {{durations: Array, positions: Array, geopoints: Array}}
             */
            this.readTrack = function (groundtrack) {

                var nowUs = Date.now() * 1000,
                    endUs = moment().add(_SIM_DAYS, "days")
                        .toDate().getTime() * 1000,
                    startIndex = this.findPrevious(groundtrack, nowUs),
                    endIndex = this.findPrevious(groundtrack, endUs),
                    j,
                    durations = [],
                    positions = [],
                    geopoints = [];

                if (startIndex !== 0) {
                    startIndex = startIndex - 1;
                }
                positions.push([
                    groundtrack[startIndex].latitude,
                    groundtrack[startIndex].longitude
                ]);
                for (j = startIndex; j < endIndex; j += 1) {
                    durations.push((
                        groundtrack[j + 1].timestamp - groundtrack[j].timestamp
                    ) / 1000);
                    positions.push([
                        groundtrack[j + 1].latitude,
                        groundtrack[j + 1].longitude
                    ]);
                    if (j % _RATE === 0) {
                        geopoints.push(
                            new L.LatLng(
                                groundtrack[j + 1].latitude,
                                groundtrack[j + 1].longitude
                            )
                        );
                    }
                }

                return {
                    durations: durations,
                    positions: positions,
                    geopoints: geopoints
                };

            };

            /**
             * Adds the markers for the new Spacecraft, this is: the marker for
             * the Spacecraft itself (together with its associated label) and
             * associated groundtrack geoline.
             *
             * @param id Identifier of the Spacecraft.
             * @param cfg Configuration for the Spacecraft.
             * @returns {{
             *              id: String,
             *              cfg: Object,
             *              marker: m.L.Marker.movingMarker,
             *              track: m.L.geodesic
             *          }}
             */
            this.addSC = function (id, cfg) {

                if (this.sc.hasOwnProperty(id)) {
                    throw '[x-maps] SC Marker already exists, id = ' + id;
                }

                var m = this.createSCMarkers(id, cfg);
                this.sc[id] = m;
                this.scLayers.addLayer(m.marker);
                this.trackLayers.addLayer(m.track);

                return maps.getMainMap().then(function (mapInfo) {
                    m.track.addTo(mapInfo.map);
                    m.marker.addTo(mapInfo.map);
                    return {
                        id: id,
                        cfg: cfg,
                        marker: m.marker,
                        track: m.track
                    };
                });

            };

            /**
             * Updates the configuration for a given Spacecraft object.
             *
             * @param cfg Object with the new configuration for the Spacecraft.
             * @returns {String} Identifier of the just-updated Spacecraft.
             *
             * TODO Real spacecraft update.
             */
            this.updateSC = function (cfg) {

                var id = cfg.spacecraft_id;
                if (!this.sc.hasOwnProperty(id)) {
                    throw '[x-maps] SC Marker does not exist! id = ' + id;
                }

                console.log('@markers.updateSC, cfg = ' + JSON.stringify(cfg));
                return id;

            };

            /**
             * Removes all the markers associated with this Spacecraft object.
             *
             * @param id Identifier of the Spacecraft.
             * @returns {String} Spacecraft identifier.
             */
            this.removeSC = function (id) {

                if (!this.sc.hasOwnProperty(id)) {
                    throw '[x-maps] Marker does NOT exist, id = ' + id;
                }

                var m = this.sc[id];
                this.scLayers.removeLayer(m.marker);
                this.trackLayers.removeLayer(m.track);
                delete this.sc[id];

                return maps.getMainMap().then(function (mapInfo) {
                    mapInfo.map.removeLayer(m.marker);
                    mapInfo.map.removeLayer(m.track);
                    return id;
                });

            };

        }
    ]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/28/14.
 */

/** Module definition (empty array is vital!). */
angular.module('x-server-models', ['satnet-services', 'marker-models']);

/**
 * eXtended Server models. Services built on top of the satnetRPC service and
 * the markers models. Right now, there is no need for adding the intermediate
 * bussiness logic with the basic models.
 */
angular.module('x-server-models').service('xserver', [
    '$location', 'satnetRPC',  'markers',
    function ($location, satnetRPC, markers) {

        'use strict';

        this.initStandalone = function () {
            var identifier = $location.host();
            return satnetRPC.getServerLocation(identifier)
                .then(function (data) {
                    return markers.createServerMarker(
                        identifier,
                        data.latitude,
                        data.longitude
                    );
                });
        };

    }
]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/24/14.
 */

/** Module definition . */
angular.module('x-groundstation-models', [
    'broadcaster',
    'satnet-services',
    'x-satnet-services',
    'marker-models'
]);

/**
 * eXtended GroundStation models. Services built on top of the satnetRPC
 * service and the basic GroundStation models.
 */
angular.module('x-groundstation-models').service('xgs', [
    '$rootScope', 'broadcaster', 'satnetRPC', 'xSatnetRPC', 'markers',
    function ($rootScope, broadcaster, satnetRPC, xSatnetRPC, markers) {
        'use strict';

        /**
         * Initializes all the GroundStations reading the information from
         * the server. Markers are indirectly initialized.
         * @returns Promise that returns an array with all the
         *          configurations read.
         */
        this.initAll = function () {
            return xSatnetRPC.readAllGS().then(function (cfgs) {
                var gs_markers = [];
                angular.forEach(cfgs, function (cfg) {
                    gs_markers = gs_markers.concat(markers.createGSMarker(cfg));
                });
                return gs_markers;
            });
        };

        /**
         * Initializes all the GroundStations reading the information from
         * the server, for all those that are registered for this LEOP cluster.
         * Markers are indirectly initialized.
         * @returns Promise that returns an array with all the
         *          configurations read.
         */
        this.initAllLEOP = function () {
            return xSatnetRPC.readInUseLEOPGS($rootScope.leop_id)
                .then(function (cfgs) {
                    var gs_markers = [];
                    angular.forEach(cfgs, function (cfg) {
                        gs_markers = gs_markers.concat(
                            markers.createGSMarker(cfg)
                        );
                    });
                    return gs_markers;
                });
        };

        /**
         * Adds a new GroundStation together with its marker, using the
         * configuration object that it retrieves from the server.
         *
         * @param identifier Identififer of the GroundStation to be added.
         * @returns String Identifier of the just-created object.
         */
        this.add = function (identifier) {
            satnetRPC.rCall('gs.get', [identifier]).then(function (data) {
                return markers.createGSMarker(data);
            });
        };

        /**
         * Updates the markers for the given GroundStation object.
         * @param identifier Identifier of the GroundStation object.
         */
        this.update = function (identifier) {
            satnetRPC.rCall('gs.get', [identifier]).then(function (data) {
                return markers.updateGSMarker(data);
            });
        };

        /**
         * Removes the markers for the given GroundStation object.
         * @param identifier Identifier of the GroundStation object.
         */
        this.remove = function (identifier) {
            return markers.removeGSMarker(identifier);
        };

        /**
         * Private method that creates the event listeners for this service.
         */
        this.initListeners = function () {
            var self = this;
            $rootScope.$on(broadcaster.GS_ADDED_EVENT, function (event, id) {
                console.log(
                    '@on-gs-added-event, event = ' + event + ', id = ' + id
                );
                self.add(id);
            });
            $rootScope.$on(broadcaster.GS_REMOVED_EVENT, function (event, id) {
                console.log(
                    '@on-gs-removed-event, event = ' + event + ', id = ' + id
                );
                self.remove(id);
            });
            $rootScope.$on(broadcaster.GS_UPDATED_EVENT, function (event, id) {
                console.log(
                    '@on-gs-updated-event, event = ' + event + ', id = ' + id
                );
                self.update(id);
            });

        };

    }
]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/28/14.
 */

/** Module definition (empty array is vital!). */
angular.module('x-spacecraft-models', [
    'broadcaster', 'satnet-services', 'x-satnet-services', 'marker-models'
]);

/**
 * eXtended GroundStation models. Services built on top of the satnetRPC
 * service and the basic Spacecraft models.
 */
angular.module('x-spacecraft-models').service('xsc', [
    '$rootScope',
    'broadcaster',
    'satnetRPC',
    'xSatnetRPC',
    'markers',
    function (
        $rootScope,
        broadcaster,
        satnetRPC,
        xSatnetRPC,
        markers
    ) {

        'use strict';

        /**
         * Initializes all the configuration objects for the available
         * spacecraft.
         * @returns {[Object]} Array with the configuration objects.
         */
        this.initAll = function () {
            return xSatnetRPC.readAllSC()
                .then(function (cfgs) {
                    var sc_markers = [];
                    angular.forEach(cfgs, function (cfg) {
                        sc_markers = sc_markers.concat(markers.addSC(cfg));
                    });
                    return sc_markers;
                });
        };

        /**
         * Initializes all the Spacecraft reading the information from the
         * server, for all those that are registered for this LEOP cluster.
         * Markers are indirectly initialized.
         * @returns Promise that returns an array with all the
         *          configurations read.
         */
        this.initAllLEOP = function () {
            return xSatnetRPC.readLEOPCluster($rootScope.leop_id)
                .then(function (cfgs) {
                    var cluster_markers = [];
                    angular.forEach(cfgs, function (cfg) {
                        cluster_markers = cluster_markers.concat(
                            markers.addSC(cfg)
                        );
                    });
                    return cluster_markers;
                });
        };

        /**
         * Adds a new Spacecraft together with its marker, using the
         * configuration object that it retrieves from the server.
         * @param identifier Identififer of the Spacecraft to be added.
         */
        this.addSC = function (identifier) {
            return satnetRPC.readSCCfg(identifier).then(function (data) {
                console.log('>> readSCCfg, data = ' + JSON.stringify(data));
                return markers.addSC(identifier, data);
            });
        };

        /**
         * Updates the configuration for a given Spacecraft.
         * @param identifier The identifier of the Spacecraft.
         */
        this.updateSC = function (identifier) {
            return satnetRPC.rCall('sc.get', [identifier])
                .then(function (data) { return markers.updateSC(data); });
        };

        /**
         * Removes the markers for the given Spacecraft.
         * @param identifier The identifier of the Spacecraft.
         */
        this.removeSC = function (identifier) {
            markers.removeSC(identifier).then(function (data) { return data; });
        };

        /**
         * Private method that inits the event listeners for this service.
         */
        this.initListeners = function () {
            var self = this;
            $rootScope.$on(broadcaster.SC_ADDED_EVENT, function (event, id) {
                console.log(
                    '@on-sc-added-event, event = ' + event + ', id = ' + id
                );
                self.addSC(id);
            });
            $rootScope.$on(broadcaster.SC_UPDATED_EVENT, function (event, id) {
                console.log(
                    '@on-sc-updated-event, event = ' + event + ', id = ' + id
                );
                self.updateSC(id);
            });
            $rootScope.$on(broadcaster.SC_REMOVED_EVENT, function (event, id) {
                console.log(
                    '@on-sc-removed-event, event = ' + event + ', id = ' + id
                );
                self.removeSC(id);
            });
        };

    }
]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/24/14.
 */

/** Module definition (empty array is vital!). */
angular.module(
    'ui-leop-map-controllers',
    [
        'marker-models',
        'x-spacecraft-models',
        'x-server-models',
        'x-groundstation-models'
    ]
);

angular.module('ui-leop-map-controllers')
    .controller('LEOPMapController', [
        '$scope', '$log', 'markers', 'xsc', 'xserver', 'xgs',
        function ($scope, $log, markers, xsc, xserver, xgs) {

            'use strict';

            markers.configureMapScope($scope);
            xsc.initListeners();
            xgs.initListeners();

            xsc.initAllLEOP().then(function (spacecraft) {
                $log.log(
                    '[map-controller] Spacecraft =' + JSON.stringify(spacecraft)
                );
            });
            xserver.initStandalone().then(function (server) {
                $log.log(
                    '[map-controller] Server =' + JSON.stringify(server)
                );
                xgs.initAllLEOP().then(function (gs_markers) {
                    $log.log(
                        '[map-controller] Ground Station(s) = ' +
                            JSON.stringify(gs_markers)
                    );
                });
            });

        }
    ]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/24/14.
 */

/** Module definition (empty array is vital!). */
angular.module(
    'ui-leop-menu-controllers',
    ['ui.bootstrap', 'satnet-services']
);

angular.module('ui-leop-menu-controllers').controller('LEOPGSMenuCtrl', [
    '$rootScope', '$scope', '$modal', 'satnetRPC',
    function ($rootScope, $scope, $modal, satnetRPC) {

        'use strict';

        $scope.gsIds = [];

        $scope.addGroundStation = function () {
            var modalInstance = $modal.open({
                templateUrl: '/static/satnet-ng/templates/leop/manageGroundStations.html',
                controller: 'ManageGSModalCtrl',
                backdrop: 'static'
            });
            console.log('Created modalInstance = ' + modalInstance);
        };
        $scope.refreshGSList = function () {
            satnetRPC.rCall('leop.gs.list', [$rootScope.leop_id])
                .then(function (data) {
                    if ((data !== null) && (data.leop_gs_inuse !== undefined)) {
                        $scope.gsIds = data.leop_gs_inuse.slice(0);
                    }
                });
        };
        $scope.refreshGSList();

    }
]);

angular.module('ui-leop-menu-controllers').controller('UFOMenuCtrl', [
    '$scope', '$modal', 'satnetRPC',
    function ($scope, $modal, satnetRPC) {

        'use strict';

        $scope.ufoIds = [];
        $scope.addUFO = function () {
            var modalInstance = $modal.open({
                templateUrl: '/static/satnet-ng/templates/leop/manageUFO.html',
                controller: 'ManageUFOCtrl',
                backdrop: 'static'
            });
            console.log('Created modalInstance = ' + modalInstance);
        };
        $scope.refreshUFOList = function () {
            satnetRPC.rCall('leop.ufo.list', []).then(function (data) {
                if (data !== null) {
                    console.log(
                        'leop.ufo.list >>> data = ' + JSON.stringify(data)
                    );
                    $scope.scIds = data.slice(0);
                }
            });
        };
        //$scope.refreshUFOList();

    }
]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/24/14.
 */

/** Module definition (empty array is vital!). */
angular.module(
    'ui-leop-modalgs-controllers',
    [ 'broadcaster', 'satnet-services', 'x-satnet-services' ]
);

/**
 * Angular module with the Modal GS controllers.
 */
angular.module('ui-leop-modalgs-controllers')
    .controller('ManageGSModalCtrl', [
        '$rootScope',
        '$scope',
        '$modalInstance',
        'broadcaster',
        'satnetRPC',
        'xSatnetRPC',
        function (
            $rootScope,
            $scope,
            $modalInstance,
            broadcaster,
            satnetRPC,
            xSatnetRPC
        ) {

            'use strict';

            $scope.gsIds = {};
            $scope.gsIds.aItems = [];
            $scope.gsIds.uItems = [];

            $scope.gsIds.toAdd = [];
            $scope.gsIds.toRemove = [];

            $scope.init = function () {
                console.log('init, leop_id = ' + $rootScope.leop_id);
                xSatnetRPC.readAllLEOPGS($rootScope.leop_id)
                    .then(function (data) {
                        console.log('leop.gs.list, data = ' + JSON.stringify(data));
                        if (data === null) { return; }
                        $scope.gsIds = data;
                    });
            };

            $scope.selectGs = function () {
                var i, item;

                if ($scope.gsIds.toAdd === undefined) {
                    $scope.gsIds.toAdd = [];
                }

                for (i = 0; i < $scope.gsIds.aItems.length; i += 1) {
                    item = $scope.gsIds.aItems[i];
                    $scope.gsIds.leop_gs_available.splice(
                        $scope.gsIds.leop_gs_available.indexOf(item),
                        1
                    );
                    if ($scope.gsIds.toAdd.indexOf(item) < 0) {
                        $scope.gsIds.toAdd.push(item);
                    }
                    if ($scope.gsIds.leop_gs_inuse.indexOf(item) < 0) {
                        $scope.gsIds.leop_gs_inuse.push(item);
                    }
                }

                $scope.gsIds.aItems = [];
            };

            $scope.unselectGs = function () {
                var i, item;
                if ($scope.gsIds.toRemove === undefined) {
                    $scope.gsIds.toRemove = [];
                }

                for (i = 0; i < $scope.gsIds.uItems.length; i += 1) {
                    item = $scope.gsIds.uItems[i];
                    $scope.gsIds.leop_gs_inuse.splice(
                        $scope.gsIds.leop_gs_inuse.indexOf(item),
                        1
                    );
                    if ($scope.gsIds.toRemove.indexOf(item) < 0) {
                        $scope.gsIds.toRemove.push(item);
                    }
                    if ($scope.gsIds.leop_gs_available.indexOf(item) < 0) {
                        $scope.gsIds.leop_gs_available.push(item);
                    }
                }

                $scope.gsIds.uItems = [];
            };

            $scope.ok = function () {
                var a_ids = [], r_ids = [], i, gs_id;

                if ($scope.gsIds.toAdd !== undefined) {
                    for (i = 0; i < $scope.gsIds.toAdd.length; i += 1) {
                        gs_id = $scope.gsIds.toAdd[i].groundstation_id;
                        a_ids.push(gs_id);
                        broadcaster.gsAdded(gs_id);
                    }
                    satnetRPC.rCall(
                        'leop.gs.add',
                        [$rootScope.leop_id, a_ids]
                    ).then(
                        function (data) {
                            console.log(
                                '>>> updated LEOP = ' + JSON.stringify(data)
                            );
                        }
                    );
                }

                if ($scope.gsIds.toRemove !== undefined) {
                    for (i = 0; i < $scope.gsIds.toRemove.length; i += 1) {
                        gs_id = $scope.gsIds.toRemove[i].groundstation_id;
                        r_ids.push(gs_id);
                        broadcaster.gsRemoved(gs_id);
                    }
                    satnetRPC.rCall(
                        'leop.gs.remove',
                        [$rootScope.leop_id, r_ids]
                    ).then(
                        function (data) {
                            console.log(
                                '>>> updated LEOP = ' + JSON.stringify(data)
                            );
                        }
                    );
                }

                $modalInstance.close();
            };

            $scope.cancel = function () {
                $modalInstance.close();
            };

            $scope.init();

        }
    ]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/24/14.
 */

/** Module definition (empty array is vital!). */
angular.module(
    'ui-leop-modalufo-controllers',
    [
        'ui.bootstrap',
        'nya.bootstrap.select',
        'celestrak-services',
        'satnet-services',
        'broadcaster'
    ]
);

angular.module('ui-leop-modalufo-controllers').controller('ManageUFOSModalCtrl', [
    '$scope', '$log', '$modalInstance', 'satnetRPC', 'celestrak', 'broadcaster',
    function ($scope, $log, $modalInstance, satnetRPC, celestrak, broadcaster) {

        'use strict';

        $scope.sc = {
            identifier: '',
            callsign: '',
            tlegroup: '',
            tleid: ''
        };

        $scope.tlegroups = celestrak.CELESTRAK_SELECT_SECTIONS;
        $scope.tles = [];

        $scope.initTles = function (defaultOption) {
            satnetRPC.rCall('tle.celestrak.getResource', [defaultOption])
                .then(function (tleIds) {
                    $scope.tles = tleIds.tle_list.slice(0);
                    console.log('$scope.tles = ' + JSON.stringify($scope.tles));
                });
            $scope.sc.tlegroup = defaultOption;
        };

        $scope.groupChanged = function (value) {
            satnetRPC.rCall('tle.celestrak.getResource', [value.subsection])
                .then(function (tleIds) {
                    $scope.tles = tleIds.tle_list.slice(0);
                    console.log('$scope.tles = ' + JSON.stringify($scope.tles));
                });
        };

        $scope.ok = function () {
            var newScCfg = [
                $scope.sc.identifier,
                $scope.sc.callsign,
                $scope.sc.tleid.spacecraft_tle_id
            ];
            satnetRPC.rCall('sc.add', newScCfg).then(function (data) {
                $log.info(
                    '[map-ctrl] SC added, id = ' + data.spacecraft_id
                );
                broadcaster.scAdded(data.spacecraft_id);
            });
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.close();
        };

    }
]);

angular.module('ui-leop-modalufo-controllers').controller('EditSCModalCtrl', [
    '$scope', '$log', '$modalInstance',
    'satnetRPC', 'celestrak', 'spacecraftId', 'broadcaster',
    function ($scope, $log, $modalInstance, satnetRPC, celestrak, spacecraftId, broadcaster) {

        'use strict';

        $scope.sc = {
            identifier: spacecraftId,
            callsign: '',
            tlegroup: '',
            tleid: '',
            savedTleId: ''
        };

        $scope.tlegroups = celestrak.CELESTRAK_SELECT_SECTIONS;
        $scope.tles = [];

        satnetRPC.rCall('sc.get', [spacecraftId]).then(function (data) {
            $scope.sc.identifier = spacecraftId;
            $scope.sc.callsign = data.spacecraft_callsign;
            $scope.sc.savedTleId = data.spacecraft_tle_id;
        });

        $scope.initTles = function (defaultOption) {
            satnetRPC.rCall('tle.celestrak.getResource', [defaultOption])
                .then(function (tleIds) {
                    $scope.tles = tleIds.tle_list.slice(0);
                });
            $scope.sc.tlegroup = defaultOption;
        };

        $scope.groupChanged = function (value) {
            console.log(
                'value = ' + JSON.stringify(value) +
                    ', ss = ' + JSON.stringify(value.subsection)
            );
            satnetRPC.rCall('tle.celestrak.getResource', [value.subsection])
                .then(function (tleIds) {
                    $scope.tles = tleIds.tle_list.slice(0);
                });
        };

        $scope.update = function () {
            var newScCfg = {
                'spacecraft_id': spacecraftId,
                'spacecraft_callsign': $scope.sc.callsign,
                'spacecraft_tle_id': $scope.sc.tleid.id
            };
            satnetRPC.rCall(
                'sc.update',
                [spacecraftId, newScCfg]
            ).then(function (data) {
                $log.info('[map-ctrl] SC updated, id = ' + data);
                broadcaster.scUpdated(data);
            });
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.close();
        };

        $scope.erase = function () {
            if (confirm('Delete this spacecraft?') === true) {
                satnetRPC.rCall('sc.delete', [spacecraftId]).then(function (data) {
                    $log.info(
                        '[map-ctrl] Spacecraft removed, id = ' + JSON.stringify(data)
                    );
                    broadcaster.scRemoved(data);
                });
                $modalInstance.close();
            }
        };

    }
]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/24/14.
 */

/** Module definition (empty array is vital!). */
angular.module(
    'ui-map-controllers',
    [
        'marker-models',
        'x-groundstation-models',
        'x-spacecraft-models',
        'x-server-models'
    ]
);

angular.module('ui-map-controllers')
    .controller('MapController', [
        '$scope', '$log', 'markers', 'xgs', 'xsc', 'xserver',
        function ($scope, $log, markers, xgs, xsc, xserver) {

            'use strict';

            markers.configureMapScope($scope);
            xsc.initListeners();
            xgs.initListeners();

            xsc.initAll().then(function (spacecraft) {
                $log.log(
                    '[map-controller] Spacecraft =' + JSON.stringify(spacecraft)
                );
            });
            xserver.initStandalone().then(function (server) {
                $log.log(
                    '[map-controller] Server =' + JSON.stringify(server)
                );
                xgs.initAll().then(function (gs_markers) {
                    $log.log(
                        '[map-controller] Ground Station(s) = ' +
                            JSON.stringify(gs_markers)
                    );
                });
            });

        }
    ]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/24/14.
 */

/** Module definition (empty array is vital!). */
angular.module(
    'ui-menu-controllers',
    ['ui.bootstrap', 'satnet-services']
);

angular.module('ui-menu-controllers').controller('GSMenuCtrl', [
    '$scope', '$modal', 'satnetRPC',
    function ($scope, $modal, satnetRPC) {

        'use strict';

        $scope.gsIds = [];
        $scope.addGroundStation = function () {
            var modalInstance = $modal.open({
                templateUrl: '/static/satnet-ng/templates/addGroundStation.html',
                controller: 'AddGSModalCtrl',
                backdrop: 'static'
            });
            console.log('Created modalInstance = ' + modalInstance);
        };
        $scope.editGroundStation = function (g) {
            var modalInstance = $modal.open({
                templateUrl: '/static/satnet-ng/templates/editGroundStation.html',
                controller: 'EditGSModalCtrl',
                backdrop: 'static',
                resolve: { groundstationId: function () {
                    return g;
                } }
            });
            console.log('Created modalInstance = ' + modalInstance);
        };
        $scope.refreshGSList = function () {
            satnetRPC.rCall('gs.list', []).then(function (data) {
                if (data !== null) {
                    $scope.gsIds = data.slice(0);
                }
            });
        };
        $scope.refreshGSList();

    }
]);

angular.module('ui-menu-controllers').controller('SCMenuCtrl', [
    '$scope', '$modal', 'satnetRPC',
    function ($scope, $modal, satnetRPC) {

        'use strict';

        $scope.scIds = [];
        $scope.addSpacecraft = function () {
            var modalInstance = $modal.open({
                templateUrl: '/static/satnet-ng/templates/addSpacecraft.html',
                controller: 'AddSCModalCtrl',
                backdrop: 'static'
            });
            console.log('Created modalInstance = ' + modalInstance);
        };
        $scope.editSpacecraft = function (s) {
            var modalInstance = $modal.open({
                templateUrl: '/static/satnet-ng/templates/editSpacecraft.html',
                controller: 'EditSCModalCtrl',
                backdrop: 'static',
                resolve: { spacecraftId: function () {
                    return s;
                } }
            });
            console.log('Created modalInstance = ' + modalInstance);
        };
        $scope.refreshSCList = function () {
            satnetRPC.rCall('sc.list', []).then(function (data) {
                if (data !== null) {
                    console.log('sc.list >>> data = ' + JSON.stringify(data));
                    $scope.scIds = data.slice(0);
                }
            });
        };
        $scope.refreshSCList();

    }
]);

angular.module('ui-menu-controllers').controller('ExitMenuCtrl', [
    '$scope', '$log',
    function ($scope, $log) {
        'use strict';
        $scope.home = function () {
            $log.info('Exiting...');
        };
    }
]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/24/14.
 */

/** Module definition (empty array is vital!). */
angular.module(
    'ui-modalgs-controllers',
    [
        'ui.bootstrap',
        'nya.bootstrap.select',
        'leaflet-directive',
        'satnet-services',
        'broadcaster'
    ]
);

angular.module('ui-modalgs-controllers')
    .constant('LAT', 32.630)
    .constant('LNG', 8.933)
    .constant('D_ZOOM', 10)
    .constant('GS_ELEVATION', 15.0)
    .controller('AddGSModalCtrl', [
        '$scope',
        '$log',
        '$modalInstance',
        'satnetRPC',
        'broadcaster',
        'LAT',
        'LNG',
        'D_ZOOM',
        'GS_ELEVATION',
        function (
            $scope,
            $log,
            $modalInstance,
            satnetRPC,
            broadcaster,
            LAT,
            LNG,
            D_ZOOM,
            GS_ELEVATION
        ) {

            'use strict';

            $scope.gs = {};
            $scope.gs.identifier = '';
            $scope.gs.callsign = '';
            $scope.gs.elevation = GS_ELEVATION;

            $scope.center = {};
            $scope.markers = [];

            angular.extend($scope, {
                center: {
                    lat: LAT,
                    lng: LNG,
                    zoom: D_ZOOM
                },
                markers: {
                    gsStyle: {
                        lat: LAT,
                        lng: LNG,
                        message: 'Move me!',
                        focus: true,
                        draggable: true
                    }
                }
            });

            $scope.initMap = function () {
                satnetRPC.getUserLocation().then(function (location) {
                    $scope.center.lat = location.lat;
                    $scope.center.lng = location.lng;
                    $scope.markers.gsStyle.lat = location.lat;
                    $scope.markers.gsStyle.lng = location.lng;
                });
            };

            $scope.initMap();

            $scope.ok = function () {
                var newGsCfg = [
                    $scope.gs.identifier,
                    $scope.gs.callsign,
                    $scope.gs.elevation.toFixed(2),
                    $scope.markers.gsStyle.lat.toFixed(6),
                    $scope.markers.gsStyle.lng.toFixed(6)
                ];
                satnetRPC.rCall('gs.add', newGsCfg).then(function (data) {
                    var gsId = data.groundstation_id;
                    $log.info('[map-ctrl] GS added, id = ' + gsId);
                    broadcaster.gsAdded(gsId);
                    $modalInstance.close();
                });
            };
            $scope.cancel = function () {
                $modalInstance.close();
            };
        }
    ]);

angular.module('ui-modalgs-controllers')
    .constant('LAT', 32.630)
    .constant('LNG', 8.933)
    .constant('D_ZOOM', 10)
    .constant('GS_ELEVATION', 15.0)
    .controller('EditGSModalCtrl', [
        '$scope',
        '$log',
        '$modalInstance',
        'satnetRPC',
        'broadcaster',
        'maps',
        'groundstationId',
        'LAT',
        'LNG',
        'D_ZOOM',
        function (
            $scope,
            $log,
            $modalInstance,
            satnetRPC,
            broadcaster,
            maps,
            groundstationId,
            LAT,
            LNG,
            D_ZOOM
        ) {
            'use strict';

            $scope.gs = {};
            $scope.center = {};
            $scope.markers = [];

            angular.extend($scope, {
                center: {
                    lat: LAT,
                    lng: LNG,
                    zoom: D_ZOOM
                },
                markers: {
                    gsStyle: {
                        lat: LAT,
                        lng: LNG,
                        message: 'Move me!',
                        focus: true,
                        draggable: true
                    }
                }
            });

            satnetRPC.rCall('gs.get', [groundstationId]).then(function (cfg) {
                $scope.gs.identifier = groundstationId;
                $scope.gs.callsign = cfg.groundstation_callsign;
                $scope.gs.elevation = cfg.groundstation_elevation;
                angular.extend($scope, {
                    center: {
                        lat: cfg.groundstation_latlon[0],
                        lng: cfg.groundstation_latlon[1],
                        zoom: maps.DEFAULT_ZOOM
                    },
                    markers: {
                        gsStyle: {
                            lat: cfg.groundstation_latlon[0],
                            lng: cfg.groundstation_latlon[1],
                            message: 'Move me!',
                            focus: true,
                            draggable: true
                        }
                    }
                });
            });
            $scope.update = function () {
                var newGsCfg = {
                    'groundstation_id': groundstationId,
                    'groundstation_callsign': $scope.gs.callsign,
                    'groundstation_elevation': $scope.gs.elevation.toFixed(2),
                    'groundstation_latlon': [
                        $scope.markers.gsStyle.lat.toFixed(6),
                        $scope.markers.gsStyle.lng.toFixed(6)
                    ]
                };
                satnetRPC.rCall(
                    'gs.update',
                    [groundstationId, newGsCfg]
                ).then(function (data) {
                    $log.info('[map-ctrl] GS updated, id = ' + data);
                    broadcaster.gsUpdated(groundstationId);
                    $modalInstance.close();
                });
            };
            $scope.cancel = function () {
                $modalInstance.close();
            };
            $scope.erase = function () {
                if (confirm('Delete this ground station?') === true) {
                    satnetRPC.rCall(
                        'gs.delete',
                        [groundstationId]
                    ).then(function (gsId) {
                        $log.info('[map-ctrl] GS removed, id = ' + gsId);
                        broadcaster.gsRemoved(gsId);
                        $modalInstance.close();
                    });
                }
            };

        }
    ]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/24/14.
 */

/** Module definition (empty array is vital!). */
angular.module(
    'ui-modalsc-controllers',
    [
        'ui.bootstrap',
        'nya.bootstrap.select',
        'celestrak-services',
        'satnet-services',
        'broadcaster'
    ]
);

angular.module('ui-modalsc-controllers').controller('AddSCModalCtrl', [
    '$scope', '$log', '$modalInstance', 'satnetRPC', 'celestrak', 'broadcaster',
    function ($scope, $log, $modalInstance, satnetRPC, celestrak, broadcaster) {

        'use strict';

        $scope.sc = {
            identifier: '',
            callsign: '',
            tlegroup: '',
            tleid: ''
        };

        $scope.tlegroups = celestrak.CELESTRAK_SELECT_SECTIONS;
        $scope.tles = [];

        $scope.initTles = function (defaultOption) {
            satnetRPC.rCall('tle.celestrak.getResource', [defaultOption])
                .then(function (tleIds) {
                    $scope.tles = tleIds.tle_list.slice(0);
                    console.log('$scope.tles = ' + JSON.stringify($scope.tles));
                });
            $scope.sc.tlegroup = defaultOption;
        };
        $scope.groupChanged = function (value) {
            satnetRPC.rCall('tle.celestrak.getResource', [value.subsection])
                .then(function (tleIds) {
                    $scope.tles = tleIds.tle_list.slice(0);
                    console.log('$scope.tles = ' + JSON.stringify($scope.tles));
                });
        };
        $scope.ok = function () {
            var newScCfg = [
                $scope.sc.identifier,
                $scope.sc.callsign,
                $scope.sc.tleid.spacecraft_tle_id
            ];
            satnetRPC.rCall('sc.add', newScCfg).then(function (data) {
                $log.info(
                    '[map-ctrl] SC added, id = ' + data.spacecraft_id
                );
                broadcaster.scAdded(data.spacecraft_id);
            });
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.close();
        };
    }
]);

angular.module('ui-modalsc-controllers').controller('EditSCModalCtrl', [
    '$scope', '$log', '$modalInstance',
    'satnetRPC', 'celestrak', 'spacecraftId', 'broadcaster',
    function ($scope, $log, $modalInstance, satnetRPC, celestrak, spacecraftId, broadcaster) {
        'use strict';

        $scope.sc = {
            identifier: spacecraftId,
            callsign: '',
            tlegroup: '',
            tleid: '',
            savedTleId: ''
        };

        $scope.tlegroups = celestrak.CELESTRAK_SELECT_SECTIONS;
        $scope.tles = [];

        satnetRPC.rCall('sc.get', [spacecraftId]).then(function (data) {
            $scope.sc.identifier = spacecraftId;
            $scope.sc.callsign = data.spacecraft_callsign;
            $scope.sc.savedTleId = data.spacecraft_tle_id;
        });

        $scope.initTles = function (defaultOption) {
            satnetRPC.rCall('tle.celestrak.getResource', [defaultOption])
                .then(function (tleIds) {
                    $scope.tles = tleIds.tle_list.slice(0);
                });
            $scope.sc.tlegroup = defaultOption;
        };

        $scope.groupChanged = function (value) {
            console.log(
                'value = ' + JSON.stringify(value) +
                    ', ss = ' + JSON.stringify(value.subsection)
            );
            satnetRPC.rCall('tle.celestrak.getResource', [value.subsection])
                .then(function (tleIds) {
                    $scope.tles = tleIds.tle_list.slice(0);
                });
        };
        $scope.update = function () {
            var newScCfg = {
                'spacecraft_id': spacecraftId,
                'spacecraft_callsign': $scope.sc.callsign,
                'spacecraft_tle_id': $scope.sc.tleid.id
            };
            satnetRPC.rCall(
                'sc.update',
                [spacecraftId, newScCfg]
            ).then(function (data) {
                $log.info('[map-ctrl] SC updated, id = ' + data);
                broadcaster.scUpdated(data);
            });
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.close();
        };
        $scope.erase = function () {
            if (confirm('Delete this spacecraft?') === true) {
                satnetRPC.rCall('sc.delete', [spacecraftId]).then(function (data) {
                    $log.info(
                        '[map-ctrl] Spacecraft removed, id = ' + JSON.stringify(data)
                    );
                    broadcaster.scRemoved(data);
                });
                $modalInstance.close();
            }
        };

    }
]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/1/14.
 */

/**
 * Main application for the norminal operational phase.
 * @type {ng.IModule}
 */
var app = angular.module('satnet-ui', [
    // AngularJS libraries
    'jsonrpc',
    'ngCookies',
    'ngResource',
    'leaflet-directive',
    'remoteValidation',
    // level 1 services/models
    'broadcaster',
    'map-services',
    'celestrak-services',
    'satnet-services',
    'x-satnet-services',
    // level 2 services/models
    'marker-models',
    // level 3 services/models
    'x-server-models',
    'x-spacecraft-models',
    'x-groundstation-models',
    // level 4 (controllers),
    'ui-map-controllers',
    'ui-menu-controllers',
    'ui-modalsc-controllers',
    'ui-modalgs-controllers'
]);

// level 1 services
angular.module('broadcaster');
angular.module('map-services');
angular.module('satnet-services');
angular.module('x-satnet-services');
angular.module('celestrak-services');
// level 2 services
angular.module('marker-models');
// level 3 services
angular.module('x-server-models');
angular.module('x-spacecraft-models');
angular.module('x-groundstation-models');
// level 4 controllers
angular.module('ui-map-controllers');
angular.module('ui-menu-controllers');
angular.module('ui-modalsc-controllers');
angular.module('ui-modalgs-controllers');

/**
 * Configuration of the main AngularJS logger so that it broadcasts all logging
 * messages as events that can be catched by other visualization UI controllers.
 */
app.config(function ($provide) {
    'use strict';
    $provide.decorator('$log', function ($delegate) {
        var rScope = null;
        return {
            setScope: function (scope) { rScope = scope; },
            log: function (args) {
                $delegate.log.apply(null, ['[log] ' + args]);
                rScope.$broadcast('logEvent', args);
            },
            info: function (args) {
                $delegate.info.apply(null, ['[info] ' + args]);
                rScope.$broadcast('infoEvent', args);
            },
            error: function () {
                //$delegate.error.apply(null, ['[error] ' + args]);
                $delegate.error.apply(null, arguments);
                //Logging.error.apply(null,arguments)
                //rScope.$broadcast('errEvent', arguments);
            },
            warn: function (args) {
                $delegate.warn.apply(null, ['[warn] ' + args]);
                rScope.$broadcast('warnEvent', args);
            }
        };
    });
});

/**
 * Main run method for the AngularJS app.
 */
app.run([
    '$rootScope', '$log', '$http', '$cookies',
    function ($rootScope, $log, $http, $cookies) {
        'use strict';
        $log.setScope($rootScope);
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    }
]);

app.constant('TIMESTAMP_FORMAT', 'HH:mm:ss.sss')
    .controller('NotificationAreaController', [
        '$scope', '$filter', 'TIMESTAMP_FORMAT',
        function ($scope, $filter, TIMESTAMP_FORMAT) {

            'use strict';
            $scope.eventLog = [];
            $scope.logEvent = function (event, message) {
                $scope.eventLog.unshift({
                    'type': event.name,
                    'timestamp': $filter('date')(new Date(), TIMESTAMP_FORMAT),
                    'msg':  message
                });
            };

            $scope.$on('logEvent', function (event, message) {
                $scope.logEvent(event, message);
            });
            $scope.$on('infoEvent', function (event, message) {
                $scope.logEvent(event, message);
            });
            $scope.$on('warnEvent', function (event, message) {
                $scope.logEvent(event, message);
            });
            $scope.$on('errEvent', function (event, message) {
                $scope.logEvent(event, message);
            });

        }
    ]);;/**
 * Copyright 2014 Ricardo Tubio-Pardavila
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by rtubio on 10/1/14.
 */

/**
 * Main application for the LEOP operational phase.
 * @type {ng.IModule}
 */
var app = angular.module('leop-ui', [
    // AngularJS libraries
    'jsonrpc',
    'ngCookies',
    'ngResource',
    'leaflet-directive',
    'remoteValidation',
    // level 1 services
    'broadcaster',
    'map-services',
    'celestrak-services',
    'satnet-services',
    'x-satnet-services',
    // level 2 services/models
    'marker-models',
    // level 3 services/models
    'x-server-models',
    'x-spacecraft-models',
    'x-groundstation-models',
    // level 4 (controllers),
    'ui-leop-map-controllers',
    'ui-menu-controllers',
    'ui-leop-menu-controllers',
    'ui-leop-modalufo-controllers',
    'ui-leop-modalgs-controllers'
]);

// level 1 services
angular.module('broadcaster');
angular.module('map-services');
angular.module('celestrak-services');
angular.module('satnet-services');
angular.module('x-satnet-services');
// level 2 services (bussiness logic layer)
angular.module('marker-models');
// level 3 services
angular.module('x-server-models');
angular.module('x-spacecraft-models');
angular.module('x-groundstation-models');
// level 4 controllers
angular.module('ui-leop-map-controllers');
angular.module('ui-menu-controllers');
angular.module('ui-leop-menu-controllers');
angular.module('ui-leop-modalufo-controllers');
angular.module('ui-leop-modalgs-controllers');

/**
 * Configuration of the main AngularJS logger so that it broadcasts all logging
 * messages as events that can be catched by other visualization UI controllers.
 */
app.config(function ($provide) {
    'use strict';
    $provide.decorator('$log', function ($delegate) {
        var rScope = null;
        return {
            setScope: function (scope) { rScope = scope; },
            log: function (args) {
                $delegate.log.apply(null, ['[log] ' + args]);
                rScope.$broadcast('logEvent', args);
            },
            info: function (args) {
                $delegate.info.apply(null, ['[info] ' + args]);
                rScope.$broadcast('infoEvent', args);
            },
            error: function () {
                $delegate.error.apply(null, arguments);
            },
            warn: function (args) {
                $delegate.warn.apply(null, ['[warn] ' + args]);
                rScope.$broadcast('warnEvent', args);
            }
        };
    });
});

/**
 * Main run method for the AngularJS app.
 */
app.run([
    '$rootScope', '$log', '$http', '$cookies', '$window',
    function ($rootScope, $log, $http, $cookies, $window) {
        'use strict';
        $log.setScope($rootScope);
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        $rootScope.leop_id = $window.leop_id;
    }
]);

app.constant('TIMESTAMP_FORMAT', 'HH:mm:ss.sss')
    .controller('NotificationAreaController', [
        '$scope', '$filter', 'TIMESTAMP_FORMAT',
        function ($scope, $filter, TIMESTAMP_FORMAT) {

            'use strict';
            $scope.eventLog = [];
            $scope.logEvent = function (event, message) {
                $scope.eventLog.unshift({
                    'type': event.name,
                    'timestamp': $filter('date')(new Date(), TIMESTAMP_FORMAT),
                    'msg':  message
                });
            };

            $scope.$on('logEvent', function (event, message) {
                $scope.logEvent(event, message);
            });
            $scope.$on('infoEvent', function (event, message) {
                $scope.logEvent(event, message);
            });
            $scope.$on('warnEvent', function (event, message) {
                $scope.logEvent(event, message);
            });
            $scope.$on('errEvent', function (event, message) {
                $scope.logEvent(event, message);
            });

        }
    ]);