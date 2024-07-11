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

      location.innerText = `${cityName}(${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()})`;
      temp.innerText = `Temp: ${data.main.temp}°F`;
      wind.innerText = `Wind Speed: ${data.wind.speed}MPH`;
      humidity.innerText = `Humidity: ${data.main.humidity}%`;
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
  const requestURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${weatherApiKey}`;
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let previousDate = undefined;

      for (let i = 0; i < data.list.length; i++) {
        const forecastData = data.list[i];
        const currentDate = new Date(forecastData.dt * 1000);
        if (previousDate && previousDate == currentDate.getDate()) {
          continue;
        }
        previousDate = currentDate.getDate();
        const forecastInfo = document.createElement("ul");
        const dayOfWeek = document.createElement("li");
        const icon = document.createElement("img");
        const temp = document.createElement("li");
        const wind = document.createElement("li");
        const humidity = document.createElement("li");
        icon.src = `https://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`;

        dayOfWeek.innerText = `${currentDate.getDate()}/${
          currentDate.getMonth() + 1
        }/${currentDate.getFullYear()}`;
        temp.innerText = `Temp:${forecastData.main.temp}°F`;
        wind.innerText = `Wind Speed:${forecastData.wind.speed} MPH`;
        humidity.innerText = `Humidity: ${forecastData.main.humidity}%`;
        //APPENDING WEATHER DATA TO CARD VIA UL
        forecastInfo.appendChild(dayOfWeek);
        forecastInfo.appendChild(temp);
        forecastInfo.appendChild(wind);
        forecastInfo.appendChild(humidity);
        forecastInfo.appendChild(icon);

        card2.appendChild(forecastInfo);
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

  card1.textContent = "";
  card1.style.display = "flex";
  card1.appendChild(errorDisplay);
}
