window.addEventListener('load', () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description')
	let temperatureDegree = document.querySelector('.temperature-degree')
	let locationTimeZone = document.querySelector('.location-timezone')
	let temperatureSection = document.querySelector('.temperature')
	const temperatureSpan = document.querySelector('.temperature span')

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;
			const proxy = "https://cors-anywhere.herokuapp.com/"
			const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat}, ${long}`
			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data)
					const { temperature, summary, icon } = data.currently;
					// set Dom elements from the API
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimeZone.textContent = data.timezone;
					setIcons(icon, document.querySelector('.icon'))

					//change temperature to C
					temperatureSection.addEventListener("click", () => {
						if (temperatureSpan.textContent === 'F') {
							temperatureSpan.textContent = 'C'
							temperatureDegree.textContent = Math.round((temperature - 32) * 5 / 9);
						} else {
							temperatureDegree.textContent = temperature;
							temperatureSpan.textContent = 'F'
						}
						// temperatureDegree.textContent = (temperature - 32) / 5 * 9
					})
				});
		});
	}

	function setIcons(icon, iconID) {
		const skycons = new Skycons({ color: "white" })
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon])
	}
});