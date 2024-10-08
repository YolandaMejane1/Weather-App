const iconMappings = {
  "clear sky": {
    day: "clear-sky-day.png",
    night: "clear-sky-night.png",
  },
  "few clouds": {
    day: "few-clouds-day.png",
    night: "few-clouds-night.png",
  },
  "scattered clouds": {
    day: "scattered-clouds-day.png",
    night: "scattered-clouds-night.png",
  },
  "broken clouds": {
    day: "broken-clouds-day.png",
    night: "broken-clouds-night.png",
  },
  "overcast clouds": {
    day: "broken-clouds-day.png",
    night: "broken-clouds-night.png",
  },
  "mist": {
    day: "mist-day.png",
    night: "mist-night.png",
  },
  "light rain": {
    day: "rain-day.png",
    night: "rain-night.png",
  },
  "rain": {
    day: "rain-day.png",
    night: "rain-night.png",
  },
  "shower rain": {
    day: "shower-rain-day.png",
    night: "shower-rain-night.png",
  },
  "thunderstorm": {
    day: "thunderstorm-day.png",
    night: "thunderstorm-night.png",
  },
  "snow": {
    day: "snow-day.png",
    night: "snow-night.png",
  },
  "haze": {
    day: "mist-day.png",
    night: "mist-night.png",
  }
};

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `Humidity: <strong>${humidity}</strong>`;

  let windSpeedElement = document.querySelector("#wind-speed");
  let windSpeedMps = response.data.wind.speed;
  let windDirection = response.data.wind.degree;
  let windSpeedKmh = (windSpeedMps * 3.6).toFixed(1);
  windSpeedElement.innerHTML = `Wind: <strong>${windSpeedKmh} km/h</strong>`;

  let weatherConditionElement = document.querySelector("#weather-condition");
  let weatherCondition = response.data.condition.description;
  weatherConditionElement.innerHTML = `Condition: ${weatherCondition}`;

  let iconFileName;
  let isDayTime = response.data.time;

  if (isDayTime) {
    iconFileName = iconMappings[weatherCondition.toLowerCase()]?.day;
  } else {
    iconFileName = iconMappings[weatherCondition.toLowerCase()]?.night;
  }

  let weatherIconElement = document.querySelector("#weather-icon");
  let iconUrl = `assets/${iconFileName}`;
  console.log(`Image URL: ${iconUrl}`);
  weatherIconElement.src = iconUrl;
  weatherIconElement.alt = weatherCondition;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "200e0d6tebb283fa19534eeofca3556f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
