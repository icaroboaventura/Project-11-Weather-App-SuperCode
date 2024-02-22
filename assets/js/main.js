const btn = document.querySelector(".btn");
const weatherBox = document.querySelector(".current-weather");
const city = document.querySelector(".city-name");
const grad = document.querySelector(".grad");
const icon = document.querySelector(".icon");
const localTime = document.querySelector(".local-time");
const windSpeed = document.querySelector(".windspeed");
const cloudness = document.querySelector(".cloudness");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");

const getWeather = () => {
  const input = document.querySelector(".city").value;
  const inputUpper = input.charAt(0).toUpperCase() + input.slice(1);

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputUpper}&limit=1&appid=fc4fb985caa1af52ca153b514f4006ef`)
    .then((response) => response.json())
    .then((geoData) => {
      city.innerHTML = geoData[0].name;

      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=fc4fb985caa1af52ca153b514f4006ef`)
        .then((response) => response.json())
        .then((cityData) => {
          const iconAPI = cityData.weather[0].icon;
          icon.src = `http://openweathermap.org/img/wn/${iconAPI}@2x.png`;

          const temp = cityData.main.temp;
          const tempC = Math.round(temp - 273.15);
          const tempF = Math.round(((temp - 273.15) * 9) / 5 + 32);
          grad.innerHTML = `${tempC} °C`;

          const timeConvert = (unix_timestamp) => {
            let date = new Date((unix_timestamp + cityData.timezone) * 1000);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            let formattedTime = hours + ":" + minutes.substr(-2);
            return formattedTime;
          };

          localTime.innerHTML = timeConvert(cityData.dt);

          windSpeed.innerHTML = cityData.wind.speed + " km/h";

          cloudness.innerHTML = cityData.weather[0].description;

          pressure.innerHTML = cityData.main.pressure + " nPa";

          humidity.innerHTML = cityData.main.humidity + " %";

          sunrise.innerHTML = timeConvert(cityData.sys.sunrise);

          sunset.innerHTML = timeConvert(cityData.sys.sunset);
        })
        .catch((error) => {
          "Second fecht error", error;
        });
    })
    .catch((error) => {
      "First fecht error", error;
    });
};

btn.addEventListener("click", getWeather);
