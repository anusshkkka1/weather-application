let appId = '71f6779186cc32448b4c412eea65b982';
let units = 'metric'; 
let searchMethod; 

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else 
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            init(res);
    });
}

function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = "url('https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-99612775/99612775.jpg')";
            break;
        
        case 'Clouds':
            document.body.style.backgroundImage = "url('https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/sky-1107579_1920.jpg?w=900')";
            break;

        case 'Rain':
        case 'Drizzle':
            document.body.style.backgroundImage = "url('https://jainsusa-website.s3.us-west-1.amazonaws.com/wp-content/uploads/2021/02/24204954/AdobeStock_273095279-scaled-768x432.jpg')";
            break;

        case 'Mist':
            document.body.style.backgroundImage = "url('https://cff2.earth.com/uploads/2018/11/13053559/what-is-mist.jpg')";
            break;    
        
        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('https://www.skymetweather.com/content/wp-content/uploads/2021/08/Places-Worth-Visiting-for-Thunderstorm-Lovers-c.jpg')";
            break;
        
        case 'Snow':
            document.body.style.backgroundImage = "url('https://v8v7e2w9.stackpathcdn.com/getmedia/2bb72657-2b9f-415e-9840-899e9ab3df68/Hero%20-%20winter.jpg')";
            break;

        default:
            break;
    }
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');

    let weatherIcon = document.getElementById('documentIconImg');
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;';
    windSpeedElement.innerHTML = 'Wind Speed: ' + Math.floor(resultFromServer.wind.speed) + ' meter/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels: ' + resultFromServer.main.humidity +  '%';

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(74% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
});