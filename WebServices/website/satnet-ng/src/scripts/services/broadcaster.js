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
angular.module('broadcaster', ['pushServices']);

/**
 * Service used for broadcasting UI events in between controllers.
 */
angular.module('broadcaster').service('broadcaster', [
    '$rootScope', 'satnetPush',
    function ($rootScope, satnetPush) {

        'use strict';

        /**********************************************************************/
        /************************************************* INTERNAL CALLBACKS */
        /**********************************************************************/

        this.GS_ADDED_EVENT = 'gs.added';
        this.GS_REMOVED_EVENT = 'gs.removed';
        this.GS_UPDATED_EVENT = 'gs.updated';
        this.GS_AVAILABLE_ADDED_EVENT = 'gs.available.added';
        this.GS_AVAILABLE_REMOVED_EVENT = 'gs.available.removed';
        this.GS_AVAILABLE_UPDATED_EVENT = 'gs.available.updated';
        this.PASSES_UPDATED = 'passes.updated';
        this.LEOP_GSS_UPDATED_EVENT = 'leop.gss.updated';

        /**
         * Function that broadcasts the event associated with the creation of a
         * new GroundStation available for the LEOP cluster.
         * @param identifier The identifier of the GroundStation.
         */
        this.gsAvailableAddedInternal = function (identifier) {
            $rootScope.$broadcast('gs.available.added', identifier);
        };

        /**
         * Function that broadcasts the event associated with the creation of a
         * new GroundStation.
         * @param identifier The identifier of the GroundStation.
         */
        this.gsAdded = function (identifier) {
            $rootScope.$broadcast(this.GS_ADDED_EVENT, identifier);
        };

        /**
         * Function that broadcasts the event associated with the removal of a
         * new GroundStation.
         * @param identifier The identifier of the GroundStation.
         */
        this.gsRemoved = function (identifier) {
            $rootScope.$broadcast(this.GS_REMOVED_EVENT, identifier);
        };

        /**
         * Function that broadcasts the event associated with the update of
         * new GroundStation.
         * @param identifier The identifier of the GroundStation.
         */
        this.gsUpdated = function (identifier) {
            $rootScope.$broadcast(this.GS_UPDATED_EVENT, identifier);
        };

        /**********************************************************************/
        /***************************************************** PUSH CALLBACKS */
        /**********************************************************************/

        this.gsAvailableAdded = function (id_object) {
            $rootScope.$broadcast('gs.available.added', id_object.identifier);
        };
        this.gsAvailableRemoved = function (id_object) {
            $rootScope.$broadcast('gs.available.removed', id_object.identifier);
        };
        this.gsAvailableUpdated = function (id_object) {
            $rootScope.$broadcast('gs.available.updated', id_object.identifier);
        };
        this.passesUpdated = function () {
            $rootScope.$broadcast('passes.updated', {});
        };
        this.leopGssUpdated = function (leop_id) {
            if ($rootScope.leop_id !== leop_id.identifier) {
                return;
            }
            $rootScope.$broadcast('leop.gss.updated');
        };

        satnetPush.bind(
            satnetPush.EVENTS_CHANNEL,
            satnetPush.GS_ADDED_EVENT,
            this.gsAvailableAdded,
            this
        );
        satnetPush.bind(
            satnetPush.EVENTS_CHANNEL,
            satnetPush.GS_REMOVED_EVENT,
            this.gsAvailableRemoved,
            this
        );
        satnetPush.bind(
            satnetPush.EVENTS_CHANNEL,
            satnetPush.GS_UPDATED_EVENT,
            this.gsAvailableUpdated,
            this
        );
        satnetPush.bind(
            satnetPush.SIMULATION_CHANNEL,
            satnetPush.PASSES_UPDATED_EVENT,
            this.passesUpdated,
            this
        );
        satnetPush.bind(
            satnetPush.LEOP_CHANNEL,
            satnetPush.LEOP_GSS_UPDATED_EVENT,
            this.leopGssUpdated,
            this
        );

        /**********************************************************************/
        /************************************************* INTERNAL CALLBACKS */
        /**********************************************************************/

        this.SC_ADDED_EVENT = 'sc.added';
        this.SC_REMOVED_EVENT = 'sc.removed';
        this.SC_UPDATED_EVENT = 'sc.updated';

        /**
         * Function that broadcasts the event associated with the creation of a
         * new Spacececraft.
         * @param identifier The identifier of the Spacececraft.
         */
        this.scAdded = function (identifier) {
            $rootScope.$broadcast(this.SC_ADDED_EVENT, identifier);
        };

        /**
         * Function that broadcasts the event associated with the removal of a
         * new Spacececraft.
         * @param identifier The identifier of the Spacececraft.
         */
        this.scRemoved = function (identifier) {
            $rootScope.$broadcast(this.SC_REMOVED_EVENT, identifier);
        };

        /**
         * Function that broadcasts the event associated with the update of
         * new Spacececraft.
         * @param identifier The identifier of the Spacececraft.
         */
        this.scUpdated = function (identifier) {
            $rootScope.$broadcast(this.SC_UPDATED_EVENT, identifier);
        };

    }
]);