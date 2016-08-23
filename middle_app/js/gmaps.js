console.log("JS Loaded");

var gMaps = gMaps || {};

gMaps.markers = [];
gMaps.placeMarkers =[];

gMaps.map = new google.maps.Map(document.getElementById("map"), { 
  center: { lat: 51.5080072, lng: -0.1019284 },
  zoom: 14,
  styles: [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
});

gMaps.placeDetails;

gMaps.getUserLocation = function(){

  navigator.geolocation.getCurrentPosition(function(position){

    var marker = new google.maps.Marker({
      position: {lat: position.coords.latitude, lng: position.coords.longitude },
      map: gMaps.map,
      animation: google.maps.Animation.DROP,
      icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    });

    gMaps.map.panTo(marker.getPosition());
    gMaps.map.setZoom(16);
    gMaps.markers.push(marker);

  });
}

//AutoComplete 

gMaps.input = document.getElementById('pac-input');

gMaps.autocompleteInput = function () {

  autocomplete = new google.maps.places.Autocomplete(gMaps.input);

  google.maps.event.addListener(autocomplete, 'place_changed', function(){
    var place = autocomplete.getPlace();
    var marker = new google.maps.Marker({
      map: gMaps.map,
      animation: google.maps.Animation.DROP,
      // icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    });

    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    if (place.geometry.viewport) {
              gMaps.map.fitBounds(place.geometry.viewport);
      } else {
        gMaps.map.setCenter(place.geometry.location);
        gMaps.map.setZoom(16); 
      }
      marker.setIcon("http://jovansfreelance.com/bikestats/images/bike_red.png",({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      }));
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      gMaps.markers.push(marker);

      var address = '';
        if (place.address_components) {
          address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
        }

       // infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
       // infowindow.open(map, marker);
  });
}

//Find the Center

gMaps.centralMarker = new google.maps.Marker({
  icon: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  animation: google.maps.Animation.DROP,
  map: gMaps.map
});


gMaps.centerMap = function(latLng) {
  this.map.panTo(latLng);
}

gMaps.getCenterOfMarkers = function() {

  if(this.markers.length === 0) {
    return centralMarker.setMap(null);
  }

  var bounds = new google.maps.LatLngBounds();

  this.markers.forEach(function(marker) {
    bounds.extend(marker.getPosition());
  });

  this.centerPoint = bounds.getCenter();

  this.centerMap(this.centerPoint);
  this.centralMarker.setMap(this.map);
  this.centralMarker.setPosition(this.centerPoint);
  this.map.fitBounds(bounds);
  this.centralMarker.addListener("click", function(e){
    gMaps.map.setZoom(18);
  });

}

gMaps.initEventHandlers = function() {
  document.getElementById('findCenterButton').addEventListener("click", function(){
    gMaps.getCenterOfMarkers();
  });

  document.getElementById("drinks").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = ["bar"];
    gMaps.placeQuery = "";
    gMaps.getPlaces();
  });

  document.getElementById("restaurants").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = ["restaurant"];
    gMaps.placeQuery = "";
    gMaps.getPlaces();
  });

  document.getElementById("cafe").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = ["cafe"];
    gMaps.placeQuery = "";
    gMaps.getPlaces();
  });

  document.getElementById("nightClub").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = ["night_club"];
    gMaps.placeQuery = "";
    gMaps.getPlaces();
  });

  document.getElementById("casino").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = ["casino"];
    gMaps.placeQuery = "";
    gMaps.getPlaces();
  });

  document.getElementById("ghost").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = ["funeral_home", "cemetery"];
    gMaps.placeQuery = "";
    gMaps.getPlaces();
  });

  document.getElementById("stiClinic").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = [];
    gMaps.placeQuery = "sti clinic";
    gMaps.getPlaces();
  });

  document.getElementById("strip").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = [];
    gMaps.placeQuery = "strip club";
    gMaps.getPlaces();
  });

  document.getElementById("shopping").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = ["electronics_store","department_store", "jewelry_store", "book_store", "clothing_store", "shopping_mall", "shoe_store"];
    gMaps.placeQuery = "";
    gMaps.getPlaces();
  });

}


gMaps.service = new google.maps.places.PlacesService(gMaps.map);

gMaps.placeType = [];
gMaps.placeQuery = "";

gMaps.getPlaces = function() {

  var request = {
    location: gMaps.centerPoint,
    radius: 250,
    types: gMaps.placeType,
    query: gMaps.placeQuery
  }

  this.service.textSearch(request, this.createPlaceMarkers);
}

gMaps.createPlaceMarkers = function (results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    results.forEach(gMaps.createMarker);
  }
}

gMaps.createMarker = function(place){


  var image = {
     url: place.icon,
     size: new google.maps.Size(71, 71),
     origin: new google.maps.Point(0, 0),
     anchor: new google.maps.Point(17, 34),
     scaledSize: new google.maps.Size(25, 25)
   };

  var placeMarker = new google.maps.Marker({
    map: gMaps.map,
    icon: image,
    title: place.name,
    position: place.geometry.location,
    animation: google.maps.Animation.DROP,
  });
  
  gMaps.placeMarkers.push(placeMarker);

  google.maps.event.addListener(placeMarker, "click", function(){

    infowindow = new google.maps.InfoWindow();
    
    var photo = "";

    if(!!place.photos) {
      photo = "<img src='" + place.photos[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 }) +"'>";
    }

  placeDetails = gMaps.service.getDetails({placeId: place.place_id}, function(place, status){
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(place);
        infowindow.setContent(place.name + "<br>" + place.adr_address + "<br>" + place.formatted_phone_number+ "<br>" + photo);

        console.log("this is the place detail", place);
      }
    });

   infowindow.open(gMaps.map, this);

  });
}

gMaps.removePlaceMarkers = function() {
  for (var i = 0; i < gMaps.placeMarkers.length; i++ ) {
    gMaps.placeMarkers[i].setMap(null);
  }
  gMaps.placeMarkers.length = 0;
}




gMaps.init = function(){
  console.log("gmaps init");
  this.getUserLocation();
  this.autocompleteInput();
  this.initEventHandlers();
}


gMaps.init();

$(function() {
  $(".form-group.repeater button").on('click', function() {
    console.log("clicked");
    var $form = $(this).parents('form');
    var $repeater = $(this).parents('.repeater');
    

    if($(this).hasClass('add')) {
      var $newGroup = $repeater.clone(true);
      $newGroup.appendTo($form);
    }

    if($(this).hasClass('remove')) {
      $repeater.remove();
    }
  });
});









