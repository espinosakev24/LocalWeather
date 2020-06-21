function getGeoLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showWeather);
	} else {
		console.log("This browser does not support geolocation");
	}
}

function showWeather(pos) {
	let url = `https://fcc-weather-api.glitch.me/api/current?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`;

	fetch(url).then((resp) => resp.json().then(function(data) {
		console.log(data);
		let temp = document.getElementById("temp");
		let location = document.getElementById("location");
		let icon = document.getElementById("icon");

		location.innerHTML = `${data.name}, ${data.sys.country}`;
		temp.innerHTML = `${data.main.temp}°C`;
		icon.className = data.weather[0].main;
	}));
}

function handlePermission() {
	navigator.permissions.query({name: 'geolocation'}).then(function(result) {
		if (result.state === 'prompt') {
			getGeoLocation();
		} else if (result.state === 'granted') {
			getGeoLocation();
		}
	})
}

function convertToFahrenheit() {
	let tempObj = document.getElementById("temp");
	let fahrenheit = 0;
	let celsius = 0;
	celsius = parseFloat(tempObj.innerHTML);
	fahrenheit = (celsius * (9/5)) + 32;
	tempObj.innerHTML = `${fahrenheit.toFixed(2)}°F`;
	document.getElementById("C").style.display = "block";
	document.getElementById("F").style.display = "none";
}

function convertToCelsius() {
	let tempObj = document.getElementById("temp");
	let fahrenheit = 0;
	let celsius = 0;
	fahrenheit = parseFloat(tempObj.innerHTML);
	celsius = (fahrenheit - 32) * (5/9);
	tempObj.innerHTML = `${celsius.toFixed(2)}°C`;
	document.getElementById("F").style.display = "block";
	document.getElementById("C").style.display = "none";
}


handlePermission();