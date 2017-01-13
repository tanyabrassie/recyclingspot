//an immediately invoked function!
(function () {

//capture the form info before its sent to the server!
	var $form = $('[name=recyclingsearch]');
	var $getLocation = $('[name=currentLocation]');
	
	var $currentLat = $('[name="currentLat"]');
	var $currentLng = $('[name="currentLng"]');


//intercept form submit event
//jquery form elements have a submit function be default
	$form.submit(function (event){

		//always prevent form from being submitted 
		// event.preventDefault();

		//search for the zipcode input 
		var $zipInput = $form.find('[name="address"]');

		//get the value of that zipcode input
		var zipValue = $zipInput.val(); 
		var boroughCheckBoxes = $form.find('[name="boroughs[]"]');
		var boroughSelectedFlag = false;

		boroughCheckBoxes.each(function(i, checkbox){
			if (checkbox.checked) {
				boroughSelectedFlag = true;
			}
		});

		if (zipValue.length == 5 || (zipValue.length == 0 && boroughSelectedFlag) || (zipValue.length == 0 && !boroughSelectedFlag && $currentLat.val().length > 0)) {

			//now that my zipcode is good, i'll send it over to the server
			//ajax is a function of jquery
			//give ajax an empty object which will contain the URL of where I want to send the data
			// $.ajax({
			// 	type: 'POST',
			// 	url: 'http://127.0.0.1:8081/search',
			// 	data: $form.serialize(),
			// 	success: function (html) {
			// 		console.log(html);
			// 	}

			// });

			return true;

		} else {
			return false;
			//in the future add error message 
		}

	});	

	$getLocation.click(function(event){
		window.navigator.geolocation.getCurrentPosition(function(position) {
			//do_something(position.coords.latitude, position.coords.longitude);
			
			$currentLat.val(position.coords.latitude);
			$currentLng.val(position.coords.longitude);

			$form.submit();

		});

	});

})();
