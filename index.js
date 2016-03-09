//function initMap() {
//  var map = new google.maps.Map(document.getElementById('map'), {
//    center: {lat: -34.397, lng: 150.644},
//    zoom: 15,
//  });
    
    function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: -33.9, lng: 151.2}
  });

  setMarkers(map);
} 
    
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
      if(window.location.hash) {
        var token = window.location.hash;
        console.log(token);
        token = token.substring(1,token.length);
        console.log(token);
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: 'https://api.instagram.com/v1/locations/search?lat='+pos.lat+'&lng='+pos.lng+'&'+token,
            success: function(data) {
                console.log(data);
                for (var i = 0; i < data.data.length; i++){
                    console.log(data.data[i]);
                    
                    function setMarkers(map) {
                          // Adds markers to the map.

                          // Marker sizes are expressed as a Size of X,Y where the origin of the image
                          // (0,0) is located in the top left of the image.

                          // Origins, anchor positions and coordinates of the marker increase in the X
                          // direction to the right and in the Y direction down.
                          var image = {
                            url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                            // This marker is 20 pixels wide by 32 pixels high.
                            size: new google.maps.Size(20, 32),
                            // The origin for this image is (0, 0).
                            origin: new google.maps.Point(0, 0),
                            // The anchor for this image is the base of the flagpole at (0, 32).
                            anchor: new google.maps.Point(0, 32)
                          };
                          // Shapes define the clickable region of the icon. The type defines an HTML
                          // <area> element 'poly' which traces out a polygon as a series of X,Y points.
                          // The final coordinate closes the poly by connecting to the first coordinate.
                          var shape = {
                            coords: [1, 1, 1, 20, 18, 20, 18, 1],
                            type: 'poly'
                          };
                            var marker = new google.maps.Marker({
                              position: {lat: data.data[i].latitude, lng: data.data[i].longitude},
                              map: map,
                              icon: image,
                              shape: shape,
                              title: data.data[i].name,
                              zIndex: i
                            });
                        }
                }
                    
                    // use data.data[i].latitude, data.data[i].longitude to get position to add each marker, you can also get the name values here incase you want to add a location to each marker so that the user will know what the location is for the marker
                    $.ajax({
                        type: "GET",
                        dataType: "jsonp",
                        cache: false,
                        url: 'https://api.instagram.com/v1/locations/'+ data.data[i].id +'/media/recent?access_token='+token,
                        success: function(data) {
                        // in here you want to add these photos to the marker (for loop)
                        console.log(data);
                        }
                    });
                }
            })            
      };
    })
  } else {
    window.location.href = "https://api.instagram.com/oauth/authorize/?client_id=2d63a3847c6740b3be538b860ab6d534&redirect_uri=http://sionsideup.github.io/instagramproj&response_type=token&scope=public_content";
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
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
//aClient = new HttpClient();
//aClient.get('https://api.instagram.com/v1/locations/search?lat='+pos.lat+'&lng='+pos.lng+'&access_token='+token), 
//    function(response) {
//    console.log(response);
//};
////http://stackoverflow.com/questions/247483/http-get-request-in-javascript
