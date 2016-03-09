var places = [];
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: -33.9, lng: 151.2}
    });
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
//            console.log(token);
            token = token.substring(1,token.length);
//            console.log(token);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                cache: false,
                url: 'https://api.instagram.com/v1/locations/search?lat='+pos.lat+'&lng='+pos.lng+'&'+token,
                success: function(data) {
//                    console.log(data);
                    for (var i = 0; i < data.data.length; i++){
//                        console.log(data.data[i]);
                        function setMarkers(map) {
                            var image = {
                                url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                                size: new google.maps.Size(20, 32),
                                origin: new google.maps.Point(0, 0),
                                anchor: new google.maps.Point(0, 32)
                            };
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
            });            
      } else {
          window.location.href = "https://api.instagram.com/oauth/authorize/?client_id=2d63a3847c6740b3be538b860ab6d534&redirect_uri=http://sionsideup.github.io/instagramproj&response_type=token&scope=public_content";
      }
    });
}else {
    handleLocationError(false, infoWindow, map.getCenter());
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?'Error: The Geolocation service failed.' :'Error: Your browser doesn\'t support geolocation.');
}
//setMarkers(map);
