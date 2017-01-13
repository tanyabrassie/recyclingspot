module.exports = {
	filterByBorough: function (response, recyclingSpotsFormatted) {
		var searchResults = [];

		recyclingSpotsFormatted.forEach(function(spot, i){
		

			if (response.boroughs.indexOf(spot.borough) > -1) {

				var leanSpot = {
					location: spot.borough,
					name: spot.park_site_name,
					address: spot.address,
					latitude: spot.latitude,
					longitude: spot.longitude
				}

				searchResults.push(leanSpot);
			}

		});

		// var searchResults = recyclingSpotsFormatted
		// 	.filter(function (spot) {
		// 		return response.borough == spot.borough;
		// 	})
		// 	.map(function(spot) {
				
		// 		return {
		// 			location: spot.borough,
		// 			name: spot.park_site_name,
		// 			address: spot.address
		// 		};

		// 	});

		return searchResults;
	}
};