function initMap() {
  var uluru = {lat: 52.045968, lng: 4.335846};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: uluru,
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
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    title: 'Uluru (Ayers Rock)'
  });
  
  var contentString = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">Havenstraat</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
  'sandstone rock formation in the southern part of the '+
  'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
  'south west of the nearest large town, Alice Springs; 450&#160;km '+
  '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
  'features of the Uluru - Kata Tjuta National Park. Uluru is '+
  'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
  'Aboriginal people of the area. It has many springs, waterholes, '+
  'rock caves and ancient paintings. Uluru is listed as a World '+
  'Heritage Site.</p>'+
  '</div>'+
  '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

/*function showDog(image){
  scaledSize: new google.maps.Size(20,32),
  origin: new.google.maps.Point(0,0),
  url: image

  var marker = new google.maps.Marker({
          position: lat: 52.045968, lng: 4.335846,
          map: map
        },
  icon: image,
  map: myMap,
  title: 'Uluru (Ayers Rock)'
});
}

function getAPIdata() {

  // get latest weather
  fetch('https://dog.ceo/api/breeds/image/random')
  
  // parse to JSON format
  .then(function(response) {
    return response.json();
  })
  
  showDog();
  // render weather per day
  .then(function(response) {

    // show full JSON object
    console.log(response.i);
    document.getElementById('dogs').src = response.message;
    for(var i = 0; i < response.length; i++) {
      //console.log(response.list[i]);
      //console.log(response.list[i].dt);
      //console.log(response.list[i].dt_txt);
      // etc.
    }

  })
  
  // catch error
  .catch(function (error) {
    console.error('Request failed', error);
  });
}

// init data stream
getAPIdata();*/
