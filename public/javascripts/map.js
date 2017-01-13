// This could be wrapped in an IFFIE, but then it would need to be assigned explicitly to the 
// global scope on the window so that it can be exposed for the googleAPI to call it.	
	
	function initMap() {
	        var map = new google.maps.Map(document.getElementById('map'), {
	          zoom: mapZoom,
	          center: clientMapCenter,
	          styles: [
				  {
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#f5f5f5"
				      }
				    ]
				  },
				  {
				    "elementType": "labels.icon",
				    "stylers": [
				      {
				        "visibility": "off"
				      }
				    ]
				  },
				  {
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#616161"
				      }
				    ]
				  },
				  {
				    "elementType": "labels.text.stroke",
				    "stylers": [
				      {
				        "color": "#f5f5f5"
				      }
				    ]
				  },
				  {
				    "featureType": "administrative.land_parcel",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#bdbdbd"
				      }
				    ]
				  },
				  {
				    "featureType": "poi",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#eeeeee"
				      }
				    ]
				  },
				  {
				    "featureType": "poi",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#757575"
				      }
				    ]
				  },
				  {
				    "featureType": "poi.park",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#e5e5e5"
				      }
				    ]
				  },
				  {
				    "featureType": "poi.park",
				    "elementType": "geometry.fill",
				    "stylers": [
				      {
				        "color": "#b9f1c1"
				      }
				    ]
				  },
				  {
				    "featureType": "poi.park",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#688c6d"
				      }
				    ]
				  },
				  {
				    "featureType": "road",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#ffffff"
				      }
				    ]
				  },
				  {
				    "featureType": "road.arterial",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#757575"
				      }
				    ]
				  },
				  {
				    "featureType": "road.highway",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#dadada"
				      }
				    ]
				  },
				  {
				    "featureType": "road.highway",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#616161"
				      }
				    ]
				  },
				  {
				    "featureType": "road.local",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#9e9e9e"
				      }
				    ]
				  },
				  {
				    "featureType": "transit.line",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#e5e5e5"
				      }
				    ]
				  },
				  {
				    "featureType": "transit.station",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#eeeeee"
				      }
				    ]
				  },
				  {
				    "featureType": "water",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#c9c9c9"
				      }
				    ]
				  },
				  {
				    "featureType": "water",
				    "elementType": "geometry.fill",
				    "stylers": [
				      {
				        "color": "#70d2f0"
				      }
				    ]
				  },
				  {
				    "featureType": "water",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#9e9e9e"
				      }
				    ]
				  }
				]
	        });

	        var myLocation = new google.maps.Marker({
			    position: map.getCenter(),
			    icon: {
			      path: google.maps.SymbolPath.CIRCLE,
			      scale: 5,
			      strokeColor: '#00a2d0'
			    },
			    draggable: true,
			    map: map,
			    title: 'You are here!',
			 });



	        // var infoWindow = new google.maps.InfoWindow({map: map});

	        // // Try HTML5 geolocation.
	        // if (navigator.geolocation) {
	        //   navigator.geolocation.getCurrentPosition(function(position) {
	        //     var pos = {
	        //       lat: position.coords.latitude,
	        //       lng: position.coords.longitude
	        //     };

	        //     infoWindow.setPosition(pos);
	        //     infoWindow.setContent('You');
	        //     map.setCenter(pos);
	        //   }, function() {
	        //     handleLocationError(true, infoWindow, map.getCenter());
	        //   });
	        // } else {
	        //   // Browser doesn't support Geolocation
	        //   handleLocationError(false, infoWindow, map.getCenter());
	        // }

        	var marker;

        	var infoWindow = new google.maps.InfoWindow({
		       	content: ''
		    });

	        
	        clientResults.forEach(function(recyclingHotSpot){
	        	marker = new google.maps.Marker({
		          position: {
		          	lat: parseFloat(recyclingHotSpot.latitude), 
		          	lng: parseFloat(recyclingHotSpot.longitude)
		          },
		          map: map,
		          title: recyclingHotSpot.name,
		          icon: 'http://127.0.0.1:8081/images/marker.png',
		          clickable: true,
		
		        });

		        marker.addListener('click', function(){
		        	infoWindow.close();
		        	infoWindow.setContent(recyclingHotSpot.address);
		        	infoWindow.open(map, this);
		        	
		        });	
	        });
	    }

	   


	    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	        infoWindow.setPosition(pos);
	        infoWindow.setContent(browserHasGeolocation ?
	                              'Error: The Geolocation service failed.' :
	                              'Error: Your browser doesn\'t support geolocation.');
      	}