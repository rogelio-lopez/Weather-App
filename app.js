//API KEY
const APPID = "7e016100b5765ae409a22bc84fe22675";

//get data from API
getCityData = (city) => {
    const URL = "https://api.openweathermap.org/data/2.5/weather";

    return fetch(`${URL}?q=${city}&appid=${APPID}&units=imperial`)
    .then(res => {
        return res.json();
    });
}

// split data and send to UI
getCityWeather = () => {

    const input = document.querySelector('.input');
    const city = input.value;

    getCityData(city).then(res => {
        showWeatherData(res);
        input.value = '';
        input.placeholder = 'Enter a different city';
    }).catch(err => {
        console.error(err);
    });
}

// display data
showWeatherData = (weather) => {
    document.querySelector('#temp').innerText = Math.round(weather.main.temp) + '°';
    document.querySelector('#cityName').innerText = weather.name;
    document.querySelector('#forecast').innerText = weather.weather[0].description;

    //extra info
    document.querySelector('.infoList').style.display = 'flex';
    document.querySelector('#maxTemp').innerText = weather.main.temp_max; 
    document.querySelector('#minTemp').innerText = weather.main.temp_min;
    document.querySelector('#humidity').innerText = weather.main.humidity;
    document.querySelector('#wind').innerText = weather.wind.speed;

    //weather icons
    const icon = document.querySelector('.icon');

    if(weather.weather[0].main == "Clouds"){
        icon.innerHTML = '<img src="./clouds.svg" width="60px"/>';
    }
    else if(weather.weather[0].main == "Clear"){
        icon.innerHTML = '<img src="./clear.svg" width="60px"/>';
    }
}