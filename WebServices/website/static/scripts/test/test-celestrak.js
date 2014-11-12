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

describe('celestrak-services', function () {
    'use strict';
    describe('when I call celestrak.findTle', function () {
        beforeEach(module('celestrak-services'));
        it('Tests celestrak services', inject(function (celestrak) {
            runs(function () {
                celestrak.findTle('HUMSAT-D')
                    .then(function (data) {
                        expect(data.tle_id).toBeEqual('HUMSAT-D');
                    });
            });
        }));
    });
});