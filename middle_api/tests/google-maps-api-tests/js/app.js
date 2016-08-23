var map;

// where the info pops up on locations
var infowindow;

var request;
var service;
var markers = [];

    // load the new map in 
    // initialize creates the google map
    // center object to center the map
    // Google's HD (37.422, -122.084-58)

    function initialize() {
      var center = new google.maps.LatLng(51.5287352,-0.3817814,10);

      map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 12,
      });


    // modify the initilaize function by using variable request
    // so that Google can exactly find what your looking for

    request = {
      location: center,
      radius: 8047,
      types: ['bar']
    };

    // this opens the info window on the map

    infowindow = new google.maps.InfoWindow();

    // create a service from the Google api - this does the search eg: cafe
    // use it's nearbySearch function with the request from above

    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);

    // this function looks out for right-clicks
    // then creates another request to search eg cafe info at that location

    google.maps.event.addListener(map, 'rightclick', function(event) {
      map.setCenter(event.latLng)
      clearResults(markers)

      var request = {
        location: event.latLng,
        radius: 8047,
        types: ['bar']
      };
      service.nearbySearch(request, callback);
    })

}
    // callback function called from service function
    // makes sure there's good results - no errors
    // adds the output data to the results array - the calls the createMarker function

    function callback(results, status) {
      if(status == google.maps.places.PlacesServiceStatus.OK){
        for (var i = 0; i < results.length; i++) {
          markers.push(createMarker(results[i]));
        }
      }
    }

    // this function creates & places the markers on the map based on results array above.

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });


    // listens for the click to provide the marker info & not all popped up at once

    google.maps.event.addListener(marker, 'click', function() {
        
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
      return marker;
    }

    // function to clear the markers array everytime the user right-clicks

    function clearResults(markers) {
      for (var m in markers) {
        markers[m].setMap(null)
      }
      markers = []
    }

    // Places autocomplete

    //define input from input box
    var input =  document.getElementById('pac-input');

    var autocomplete = new google.maps.places.Autocomplete(input);

    //event listener
    google.maps.event.addListener(autocomplete, 'place_changed', function(){
      var place = autocomplete.getPlace();
    });

    // listens for an action (load) - then calls the initialize function as above
    google.maps.event.addDomListener(window, 'load', initialize);

   

















