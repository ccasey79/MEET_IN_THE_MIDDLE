console.log("JS Loaded");

var gMaps = gMaps || {};

gMaps.markers = {};
gMaps.placeMarkers =[];

gMaps.map = new google.maps.Map(document.getElementById("map"), { 
  center: { lat: 51.5080072, lng: -0.1019284 },
  zoom: 14,
  styles: [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
});

gMaps.placeDetails;

gMaps.createMarker = function(location, icon) {
  var marker = new google.maps.Marker({
    map: gMaps.map,
    animation: google.maps.Animation.DROP,
    icon: icon,
    position: location
  });

  return marker;  
}

gMaps.getUserLocation = function(){

  navigator.geolocation.getCurrentPosition(function(position){

    var location = {lat: position.coords.latitude, lng: position.coords.longitude };
    var marker = gMaps.createMarker(location, "../images/you-pin.png");

    gMaps.map.panTo(marker.getPosition());
    gMaps.map.setZoom(16);
    gMaps.markers[0] = marker;

  });
}

//AutoComplete
gMaps.createAutoCompleteWithMarker = function(selector, icon, idx) {
  $input = $(selector);
  var autocomplete = new google.maps.places.Autocomplete($input[0]);

  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();

    if(gMaps.markers[idx]) {
      var marker = gMaps.markers[idx];
      marker.setPosition(place.geometry.location);
    } else {
      var marker = gMaps.createMarker(place.geometry.location, icon);
      gMaps.markers[idx] = marker;
    }
    
    if (!place.geometry) {
      return window.alert("Autocomplete's returned place contains no geometry");
    }

    if (place.geometry.viewport) {
      gMaps.map.fitBounds(place.geometry.viewport);
    } else {
      gMaps.map.setCenter(place.geometry.location);
      gMaps.map.setZoom(16); 
    }
  });

  return autocomplete;
}

gMaps.addAutoCompleteToLocation = function() {
  gMaps.createAutoCompleteWithMarker('#pac-input', "../images/you-pin.png", 0);
}

gMaps.addAutoCompleteToRepeater = function (){
  var idx = $(".form-group.repeater:last-child").index();
  gMaps.createAutoCompleteWithMarker(".form-group.repeater:last-child .autocomplete", "../images/wally-pin.png", idx);
}


// gMaps.autocompleteInput = function () {

//   autocomplete = new google.maps.places.Autocomplete(gMaps.input);

//   google.maps.event.addListener(autocomplete, 'place_changed', function(){
//     var place = autocomplete.getPlace();
//     var marker = new google.maps.Marker({
//       map: gMaps.map,
//       animation: google.maps.Animation.DROP,
//       icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
//     });

//     if (!place.geometry) {
//       window.alert("Autocomplete's returned place contains no geometry");
//       return;
//     }

//     if (place.geometry.viewport) {
//       gMaps.map.fitBounds(place.geometry.viewport);
//     } else {
//       gMaps.map.setCenter(place.geometry.location);
//       gMaps.map.setZoom(16); 
//     }
//     marker.setIcon("http://jovansfreelance.com/bikestats/images/bike_red.png",({
//       url: place.icon,
//       size: new google.maps.Size(71, 71),
//       origin: new google.maps.Point(0, 0),
//       anchor: new google.maps.Point(17, 34),
//       scaledSize: new google.maps.Size(35, 35)
//     }));
//     marker.setPosition(place.geometry.location);
//     marker.setVisible(true);
//     gMaps.markers.push(marker);

//     var address = '';
//     if (place.address_components) {
//       address = [
//         (place.address_components[0] && place.address_components[0].short_name || ''),
//         (place.address_components[1] && place.address_components[1].short_name || ''),
//         (place.address_components[2] && place.address_components[2].short_name || '')
//       ].join(' ');
//     }

//        // infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
//        // infowindow.open(map, marker);
//   });
// }

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

  var markersArray = [];
  for(idx in this.markers) {
    markersArray.push(this.markers[idx]);
  };

  if(markersArray.length === 0) {
    return centralMarker.setMap(null);
  }

  var bounds = new google.maps.LatLngBounds();

  markersArray.forEach(function(marker) {
    bounds.extend(marker.getPosition());
  });

  this.centerPoint = bounds.getCenter();

  this.centerMap(this.centerPoint);
  this.centralMarker.setMap(this.map);
  this.centralMarker.setPosition(this.centerPoint);
  this.map.fitBounds(bounds);
  this.centralMarker.addListener("click", function(e){
    gMaps.map.panTo(gMaps.centralMarker.getPosition());
    gMaps.map.setZoom(18);
  });

}

