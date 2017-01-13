var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var filterHelper = require('./filterHelper');
var formatHelper = require('./formatHelper');
var locationHelper = require('./locationHelper');
var request = require('request');


app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res){
	res.render('pages/index');
});


// app.get('/search', function(req, res){
// 	response = {
// 		borough: req.query.boroughs,
// 		park: req.query.park
// 	};

// 	console.log(response);
// 	res.end(JSON.stringify(response));
// });


app.post('/search', function (req, res){
	var postData = {
		boroughs: req.body["boroughs[]"],
		address: req.body.address,
		miles: req.body.miles,
		userLat: req.body.currentLat,
		userLng: req.body.currentLng
	};

	if (postData.address.length > 0) {

		request('https://maps.googleapis.com/maps/api/geocode/json?address=' + postData.address + '&key=AIzaSyDiz_ZMxRVCo91f39c8tP4pBRZ34kcMqAE', function (error, response, body) {
	  		if (!error && response.statusCode == 200) {

	  			var response = JSON.parse(body);
	  			var responseZip = response.results[0].address_components[0].long_name;
	  		
	  		//if google finds a geolocation for the zip code	
	    		if (response.results.length > 0) {

	    			var userLat = response.results[0].geometry.location.lat;
	    			var userLng = response.results[0].geometry.location.lng;

	    			fs.readFile ( __dirname + '/' + 'recycling-data.json', 'utf8', function(err, data){

	    		
	    				var searchResults = locationHelper.getNearbyResults(userLat, userLng, data, postData);


	    				//res.redirect to show the results page and not send the response back to the AJAX bit
	    				res.render('pages/results', {
	    					requestedZipCode: responseZip,	
							boroughSearched: "",
							results: searchResults,
							miles: postData.miles,
							mapCenter: {lat: userLat, lng: userLng},
							mapZoom: 14

						});	

	    			});
	    		} 
 			}
		});

	} else if (postData.boroughs != undefined) {
		fs.readFile( __dirname +'/' + 'recycling-data.json', 'utf8', function(err, data){
			var recyclingInfo = JSON.parse(data);	
			var recyclingSpotsFormatted = formatHelper.formatData(recyclingInfo);
			var searchResults = filterHelper.filterByBorough(postData, recyclingSpotsFormatted);

			var mapCenter = {};

			if (typeof postData.boroughs != "string") {
				mapCenter = {lat: 40.675464, lng: -73.960843};
			} else if (postData.boroughs == "Manhattan") {
				mapCenter = {lat: 40.773862, lng: -73.973010}; 
			} else if (postData.boroughs == "Brooklyn") {
				mapCenter = {lat: 40.656360, lng: -73.946724}; 
			} else if (postData.boroughs == "Staten Island") {
				mapCenter = {lat: 40.580168, lng: -74.143052};
			} else if (postData.boroughs == "Queens") {
				mapCenter = {lat: 40.727216, lng: -73.796388};
			}	else if (postData.boroughs == "Bronx") {
				mapCenter = {lat: 40.845602, lng: -73.864977};
			}

			res.render('pages/results', { 
				//post data.borough is not secure, make it safer later ;D 
				boroughSearched: postData.boroughs,
				requestedZipCode: "",
				results: searchResults,
				miles: "",
				mapCenter: mapCenter,
				mapZoom: 11
			});
		});
	
	} else {

		var userLat = parseFloat(postData.userLat);
		var userLng = parseFloat(postData.userLng);

		fs.readFile ( __dirname + '/' + 'recycling-data.json', 'utf8', function(err, data){

			var searchResults = locationHelper.getNearbyResults(userLat, userLng, data, postData);

			//res.redirect to show the results page and not send the response back to the AJAX bit
			res.render('pages/results', {
				requestedZipCode: "",	
				boroughSearched: "",
				results: searchResults,
				miles: postData.miles,
				mapCenter: {lat: userLat, lng: userLng},
				mapZoom: 14

			});	

		});
	} 
	
});



app.post('/', function(req, res){
	console.log("POST request");
	res.send("Hello POST!");
});


app.delete('/del_user', function(req, res){
	res.send('Hello DELETE!');
	console.log('DELETE REQUEST');

});


app.get('/list_user', function(req, res){
	res.send('LIST_USER GET');

});


//This response with a GET request for abcd, ab332cd, ab123cd etc.
app.get('/ab*cd', function(req, res){
	res.send('ABCD');

});


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})