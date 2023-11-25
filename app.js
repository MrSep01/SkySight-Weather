
const api_KEY = config.api_KEY;
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const searchHistoryContainer = document.getElementById('search-history');
const currentWeatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast-container');
const resetButton = document.getElementById('reset-button');

searchButton.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (city) {
        getCoordinates(city);
    } else {
        alert("Please enter a city name.");
    }
});

function capitalizeCityName(cityName) {
    return cityName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

async function getCoordinates(city) {
    const formattedCity = capitalizeCityName(city);
    const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${formattedCity}&appid=${api_KEY}`;
    try {
        const response = await fetch(geoApiUrl);
        const locations = await response.json();
        if (locations.length) {
            const { lat, lon } = locations[0];
            getWeather(lat, lon, formattedCity);
        } else {
            alert('City not found.');
        }
    } catch (error) {
        console.error(error);
    }
}

async function getWeather(lat, lon, city) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_KEY}&units=imperial`;
    try {
        const response = await fetch(weatherApiUrl);
        const weatherData = await response.json();
        displayCurrentWeather(weatherData, city);
        displayForecast(weatherData);
        addToSearchHistory(city);
    } catch (error) {
        console.error(error);
    }
}

function displayCurrentWeather(weatherData, city) {
    const current = weatherData.list[0]; 
    const date = new Date(current.dt * 1000);
    const weatherHTML = `
        <h2>${city} (${date.toLocaleDateString()}) <img src="http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" alt="Weather icon"></h2>
        <p>Temperature: ${current.main.temp} °F</p>
        <p>Wind: ${current.wind.speed} MPH</p>
        <p>Humidity: ${current.main.humidity} %</p>
    `;
    currentWeatherContainer.innerHTML = weatherHTML;
}

function displayForecast(weatherData) {
    const forecastHTML = weatherData.list
        .filter((_, index) => index % 8 === 0) // Filtering out the forecast every 24 hours
        .map(forecast => {
            const date = new Date(forecast.dt * 1000);
            return `
                <div class="forecast-card">
                    <h3>${date.toLocaleDateString()}</h3>
                    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather icon">
                    <p>Temp: ${forecast.main.temp} °F</p>
                    <p>Wind: ${forecast.wind.speed} MPH</p>
                    <p>Humidity: ${forecast.main.humidity} %</p>
                </div>
            `;
        }).join('');
    forecastContainer.innerHTML = forecastHTML;
}

function addToSearchHistory(city) {
    let history = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('weatherSearchHistory', JSON.stringify(history));
    }
    updateSearchHistoryDisplay(history);
}


function addToSearchHistory(city) {
    // Checking  if the city already exists in the history to prevent duplicates
    let history = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('weatherSearchHistory', JSON.stringify(history));
    }
    
    // Update the search history display
    updateSearchHistoryDisplay(history);
}

function updateSearchHistoryDisplay(history) {
    searchHistoryContainer.innerHTML = history.map(city => 
        `<button class="history-item">${city}</button>`
    ).join('');

    

    // Add click event listeners to each history item
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
            getCoordinates(item.textContent);
        });
    });
}

// Load any saved history from localStorage
function loadSearchHistory() {
    const history = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
    updateSearchHistoryDisplay(history);
}

// Call loadSearchHistory to display any saved search history on load
loadSearchHistory();


resetButton.addEventListener('click', function() {
    clearSearchHistory();
});


function updateSearchHistoryDisplay(history) {
    searchHistoryContainer.innerHTML = history.map(city => 
        `<button class="history-item">${city}</button>`
    ).join('');

    // Showing reset button if there's any history
    document.getElementById('reset-button').style.display = history.length ? 'block' : 'none';

    // Adding  click event listeners to each history item
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
            getCoordinates(item.textContent);
        });
    });
}

function clearSearchHistory() {
    // Clearing  localStorage
    localStorage.removeItem('weatherSearchHistory');
    
    // Clearing  search history display
    searchHistoryContainer.innerHTML = '';
    
    // Hiding  reset button
    document.getElementById('reset-button').style.display = 'none';
}

// Ensuring  to call updateSearchHistoryDisplay right away to check if the reset button should be shown on page load
loadSearchHistory();


resetButton.addEventListener('click', clearSearchHistory);

