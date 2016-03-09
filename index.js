var places = [];
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 20,
        center: {lat: -33.9, lng: 151.2}
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
            if(window.location.hash) {
                var token = window.location.hash;
    //            console.log(token);
                token = token.substring(1,token.length);
    //            console.log(token);
                var places = $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    cache: false,
                    url: 'https://api.instagram.com/v1/locations/search?lat='+pos.lat+'&lng='+pos.lng+'&'+token,
                    success: function(data) {
                        return data
                    }
                });
                console.log(places);
//                var pics = $.ajax({
//                                type: "GET",
//                                dataType: "jsonp",
//                                cache: false,
//                                url: 'https://api.instagram.com/v1/locations/'+ data.data[i].id +'/media/recent?access_token='+token,
//                                success: function(data) {
//                                    return data;
//                                };
//                            });
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

    }
