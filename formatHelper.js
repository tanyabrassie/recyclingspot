module.exports = {
	formatData: function (recyclingInfo) {
		var recyclingSpots = recyclingInfo.data;
		var metadataColumns = recyclingInfo.meta.view.columns;
		var recyclingSpotsFormatted = [];

		recyclingSpots.forEach(function(individualSpot, i){
			var recyclingSpot = {};

			individualSpot.forEach(function(spotInfo, i){
				var currentColumnName = metadataColumns[i].fieldName;

				if (currentColumnName.charAt(0) == ':') {
					currentColumnName = currentColumnName.slice(1);
				}

				recyclingSpot[currentColumnName] = spotInfo;				
			});

			recyclingSpotsFormatted.push(recyclingSpot);

		});

		return recyclingSpotsFormatted;
	}
};