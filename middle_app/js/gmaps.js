console.log("JS Loaded");

var gMaps = gMaps || {};

gMaps.markers = {};
gMaps.placeMarkers =[];
gMaps.userLocation;
gMaps.placeLocation;
gMaps.travelMode = google.maps.TravelMode.TRANSIT;

$("#transport-icons").hide();
$("#collapsed-activities").hide();


gMaps.map = new google.maps.Map(document.getElementById("map"), { 
  center: { lat: 51.5080072, lng: -0.1019284 },
  zoom: 14,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  scrollwheel: false,
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

gMaps.userLocation; 

gMaps.getUserLocation = function(){

  navigator.geolocation.getCurrentPosition(function(position){

    var location = {lat: position.coords.latitude, lng: position.coords.longitude };

    gMaps.userLocation = location;

    var marker = gMaps.createMarker(location, "../images/you-pin.svg");


    gMaps.map.panTo(marker.getPosition());
    gMaps.map.setZoom(16);
    gMaps.markers[0] = marker;
    gMaps.userLocation = location;

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
  gMaps.createAutoCompleteWithMarker(".form-group.repeater:last-child .autocomplete", "../images/wally-pin.svg", idx);
}

//Find the Center

gMaps.centralMarker = new google.maps.Marker({
  icon: "../images/middle-pin.svg",
  animation: google.maps.Animation.DROP,
  map: gMaps.map,
  draggable: true
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
    $('#collapsed-activities').fadeIn(600);
  });

  $(".activity").click(function(){
     gMaps.removePlaceMarkers(); 
     gMaps.map.setZoom(16);
     gMaps.map.setCenter(gMaps.centralMarker.getPosition()); 
  });

  $("#drink").click(function(){
    gMaps.placeType = ["bar"];
    gMaps.placeQuery = "";
    gMaps.getPlaces();
  });

  $("#food").click(function(){
    gMaps.placeType = ["restaurant"];
    gMaps.placeQuery = "";
    gMaps.getPlaces();
  });

  $("#coffee").click(function(){
    gMaps.placeType = ["cafe"];
    gMaps.placeQuery = "";
    gMaps.getPlaces();
  });

  $("#casino").click(function(){
    gMaps.placeType = [];
    gMaps.placeQuery = "casino";
    gMaps.getPlaces();
  });

  $("#toilets").click(function(){
    gMaps.placeType = [];
    gMaps.placeQuery = "public toilets";
    gMaps.getPlaces();
  });

  $("#condom").click(function(){
    gMaps.placeType = [];
    gMaps.placeQuery = "sti clinic";
    gMaps.getPlaces();
  });

  $("#strippers").click(function(){
    gMaps.placeType = [];
    gMaps.placeQuery = "strip club";
    gMaps.getPlaces();
  });

  $("#condom").click(function(){
    gMaps.placeType = [];
    gMaps.placeQuery = "sti clinic";
    gMaps.getPlaces();
  });

  $("#shop").click(function(){
    gMaps.placeType = ["electronics_store","department_store", "jewelry_store", "book_store", "clothing_store", "shopping_mall", "shoe_store"];
    gMaps.placeQuery = "";
    gMaps.getPlaces();
  });

  $("#underground").click(function(){
    gMaps.travelMode = google.maps.TravelMode.TRANSIT;
    gMaps.findRoute(gMaps.placeLocation);
    $(".transport-select").removeClass("active");
    $("#underground").addClass("active");
  });

  $("#walk").click(function(){
    gMaps.travelMode = google.maps.TravelMode.WALKING;
    gMaps.findRoute(gMaps.placeLocation);
    $(".transport-select").removeClass("active");
    $("#walk").addClass("active");
  });

  $("#bike").click(function(){
    gMaps.travelMode = google.maps.TravelMode.BICYCLING;
    gMaps.findRoute(gMaps.placeLocation);
    $(".transport-select").removeClass("active");
    $("#bike").addClass("active");
  });

  $("#car").click(function(){
    gMaps.travelMode = google.maps.TravelMode.DRIVING;
    gMaps.findRoute(gMaps.placeLocation);
    $(".transport-select").removeClass("active");
    $("#car").addClass("active");
  });

}


gMaps.service = new google.maps.places.PlacesService(gMaps.map);

gMaps.placeType = [];
gMaps.placeQuery = "";

gMaps.getPlaces = function() {

  var centerMarkerLocation = gMaps.centralMarker.getPosition();

  var request = {
    location: centerMarkerLocation,
    radius: 250,
    types: gMaps.placeType,
    keyword: gMaps.placeQuery
  }

  this.service.radarSearch(request, this.createPlaceMarkers);
}

gMaps.createPlaceMarkers = function (results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    results.forEach(gMaps.createPlaceMarker);
  }

  if(results.length === 0){
    $('#noPlacesModal').modal('show');
  }
}

gMaps.createPlaceMarker = function(place){

  var image = {
     url: "../images/place-pin.svg",
     // size: new google.maps.Size(71, 71),
     origin: new google.maps.Point(0, 0),
     anchor: new google.maps.Point(17, 34),
     // scaledSize: new google.maps.Size(25, 25)
   };

  var placeMarker = gMaps.createMarker(place.geometry.location, image);
  
  gMaps.placeMarkers.push(placeMarker);

  google.maps.event.addListener(placeMarker, "click", function(){

    placeDetails = gMaps.service.getDetails({placeId: place.place_id}, function(place, status){

      if (status === google.maps.places.PlacesServiceStatus.OK) {

        var photo = "";

        if(!!place.photos) {
          photo = "<img class='placePhoto' src='" + place.photos[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 }) +"'>";
        }

        stars = gMaps.starRating(place.rating);

        $('#placesModal').find('.modal-title').html(place.name);
        $('#placesModal').find('.modal-body').html(
            photo +
            '<p>' + place.adr_address + '</p>'+
            '<p><a href="tel:'+place.formatted_phone_number+'">'+
            place.formatted_phone_number +
            '</a></p>' +
            stars
          );

        $('#placesModal').modal('show');

        $('#place-directions').click(function(){
          gMaps.findRoute(place.geometry.location);
          $('#placesModal').modal('hide');
          $('#transport-icons').fadeIn(600);
        });      
      }
    });

  });
}

// Star Rating
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

// Directions route


gMaps.directionsService;
gMaps.directionsDisplay;

gMaps.findRoute = function(place) {

gMaps.placeLocation = place;

  if (gMaps.directionsDisplay != null) {  
        gMaps.directionsDisplay.setMap(null);
        gMaps.directionsDisplay = null;
      }

  gMaps.directionsService = new google.maps.DirectionsService();
  gMaps.directionsDisplay = new google.maps.DirectionsRenderer({
    map: gMaps.map,
    suppressMarkers: true
  });

  gMaps.createMarker(place, "../images/place-pin.svg");

  var request = {
      origin: gMaps.userLocation,
      destination: place,
      travelMode: gMaps.travelMode
    };

  gMaps.directionsService.route(request, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {

      $(".routeStep").remove();
      $(".duration").remove();
      $(".totalDuration").remove();

      gMaps.directionsDisplay.setDirections(response);
      var route = response.routes[0].legs[0].steps;  
      var totalDistance = response.routes[0].legs[0].distance.text
      var totalDuration = response.routes[0].legs[0].duration.text

      console.log(totalDistance+" "+totalDuration);

      for (i = 0; i < route.length; i++) { 

          $("#routeSteps").append("<div class='routeStep'>"+route[i].instructions+"</div>" + 
            "<div class='duration'>" + route[i].distance.text + ", " + route[i].duration.text  + "<hr></div>").slideDown(800);
      }

      $("#routeSteps").append("<div class='totalDuration'>Journey Total: "+ 
        totalDistance + ", "+
        totalDuration + "<hr></div>").slideDown(800);

    }  
  });
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
  this.getUserLocation();
  this.initializeRepeater();
  this.addAutoCompleteToRepeater();
  this.addAutoCompleteToLocation();  
  this.initEventHandlers();
}


gMaps.init();









