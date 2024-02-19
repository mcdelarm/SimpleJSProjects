const API_KEY = '36dcef9c66d1b7557a8b728e707b99d9';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.querySelector('.locationInput');
const searchButton = document.querySelector('.search-button');
const ownLocationButton = document.querySelector('.own-location-button');
const locationElement = document.querySelector('.location');
const tempElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');

searchButton.addEventListener('click', () => {
  getWeather(cityInput.value);
});

cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    getWeather(cityInput.value);
  }
})

ownLocationButton.addEventListener('click', () => {
  getUserCity();
})

function getWeather(cityName) {
  if (cityName === '') return;
  const url = `${apiUrl}?q=${cityName}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      locationElement.textContent = data.name;
      tempElement.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionElement.textContent = data.weather[0].description;
    })
    .catch(error => {
      alert('Error fetching weather data');
    });
}

function getUserCity() {
  navigator.geolocation.getCurrentPosition( (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${API_KEY}`;
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        const cityName = data[0].name;
        console.log(cityName);
        getWeather(cityName);
      })
      .catch(() => {
        alert('An error occured while fetching the city name!');
      });
  },
  error => {
    if (error.code === error.PERMISSION_DENIED) {
      alert('Gelolocation request denied. Please rest location permission to grant access again.')
    }
    else {
      alert('Gelolocation request error.')
    }
  }
  );
}