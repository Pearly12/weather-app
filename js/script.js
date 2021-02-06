const searchInput = document.getElementById('city-input');
const searchbutton = document.getElementById('search-button');
const currentNameH2 = document.getElementById('weather-location');
const currentTemperatureP = document.getElementById('weather-temperature')
const currentWeatherP = document.getElementById('weather-weather');
const currentResponseTime = document.getElementById('response-time');

async function displayWeather(cityName) {
    let key = '61813c5f8cd90b489b39b0da474db348';
    let currentTemperature;
    let currentWeather = "";
    let locationName = "";
    let start_time = new Date().getTime();

    let response = await fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key)
    .then(function(response){ return response.json() })
    .then(function(data) {
        currentTemperature = data.main.temp;
        currentWeather = data.weather[0].main;
        locationName = data.name;

        let currentTemperatureCelcius = Math.round(parseFloat(currentTemperature)-273.15);
        let timeOfResponse = new Date().getTime() - start_time;

        currentNameH2.innerHTML = 'City: ' + locationName;
        currentTemperatureP.innerHTML = 'Temperature: ' + currentTemperatureCelcius;
        currentWeatherP.innerHTML = 'Weather: ' + currentWeather;
        currentResponseTime.innerHTML = 'Response Time: ' + timeOfResponse + "ms";

        console.table('Name: ', locationName, 'Weather :', currentWeather, 'Temperature', currentTemperatureCelcius, data);
    })
    .catch(function(error){
        console.log(error)
    });
}

searchbutton.addEventListener('click', () => {
    displayWeather(searchInput.value);
});
