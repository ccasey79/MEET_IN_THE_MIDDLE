

function initialize() {
  var map = new google.maps.Map(
    document.getElementById("map"), {
      center: new google.maps.LatLng(51.50735, -0.12776),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map
  });

  var request = {
      origin: "Liverpool Street Station, London:",
      destination: "Shepherds Bush, London",
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        
        // duration of journey
        duration = Math.round(response.routes[0].legs[0].duration.value / 60);
        console.log(duration);
        document.getElementById("duration").innerHTML = "duration.text=" + response.routes[0].legs[0].duration.text + "<br>duration plus 15 minutes=" + (duration / 60).toFixed(0) + " mins";
      } else {
        window.alert('Please enter a starting location');
      }
    });
  }

  google.maps.event.addDomListener(window, "load", initialize);










