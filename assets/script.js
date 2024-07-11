// const { foregroundChild } = require("foreground-child/dist/commonjs");
// GLOBAL VARIABLES
const weatherApiKey = "cde00dd405f02d88dbf0fc6213a3ac98";
const cityWeatherForm = document.querySelector(".cityWeatherForm");
const citySelect = document.querySelector(".citySelect");
const card1 = document.querySelector(".card1");
const card2 = document.querySelector(".card2");
// FUNCTION FOR CURRENT WEATHER
function getCurrentWeather(cityName) {
  const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${weatherApiKey}`;
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const location = document.createElement("h2");
      const currentWeather = document.createElement("ul");
      const temp = document.createElement("li");
      const wind = document.createElement("li");
      const humidity = document.createElement("li");
      const icon = document.createElement("img");
      const date = new Date(data.dt * 1000);
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

      location.innerText = `${cityName}(${date.getDate()}/${date.getMonth()}/${date.getFullYear()})`;
      temp.innerText = `${data.main.temp}`;
      wind.innerText = `${data.wind.speed}`;
      humidity.innerText = `${data.main.humidity}`;
      //APPENDING WEATHER DATA TO CARD VIA UL
      currentWeather.appendChild(temp);
      currentWeather.appendChild(wind);
      currentWeather.appendChild(humidity);
      // APPENDING ICON TO CARD HEADING
      location.appendChild(icon);

      card1.appendChild(location);
      card1.appendChild(currentWeather);
    });
}

// function to getForecast()

function getForecast(cityName) {
  const requestURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${weatherApiKey}}`;
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        const forecastData = document.createElement("ul");
        const dayOfWeek = document.createElement("li");
        const icon = document.createElement("img");
        const temp = document.createElement("li");
        const wind = document.createElement("li");
        const humidity = document.createElement("li");
        const date = new Date(data.dt * 1000);
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        dayOfWeek.innerText = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        temp.innerText = `${data.main.temp}`;
        wind.innerText = `${data.wind.speed}`;
        humidity.innerText = `${data.main.humidity}`;
        //APPENDING WEATHER DATA TO CARD VIA UL
        forecastData.appendChild(temp);
        forecastData.appendChild(wind);
        forecastData.appendChild(humidity);
        forecastData.appendChild(icon);

        card2.appendChild(forecastData);
      }
    });
}

cityWeatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = citySelect.value;
  if (city) {
    getCurrentWeather(city);
    getForecast(city);
  } else {
    displayError("Please Enter a City");
  }
});

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
