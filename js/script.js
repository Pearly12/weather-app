const currentNameH2 = document.getElementById('weather-location');
const currentTemperatureP = document.getElementById('weather-temperature')
const currentWeatherP = document.getElementById('weather-weather');
const currentResponseTime = document.getElementById('response-time');
const displayWeatherDiv = document.getElementById('display-weather');

async function displayWeather(cityName) {
    let key = config.MY_KEY;
    let currentTemperature;
    let currentWeather = "";
    let locationName = "";
    let start_time = new Date().getTime();
    
    // call the open weather map api
    // THEN translate it to JSON
    // THEN 
    let response = await fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key)
    .then(function(response){ return response.json() })
    .then(function(data) {
        //grab the data that I'm interested in ... get more from data variable ... do console.log(data)
        currentTemperature = data.main.temp;
        currentWeather = data.weather[0].main;
        locationName = data.name;

        // manipulate data to prepare it for output
        let currentTemperatureCelcius = Math.round(parseFloat(currentTemperature)-273.15);
        let timeOfResponse = new Date().getTime() - start_time;

        //output data to the html elements/ output data to the user
        displayWeatherDiv.style.display = "block";
        currentNameH2.innerHTML = locationName;
        currentTemperatureP.innerHTML = 'Temperature: ' + currentTemperatureCelcius + ' Degrees Celcius';
        currentWeatherP.innerHTML = 'Weather: ' + currentWeather;
        currentResponseTime.innerHTML = 'Response Time: ' + timeOfResponse + "ms";
    })
    .catch(function(error){
        displayWeatherDiv.style.display = "block";
        currentNameH2.innerHTML = "No Data Found";
    });
}

function inputEntered(e){
    if(e.key === 'Enter' || e.keyCode === 13) {
        displayWeather(searchInput.value);
    }
    return;
}


const searchbutton = document.getElementById('search-button');
searchbutton.addEventListener('click', () => {
    displayWeather(searchInput.value);
});

const searchInput = document.getElementById('city-input');
searchInput.addEventListener('keyup', inputEntered);