gMaps.initEventHandlers = function() {
  $('#findCenterButton').on("click", function(){
    gMaps.getCenterOfMarkers();
  });


  document.getElementById("drink").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = ["bar"];
    gMaps.placeQuery = "";
    gMaps.getPlaces();
  });

  document.getElementById("food").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = ["restaurant"];
    gMaps.placeQuery = "";
    gMaps.getPlaces();
  });

  document.getElementById("coffee").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = ["cafe"];
    gMaps.placeQuery = "";
    gMaps.getPlaces();
  });

  document.getElementById("casino").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = [];
    gMaps.placeQuery = "casino";
    gMaps.getPlaces();
  });

  document.getElementById("ghost").addEventListener("click", function(){
    console.log("clicked")
    gMaps.removePlaceMarkers();
    gMaps.placeType = [];
    gMaps.placeQuery = "funeral";
    gMaps.getPlaces();
  });

  document.getElementById("casino").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = ["casino"];
    gMaps.placeQuery = "";
    gMaps.getPlaces();
  });

  document.getElementById("strippers").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = [];
    gMaps.placeQuery = "strip club";
    gMaps.getPlaces();
  });

  document.getElementById("condom").addEventListener("click", function(){
    gMaps.removePlaceMarkers();
    gMaps.placeType = [];
    gMaps.placeQuery = "sti clinic";
    gMaps.getPlaces();
  });

  document.getElementById("shop").addEventListener("click", function(){
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
    results.forEach(gMaps.createPlaceMarker);
  }
}

gMaps.createPlaceMarker = function(place){


  var image = {
     url: place.icon,
     size: new google.maps.Size(71, 71),
     origin: new google.maps.Point(0, 0),
     anchor: new google.maps.Point(17, 34),
     scaledSize: new google.maps.Size(25, 25)
   };

  var placeMarker = gMaps.createMarker(place.geometry.location, image);
  
  gMaps.placeMarkers.push(placeMarker);

  google.maps.event.addListener(placeMarker, "click", function(){

    infowindow = new google.maps.InfoWindow();
    
    var photo = "";

    if(!!place.photos) {
      photo = "<img src='" + place.photos[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 }) +"'>";
    }

    placeDetails = gMaps.service.getDetails({placeId: place.place_id}, function(place, status){
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        stars = gMaps.starRating(place.rating);

        infowindow.setContent(place.name + "<br>" + place.adr_address + "<br>" + place.formatted_phone_number+ "<br>" + photo + "<br>" + stars + "<br>" + "<button class='directions'>Directions</button>");

        console.log("this is the place detail", place);
      }
    });

    infowindow.open(gMaps.map, this);

  });
}

gMaps.starRating = function(rating) {
     var fullStar = "<i class='fa fa-star'></i>";
     var halfStar = "<i class='fa fa-star-half-o'></i>";
     var emptyStar = "<i class='fa fa-star-o'></i>";

     var output = [];

     var numberOfFullStars = Math.floor(rating);

     for (i = 0; i < numberOfFullStars; i++) {
         output.push(fullStar);
     }

     if (rating % 1 != 0) {
         output.push(halfStar);
     }

     var numberofEmptyStars = (5 - output.length);

     for (i = 0; i < numberofEmptyStars; i++) {
         output.push(emptyStar);
     }

     var stars = output.join(" ");
     return stars;
}

gMaps.removePlaceMarkers = function() {
  for (var i = 0; i < gMaps.placeMarkers.length; i++ ) {
    gMaps.placeMarkers[i].setMap(null);
  }
  gMaps.placeMarkers.length = 0;
}

gMaps.initializeRepeater = function() {
  $(".form-group.repeater button").on('click', function() {
    var $form = $(this).parents('form');
    var $repeater = $(this).parents('.repeater');
    

    if($(this).hasClass('add')) {
      var $newGroup = $repeater.clone(true);
      $newGroup.find('input').val('');
      $newGroup.appendTo('.people');
      gMaps.addAutoCompleteToRepeater();
    }

    if($(this).hasClass('remove')) {
      $repeater.remove();
    }
  });
}

gMaps.init = function(){
  console.log("gmaps init");
  this.getUserLocation();
  this.initializeRepeater();
  this.addAutoCompleteToRepeater();
  this.addAutoCompleteToLocation();
  
  // this.autocompleteInput();
  this.initEventHandlers();
}


gMaps.init();









