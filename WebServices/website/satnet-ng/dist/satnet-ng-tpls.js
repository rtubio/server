angular.module('satnet-ui').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/addGroundStation.html',
    "<div class=\"modal-header\"><h3 class=\"modal-title\">Add Ground Station</h3></div><div class=\"modal-body\" style=\"display: table-row\"><div style=\"float: left; display: table-cell; width: 175px; margin: 15px\"><form name=\"form\"><div class=\"control-group\" ng-class=\"{ 'has-error': form.identifier.$invalid }\"><label class=\"control-label\" for=\"identifier\">Identifier</label><input type=\"text\" name=\"identifier\" class=\"form-control\" style=\"width: 95%\" ng-model=\"gs.identifier\" ng-remote-validate=\"/configuration/groundstations/valid_id\" ng-remote-throttle=\"200\" ng-remote-method=\"GET\" ng-pattern=\"/^[a-zA-Z0-9.\\-_]{5,8}$/\" required></div><div class=\"control-group\" ng-class=\"{ 'has-error': form.callsign.$invalid }\"><label class=\"control-label\" for=\"callsign\">Callsign</label><input type=\"text\" name=\"callsign\" ng-model=\"gs.callsign\" class=\"form-control\" style=\"width: 95%\" ng-pattern=\"/^[a-zA-Z0-9]{3,8}$/\" required></div><div class=\"control-group\" ng-class=\"{ 'has-error': form.elevation.$invalid }\"><label class=\"control-label\" for=\"elevation\">Min. Antenna Elevation</label><input type=\"number\" name=\"elevation\" ng-model=\"gs.elevation\" class=\"form-control\" style=\"width: 95%\" step=\"0.01\" min=\"0\" max=\"90\" required></div><hr><label for=\"add_gs_lat\">Latitude</label><input type=\"text\" name=\"add_gs_lat\" readonly ng-model=\"markers.gs.lat\" style=\"width: 95%\"><label for=\"add_gs_lng\">Longitude</label><input type=\"text\" name=\"add_gs_lng\" readonly ng-model=\"markers.gs.lng\" style=\"width: 95%\"></form></div><div style=\"display: table-cell\"><leaflet id=\"addGSMap\" style=\"float: left; width: 365px; height: 365px;\n" +
    "                 margin: 15px 15px 15px 0\" center=\"center\" markers=\"markers\" layers=\"layers\"></leaflet></div></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\" ng-disabled=\"form.$invalid\">(ok)</button> <button class=\"btn btn-warning\" ng-click=\"cancel()\">(cancel)</button></div>"
  );


  $templateCache.put('templates/addSpacecraft.html',
    "<div class=\"modal-header\"><h3 class=\"modal-title\">Add Spacecraft</h3></div><div class=\"modal-body\" style=\"display: inline-block\"><form name=\"form\"><div style=\"display: inline-block; padding: 20px\"><div style=\"float: left; width: 250px\"><div class=\"control-group\" ng-class=\"{ 'has-error': form.identifier.$invalid }\"><label class=\"control-label\" for=\"identifier\">Identifier</label><input type=\"text\" name=\"identifier\" class=\"form-control\" style=\"width: 95%\" ng-model=\"sc.identifier\" ng-remote-validate=\"/configuration/spacecraft/valid_id\" ng-remote-throttle=\"200\" ng-remote-method=\"GET\" ng-pattern=\"/^[a-zA-Z0-9.\\-_]{5,8}$/\" required></div><div class=\"control-group\" ng-class=\"{ 'has-error': form.callsign.$invalid }\"><label class=\"control-label\" for=\"callsign\">Callsign</label><input type=\"text\" name=\"callsign\" ng-model=\"sc.callsign\" class=\"form-control\" style=\"width: 95%\" ng-pattern=\"/^[a-zA-Z0-9]{3,8}$/\" required></div></div><div class=\"my-tle-menu\"><div class=\"control-group\" ng-class=\"{ 'has-error': form.tlegroup.$pristine }\"><label class=\"control-label\" for=\"tlegroup\">TLE Group (Celestrak)</label><ol id=\"tlegroup\" class=\"nya-bs-select\" ng-model=\"sc.tlegroup\" ng-change=\"groupChanged(sc.tlegroup)\"><li nya-bs-option=\"t in tlegroups group by t.section\"><span class=\"dropdown-header\">{{$group}}</span> <a>{{t.subsection}}</a></li></ol></div><div class=\"control-group\" ng-class=\"{ 'has-error': form.tleid.$pristine }\"><label class=\"control-label\" for=\"tleid\"><div style=\"display: inline-block\"><div style=\"float: left, padding: 20px\"><p>TLE Id</p></div><div><p style=\"font-size:70%\">(Current: {{ sc.savedTleId }})</p></div></div></label><ol id=\"tleid\" class=\"nya-bs-select\" ng-model=\"sc.tleid\"><li nya-bs-option=\"t in tles\"><span class=\"dropdown-header\">{{$group}}</span> <a>{{t.spacecraft_tle_id}}</a></li></ol></div></div></div></form></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\" ng-disabled=\"form.$invalid\">(ok)</button> <button class=\"btn btn-warning\" ng-click=\"cancel()\">(cancel)</button></div>"
  );


  $templateCache.put('templates/editGroundStation.html',
    "<div class=\"modal-header\"><h3 class=\"modal-title\">Edit Ground Station</h3></div><div class=\"modal-body\" style=\"display: table-row\"><div style=\"float: left; display: table-cell; width: 175px; margin: 15px\"><form name=\"form\"><div class=\"control-group\" ng-class=\"{ 'has-error': form.identifier.$invalid }\"><label class=\"control-label\" for=\"identifier\">Identifier</label><input type=\"text\" name=\"identifier\" id=\"identifier\" class=\"form-control\" style=\"width: 95%\" ng-model=\"gs.identifier\" readonly></div><div class=\"control-group\" ng-class=\"{ 'has-error': form.callsign.$invalid }\"><label class=\"control-label\" for=\"callsign\">Callsign</label><input type=\"text\" name=\"callsign\" id=\"callsign\" ng-model=\"gs.callsign\" class=\"form-control\" style=\"width: 95%\" ng-pattern=\"/^[a-zA-Z0-9]{3,8}$/\" required></div><div class=\"control-group\" ng-class=\"{ 'has-error': form.elevation.$invalid }\"><label class=\"control-label\" for=\"elevation\">Min. Antenna Elevation</label><input type=\"number\" name=\"elevation\" id=\"elevation\" ng-model=\"gs.elevation\" class=\"form-control\" style=\"width: 95%\" step=\"0.01\" min=\"0\" max=\"90\" required></div><hr><label for=\"edit_gs_lat\">Latitude</label><input type=\"text\" name=\"edit_gs_lat\" id=\"edit_gs_lat\" readonly ng-model=\"markers.gs.lat\" style=\"width: 95%\"><label for=\"edit_gs_lng\">Longitude</label><input type=\"text\" name=\"edit_gs_lng\" id=\"edit_gs_lng\" readonly ng-model=\"markers.gs.lng\" style=\"width: 95%\"> <input type=\"hidden\" name=\"hidden_lat\" ng-model=\"markers.gs.lat\"> <input type=\"hidden\" name=\"hidden_lng\" ng-model=\"markers.gs.lng\"></form></div><div style=\"display: table-cell\"><leaflet id=\"editGSMap\" style=\"float: left; width: 365px; height:365px; margin: 15px 15px 15px 0px\" markers=\"markers\" center=\"center\" layers=\"layers\"></leaflet></div></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"update()\" ng-disabled=\"form.$pristine || form.$invalid\">(update)</button> <button class=\"btn btn-warning\" ng-click=\"cancel()\">(cancel)</button> <button class=\"btn btn-danger\" ng-click=\"erase()\">(remove)</button></div>"
  );


  $templateCache.put('templates/editSpacecraft.html',
    "<div class=\"modal-header\"><h3 class=\"modal-title\">Edit Spacecraft</h3></div><div class=\"modal-body\" style=\"display: inline-block\"><form name=\"form\"><div style=\"display: inline-block; padding: 20px\"><div style=\"float: left; width: 250px\"><div class=\"control-group\" ng-class=\"{ 'has-error': form.identifier.$invalid }\"><label class=\"control-label\" for=\"identifier\">Identifier</label><input type=\"text\" name=\"identifier\" class=\"form-control\" style=\"width: 95%\" ng-model=\"sc.identifier\" readonly></div><div class=\"control-group\" ng-class=\"{ 'has-error': form.callsign.$invalid }\"><label class=\"control-label\" for=\"callsign\">Callsign</label><input type=\"text\" name=\"callsign\" ng-model=\"sc.callsign\" class=\"form-control\" style=\"width: 95%\" ng-pattern=\"/^[a-zA-Z0-9]{3,8}$/\" required></div></div><div class=\"my-tle-menu\"><div class=\"control-group\" ng-class=\"{ 'has-error': form.tlegroup.$pristine }\"><label class=\"control-label\" for=\"tlegroup\">TLE Group (Celestrak)</label><ol id=\"tlegroup\" class=\"nya-bs-select\" ng-model=\"sc.tlegroup\" ng-change=\"groupChanged(sc.tlegroup)\"><li nya-bs-option=\"t in tlegroups group by t.section\"><span class=\"dropdown-header\">{{$group}}</span> <a>{{t.subsection}}</a></li></ol></div><div class=\"control-group\" ng-class=\"{ 'has-error': form.tleid.$pristine }\"><label class=\"control-label\" for=\"tleid\"><div style=\"display: inline-block\"><div style=\"float: left, padding: 20px\"><p>TLE Id</p></div><div><p style=\"font-size:70%\">(Current: {{ sc.savedTleId }})</p></div></div></label><ol id=\"tleid\" class=\"nya-bs-select\" ng-model=\"sc.tleid\"><li nya-bs-option=\"t in tles\"><span class=\"dropdown-header\">{{$group}}</span> <a>{{t.spacecraft_tle_id}}</a></li></ol></div></div></div></form></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"update()\" ng-disabled=\"form.$invalid\">(update)</button> <button class=\"btn btn-warning\" ng-click=\"cancel()\">(cancel)</button> <button class=\"btn btn-danger\" ng-click=\"erase()\">(remove)</button></div>"
  );


  $templateCache.put('templates/leop/manageGroundStations.html',
    "<div class=\"modal-header\"><h3 class=\"modal-title\">Manage Ground Stations</h3></div><div class=\"modal-body\" style=\"display: table-row\"><form name=\"form\"><div style=\"width: 300px; display: table-cell; text-align: center\"><h4>Available GS</h4><select multiple ng-model=\"gsIds.aItems\" ng-options=\"aid as aid.groundstation_id for aid in gsIds.leop_gs_available\" style=\"width: 95%\" class=\"leop-gs-duallist\"></select></div><div style=\"width: 10px; display: table-cell; margin-top: 50px\"><button id=\"a2u\" class=\"btn\" ng-disabled=\"!gsIds.aItems.length\" ng-click=\"selectGs()\">&gt;</button> <button id=\"u2a\" class=\"btn\" ng-disabled=\"!gsIds.uItems.length\" ng-click=\"unselectGs()\">&lt;</button></div><div style=\"width: 300px; display: table-cell; text-align: center\"><h4>Choosen GS</h4><select multiple ng-model=\"gsIds.uItems\" ng-options=\"uid as uid.groundstation_id for uid in gsIds.leop_gs_inuse\" style=\"width: 95%\"></select></div></form></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\"><!--ng-disabled=\"!gsIds.toAdd || !gsIds.toRemove\">-->(ok)</button> <button class=\"btn btn-warning\" ng-click=\"cancel()\">(cancel)</button></div>"
  );


  $templateCache.put('templates/leop/manageUFO.html',
    "<div class=\"modal-header\"><h3 class=\"modal-title\">Manage Ground Stations</h3></div><div class=\"modal-body\" style=\"display: table-row\"><form name=\"form\"></form></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\"><!--ng-disabled=\"!gsIds.toAdd || !gsIds.toRemove\">-->(ok)</button> <button class=\"btn btn-warning\" ng-click=\"cancel()\">(cancel)</button></div>"
  );


  $templateCache.put('templates/notifier/logNotifier.html',
    "<input type=\"checkbox\" name=\"n-area-toggle\" id=\"n-area-toggle\"><div ng-controller=\"logNotifierCtrl\" class=\"n-area\"><div class=\"n-area-title\"><label for=\"n-area-toggle\"></label></div><div class=\"n-area-content\"><ul class=\"n-area-list\"><li ng-repeat=\"e in eventLog\"><div class=\"n-area-info-row\"><div class=\"n-area-type-cell\"><p class=\"{{ e.type }}\">[@{{ e.timestamp }}]</p></div><div class=\"n-area-content-cell\"><span class=\"{{ e.type }}\">{{ e.msg }}</span></div></div></li></ul></div></div>"
  );

}]);
