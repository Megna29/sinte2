$(document).ready(function(){

    $("#SearchCenter").on("click",function(){

        if(navigator.geolocation==undefined)
        {
            alert("Geolocation undefined");
        }

        else
        {
            alert("Geolocation Available");
            navigator.geolocation.getCurrentPosition(userLocated,locationError);

            function userLocated(position)
            {
                var latitude= position.coords.latitude;
                var longitude= position.coords.longitude;
                //alert("Latitude is:"+latitude+",Longitude is:"+longitude);

                var mymap = L.map('map').setView([latitude, longitude], 12);
                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
                {
                    maxZoom: 19,
                    attribution: 'Map data &copy;'+
                    '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>'+
                    'contributors,<a href="https://creativecommons.org/licenses'+
                    '/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://'+
                    'www.mapbox.com/">Mapbox</a>',
                    id: 'mapbox.streets',
                    accessToken:'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYyc'+
                    'XBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
                }).addTo(mymap);

                var myLocationIcon = new L.Icon({
                         iconUrl: 'mapimg/icons8-street-view-filled-50.png',
                         shadowUrl: 'mapimg/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                      });


                var marker = L.marker([latitude, longitude], {icon: myLocationIcon}).addTo(mymap);
                marker.bindPopup("you are here").openPopup();


                var circle = L.circle([latitude, longitude], {
                   color:'rgb(66, 238, 72)',
                   // fillColor: '#',
                  fillOpacity: 0.2,
                  radius: 10000
              }).addTo(mymap);


                var xhttp = new XMLHttpRequest();
                var url = "json/hospital.json";
                xhttp.open("GET", url, false);
                xhttp.send();


                var obj = JSON.parse(xhttp.responseText);

                for (i in obj.hospitals)
                {

                    var hlat = obj.hospitals[i].latitude;
                    var hlon = obj.hospitals[i].longitude;


                    var distance = getDistanceFromLatLonInKm(latitude, longitude, hlat, hlon);

                    if(distance <= 10)
                    {
                      var rehabIcon = new L.Icon({
                              iconUrl: 'mapimg/icons8-clinic-48.png',
                              shadowUrl: 'mapimg/marker-shadow.png',
                              iconSize: [25, 41],
                              iconAnchor: [12, 41],
                              popupAnchor: [1, -34],
                              shadowSize: [41, 41]
                            });

                            var clinic = new L.marker([hlat, hlon], {icon: rehabIcon}).addTo(mymap);

                    }


            }

                function getDistanceFromLatLonInKm(latitude1,longitude1,latitude2,longitude2)
                {
                    var R = 6371; // Radius of EARTH in KM
                    var diffLat = deg2rad(latitude2-latitude1);
                    var diffLon = deg2rad(longitude2-longitude1);
                    var a =
                      Math.sin(diffLat/2) * Math.sin(diffLat/2) +
                      Math.cos(deg2rad(latitude1)) * Math.cos(deg2rad(latitude2)) *
                      Math.sin(diffLon/2) * Math.sin(diffLon/2)
                      ;
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                    var d = R * c; // Distance in km
                    return d;
                }

                function deg2rad(deg)
                {
                    return deg * (Math.PI/180)
                }

        }
            function locationError(error)
            {
                switch(error.code)
                {
                    case error.PERMISSION_DENIED:
                    alert("Permission Denied-"+error.message);
                    break;

                    case error.POSITION_UNAVAILABLE:
                    alert("Position Not Available"+error.message);
                    break;

                    case error.TIMEOUT:
                    alert("Requested "+error.message);
                    break;
                }
            }
        }


    });

}) ;
