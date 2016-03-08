function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}


if(window.location.hash) {
  var token = window.location.hash;
} else {
    window.location.href = "https://api.instagram.com/oauth/authorize/?client_id=2d63a3847c6740b3be538b860ab6d534&redirect_uri=http://sionsideup.github.io/instagramproj&response_type=token
";
}


//var HttpClient = function() {
//    this.get = function(aUrl, aCallback) {
//        var anHttpRequest = new XMLHttpRequest();
//        anHttpRequest.onreadystatechange = function() { 
//            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
//                aCallback(anHttpRequest.responseText);
//        }
//
//        anHttpRequest.open( "GET", aUrl, true );            
//        anHttpRequest.send( null );
//    }
//}
//
//var lat = pos(1)
//var lon= pos(2)
//
//aClient = new HttpClient();
//aClient.get('https://api.instagram.com/v1/locations/search?'+ lat + '&lng=' + lon + '&access_token= 1572517173.2d63a38.2f4572cf13394dd2aa461c1cde48d5fb
//', function(response) {
//    // do something with response
//});
////http://stackoverflow.com/questions/247483/http-get-request-in-javascript
