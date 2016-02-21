/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

var markers = [];
var bike_crash_data = "https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/philadelphia-bike-crashes-snippet.json";
var soloar_data = "https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/philadelphia-solar-installations.json";
var capital_data = "https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/world-country-capitals.json";
var crime_data = "https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/philadelphia-crime-snippet.json";

$(document).ready(function() {
  var map = L.map('map', {
    center: [39.9522, -75.1639],
    zoom: 14
  });

  var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

  $('#button').click(function(e) {
    var url = $('#url-input').val();
    console.log("URL", url);

    var lat_key = $('#Lat-input').val();
    console.log("Latitude Key: ", lat_key);

    var long_key = $('#Long-input').val();
    console.log("Longitude Key", long_key);

    var downloadData = $.ajax(url);
    console.log(downloadData);

    var parseData = function(data){
      return JSON.parse(data);
    };

    var makeMarkers = function(data) {
      if(url == bike_crash_data | url == soloar_data | url == capital_data){
        return _.map(data, function(x){return L.marker([x[lat_key],x[long_key]]);});
      }
      else if (url == crime_data) {
        return _.map(filtered, function(data){
                var slice = data.Coordinates.slice(1,-1).split(", ");
                return L.marker([slice[0],slice[1]]);
              });
      }
    };

    var plotMarkers = function(marker){
      _.each(marker, function(x){x.addTo(map);});
    };

    var removeMarkers = function(layer) {
      _.each(layer, function(x){map.removeLayer(x);});
    };

    var resetMap = function() {
      _.each(myMarkers, function(marker) { map.removeLayer(marker); });
      myMarkers = [];
    };

    //remove existing markers
    removeMarkers(markers);

    downloadData.done(function(data) {
      //set appropriate map view
      if(url == capital_data){
        map.setView(new L.LatLng(39.176204, 6.200453), 2);
      }
      else{
        map.setView(new L.LatLng(39.9522, -75.1639), 14);
      }
      var parsed = parseData(data);
      markers = makeMarkers(parsed);
      plotMarkers(markers);
    });
  });

});
