const weatherApiKey = "cde00dd405f02d88dbf0fc6213a3ac98";
const cityWeatherForm = document.querySelector(".cityWeatherForm");
const citySelect = document.querySelector(".citySelect");
const card = document.querySelector(".card");

cityWeatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = citySelect.value;
  if (city) {
  } else {
    displayError("Please Enter a City");
  }
});

async function getWeatherData(city) {}

function displayWeatherInfo(data) {}

function getWeatherEmoji(weatherId) {}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
