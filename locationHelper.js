var formatHelper = require('./formatHelper');

module.exports = {
	getDistance: function (userLat, userLng, recyclingSpot) {
	  var R = 6371e3; // metres
	  var lat1 = userLat;
	  var lon1 = userLng;
	  var lat2 = parseFloat(recyclingSpot.latitude);
	  var lon2 = parseFloat(recyclingSpot.longitude);

	  var q1 = lat1.toRadians();
	  var q2 = lat2.toRadians();
	  var tq = (lat2-lat1).toRadians();
	  var th = (lon2-lon1).toRadians();

	  var a = Math.sin(tq/2) * Math.sin(tq/2) +
	          Math.cos(q1) * Math.cos(q2) *
	          Math.sin(th/2) * Math.sin(th/2);
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	  
	  var distanceInMeters = R * c;

	  var distanceInMiles = distanceInMeters * .000621371;

	  return distanceInMiles;
	},

	getNearbyResults: function (userLat, userLng, data, postData) {
		var recyclingInfo = JSON.parse(data);
		var recyclingSpotsFormatted = formatHelper.formatData(recyclingInfo);
		var searchResults = [];
		// because 
		var _this = this;
		
		recyclingSpotsFormatted.forEach(function(recyclingSpot){

			//to use get distance use THIS because its within the object that contains getNearbyResults, but you need to
			//preserve the original context of this because we are now within the recyclingSpotsFormatted function
			//to preserve the outer context this, create a variable _this and assign it to this (see above)
			var distanceFromUser = _this.getDistance(userLat, userLng, recyclingSpot);

			if (distanceFromUser < parseFloat(postData.miles)) {
				searchResults.push(recyclingSpot);
			}

		});

		return searchResults;
	}
};



if (typeof(Number.prototype.toRadians) === "undefined") {
  Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  }
}
