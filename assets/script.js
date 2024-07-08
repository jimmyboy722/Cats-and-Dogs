const cityList = document.querySelector("ul");
const weatherApiKey = "cde00dd405f02d88dbf0fc6213a3ac98";
let city;
function getApi() {
  const requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        const cityName = document.createElement("li");
        cityName.textContent = data[i].html_url;
        cityList.appendChild(cityName);
      }
    });
}
