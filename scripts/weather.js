var map;
var geoJSON;
var request;
var gettingData = false;
var openWeatherKey = "3742188e4b08b08ad8ab95dace5f71d3"
  function initialize() {
    var mapStyles = {
      // how much zoomed in 
      zoom: 5,
      // The latitude and longitude to center the map
      center: new google.maps.LatLng(53.0000, 9.0000),
      styles: [
      //all over colors
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#E8E241'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#E1B8FF'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#5CCF65'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      { // little road color
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#84159E'}]
      },
      { // border road
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      { // text color
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      { // big roads color
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#E87D0C'}]
      },
      { // border big roads color
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      { // text color big road
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      { //public transport road
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#FF0000'}]
      },
      {//text color
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#CFFF7D'}]
      },
      { //color water
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#4588FF'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
    };
    //get google maps to show with the customasation
    map = new google.maps.Map(document.getElementById('map'),
        mapStyles);
    // Add interaction listeners to make weather requests
    google.maps.event.addListener(map, 'idle', checkIfDataRequested);
    // When you click you get the infomation from the icon
    map.data.addListener('click', function(event) {
      infowindow.setContent(
       "<img src=" + event.feature.getProperty("icon") + ">"
       + "<br /><strong>" + event.feature.getProperty("city") + "</strong>"
       + "<br />" + event.feature.getProperty("temperature") + "&deg;C"
       + "<br />" + event.feature.getProperty("weather")
       );
      infowindow.setOptions({
          position:{
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          },
          pixelOffset: {
            width: 0,
            height: -15
          }
      });
      infowindow.open(map);
    });
  }
  var checkIfDataRequested = function() {
    // Stop extra requests being sent
    while (gettingData === true) {
      request.abort();
      gettingData = false;
    }
    getPosition();
  };
  // Get the coordinates from the Map bounds
  var getPosition = function() {
    var boundaries = map.getBounds();
    var northEast = boundaries.getNorthEast();
    var southWest = boundaries.getSouthWest();
    getWeather(northEast.lat(), northEast.lng(), southWest.lat(), southWest.lng());
  };
  // Make the weather request
  var getWeather = function(northLat, eastLng, southLat, westLng) {
   gettingData = true;
    var requestString = "https://api.openweathermap.org/data/2.5/box/city?bbox="
                        + westLng + "," + northLat + "," //left top
                        + eastLng + "," + southLat + "," //right bottom
                        + map.getZoom()
                        + "&cluster=yes&format=json"
                        + "&APPID=" + openWeatherKey;
    request = new XMLHttpRequest();
    request.onload = proccessResults;
    request.open("get", requestString, true);
    request.send();
    //tried getting results with fetch()
    /*var url = "https://api.openweathermap.org/data/2.5/box/city?bbox=";
    var request = url + westLng + "," + northLat + "," //left top
                        + eastLng + "," + southLat + "," //right bottom
                        + map.getZoom() + "&cluster=yes&format=json" + "&APPID=" + openWeatherKey;
    fetch(request)
    .then(function(response) {
      return response.json();
    })

    .then(function(response) {
    // render weatherCondition
      proccessResults;
      jsonToGeoJson;
    })*/
  };
  // Take the JSON results and proccess them
  var proccessResults = function() {
    //console.log(this);
    var results = JSON.parse(this.responseText);
    if (results.list.length > 0) {
        resetData();
        for (var i = 0; i < results.list.length; i++) {
          geoJSON.features.push(jsonToGeoJson(results.list[i]));
        }
        drawIcons(geoJSON);
    }
  };
  var infowindow = new google.maps.InfoWindow();
  // For each result that comes back, convert the data to geoJSON
  var jsonToGeoJson = function (weatherDetail) {
    var feature = {
      type: "Feature",
      properties: {
        city: weatherDetail.name,
        weather: weatherDetail.weather[0].main,
        temperature: weatherDetail.main.temp,
        min: weatherDetail.main.temp_min,
        max: weatherDetail.main.temp_max,
        humidity: weatherDetail.main.humidity,
        pressure: weatherDetail.main.pressure,
        windSpeed: weatherDetail.wind.speed,
        windDegrees: weatherDetail.wind.deg,
        windGust: weatherDetail.wind.gust,
        icon: "https://openweathermap.org/img/w/"
              + weatherDetail.weather[0].icon  + ".png",
        coordinates: [weatherDetail.coord.Lon, weatherDetail.coord.Lat]
      },
      geometry: {
        type: "Point",
        coordinates: [weatherDetail.coord.Lon, weatherDetail.coord.Lat]
      }
    };
    // Set the custom marker icon
    map.data.setStyle(function(feature) {
      return {
        icon: {
          url: feature.getProperty('icon'),
          anchor: new google.maps.Point(25, 25)
        }
      };
    });
    // returns object
    return feature;
  };
  // Add the markers to the map
  var drawIcons = function (weather) {
     map.data.addGeoJson(geoJSON);
     // Set the flag to finished
     gettingData = false;
  };
  // Clear data layer and geoJSON
  var resetData = function () {
    geoJSON = {
      type: "FeatureCollection",
      features: []
    };
    map.data.forEach(function(feature) {
      map.data.remove(feature);
    });
  };
google.maps.event.addDomListener(window, 'load', initialize);

  