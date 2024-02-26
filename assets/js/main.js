const btn = document.querySelector(".btn");

const weatherBox = document.querySelector(".current-weather");
const city = document.querySelector(".city-name");
const grad = document.querySelector(".grad");
const unit = document.querySelector(".unit");
const iconCurrWeather = document.querySelector(".icon-curr-weather");

const infoGridElement = document.querySelectorAll(".element-one");
const hourGridElement = document.querySelectorAll(".element-two");

const localTime = document.querySelector(".local-time");
const windSpeed = document.querySelector(".windspeed");
const fahrenheit = document.querySelector(".fahrenheit");
const humidity = document.querySelector(".humidity");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");

const localTimeImg = document.querySelector(".img-local-time");
const windSpeedImg = document.querySelector(".img-windspeed");
const cloudnessImg = document.querySelector(".img-cloudness");
const fahrenheitImg = document.querySelector(".img-fahrenheit");
const humidityImg = document.querySelector(".img-humidity");
const sunriseImg = document.querySelector(".img-sunrise");
const sunsetImg = document.querySelector(".img-sunset");

const timeImgOne = document.querySelector(".img-time-one");
const timeImgTwo = document.querySelector(".img-time-two");
const timeImgThree = document.querySelector(".img-time-three");
const timeImgFour = document.querySelector(".img-time-four");
const timeImgFive = document.querySelector(".img-time-five");

const timeOne = document.querySelector(".time-one");
const timeTwo = document.querySelector(".time-two");
const timeThree = document.querySelector(".time-three");
const timeFour = document.querySelector(".time-four");
const timeFive = document.querySelector(".time-five");

const gradOne = document.querySelector(".grad-one");
const gradTwo = document.querySelector(".grad-two");
const gradThree = document.querySelector(".grad-three");
const gradFour = document.querySelector(".grad-four");
const gradFive = document.querySelector(".grad-five");

const getWeather = () => {
  const input = document.querySelector(".city").value;
  // const inputUpper = input.charAt(0).toUpperCase() + input.slice(1);

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=fc4fb985caa1af52ca153b514f4006ef`)
    .then((response) => response.json())
    .then((geoData) => {
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=fc4fb985caa1af52ca153b514f4006ef`)
        .then((response) => response.json())
        .then((cityData) => {
          //   const iconAPI = cityData.weather[0].icon;
          //   icon.src = `http://openweathermap.org/img/wn/${iconAPI}@2x.png`;

          const timeConvert = (unix_timestamp) => {
            let date = new Date((unix_timestamp + cityData.timezone) * 1000);
            let hours = date.getHours() + 3;
            let minutes = "0" + date.getMinutes();
            let formattedTime = hours + ":" + minutes.substr(-2);
            return formattedTime;
          };

          const currWeather = cityData.weather[0].main;

          const setWeatherImage = (time, weather, imgElement) => {
            hourArray = timeConvert(time).split(":");
            if (Number(hourArray[0]) >= 18 || Number(hourArray[0]) <= 6) {
              switch (weather) {
                case "Thunderstorm":
                  imgElement.src = "./assets/img/storm_dark.png";
                  break;
                case "Drizzle":
                  imgElement.src = "./assets/img/drizzle_dark.png";
                  break;
                case "Rain":
                  imgElement.src = "./assets/img/rain_dark.png";
                  break;
                case "Snow":
                  imgElement.src = "./assets/img/snow_dark.png";
                  break;
                case "Mist":
                  imgElement.src = "./assets/img/mist.png";
                  break;
                case "Clear":
                  imgElement.src = "./assets/img/clear_sky_dark.png";
                  break;
                default:
                  imgElement.src = "./assets/img/few_clouds_dark.png";
                  break;
              }
            } else {
              switch (weather) {
                case "Thunderstorm":
                  imgElement.src = "./assets/img/storm.png";
                  break;
                case "Drizzle":
                  imgElement.src = "./assets/img/drizzle.png";
                  break;
                case "Rain":
                  imgElement.src = "./assets/img/rain.png";
                  break;
                case "Snow":
                  imgElement.src = "./assets/img/snow.png";
                  break;
                case "Mist":
                  imgElement.src = "./assets/img/mist.png";
                  break;
                case "Clear":
                  imgElement.src = "./assets/img/clear_sky.png";
                  break;
                default:
                  imgElement.src = "./assets/img/few_clouds.png";
                  break;
              }
            }
          };

          setWeatherImage(cityData.dt, currWeather, iconCurrWeather);

          city.innerHTML = `${geoData[0].name} - ${timeConvert(cityData.dt)} - ${currWeather.charAt(0).toUpperCase() + currWeather.slice(1)}`;

          const temp = cityData.main.temp;
          const tempC = Math.round(temp - 273.15);
          const tempF = Math.round(((temp - 273.15) * 9) / 5 + 32);
          grad.innerHTML = tempC;
          unit.innerHTML = "°C";

          for (const element of infoGridElement) {
            element.classList.add("grid-element-one");
          }

          fahrenheitImg.src = "./assets/img/fahrenheit.png";
          fahrenheit.innerHTML = tempF + "°F";

          windSpeedImg.src = "./assets/img/wind_speed.png";
          windSpeed.innerHTML = cityData.wind.speed + " km/h";

          humidityImg.src = "./assets/img/humidity.png";
          humidity.innerHTML = cityData.main.humidity + " %";

          sunriseImg.src = "./assets/img/sunrise.png";
          sunrise.innerHTML = timeConvert(cityData.sys.sunrise);

          sunsetImg.src = "./assets/img/sunset.png";
          sunset.innerHTML = timeConvert(cityData.sys.sunset);

          fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=fc4fb985caa1af52ca153b514f4006ef`)
            .then((response) => response.json())
            .then((forecast) => {
              for (const element of hourGridElement) {
                element.classList.add("grid-element-two");
              }

              const list = forecast.list;

              const times = [timeConvert(list[0].dt), timeConvert(list[1].dt), timeConvert(list[2].dt), timeConvert(list[3].dt), timeConvert(list[4].dt)];

              const temps = [forecast.list[0].main.temp, forecast.list[1].main.temp, forecast.list[2].main.temp, forecast.list[3].main.temp, forecast.list[4].main.temp];

              const conditions = [forecast.list[0].weather[0].main, forecast.list[1].weather[0].main, forecast.list[2].weather[0].main, forecast.list[3].weather[0].main, forecast.list[4].weather[0].main];

              setWeatherImage(list[0].dt, forecast.list[0].weather[0].main, timeImgOne);
              setWeatherImage(list[1].dt, forecast.list[1].weather[0].main, timeImgTwo);
              setWeatherImage(list[2].dt, forecast.list[2].weather[0].main, timeImgThree);
              setWeatherImage(list[3].dt, forecast.list[3].weather[0].main, timeImgFour);
              setWeatherImage(list[4].dt, forecast.list[4].weather[0].main, timeImgFive);

              let newTemps = [];

              temps.map((i) => {
                const tempForecastC = Math.round(i - 273.15);
                newTemps.push(tempForecastC);
              });

              let newtimes = [];
              times.map((i) => {
                if (i === "25:00") {
                  i = "1:00";
                  newtimes.push(i);
                } else {
                  newtimes.push(i);
                }
              });

              timeOne.innerHTML = newtimes[0];
              timeTwo.innerHTML = newtimes[1];
              timeThree.innerHTML = newtimes[2];
              timeFour.innerHTML = newtimes[3];
              timeFive.innerHTML = newtimes[4];

              gradOne.innerHTML = `${newTemps[0]}°C`;
              gradTwo.innerHTML = `${newTemps[1]}°C`;
              gradThree.innerHTML = `${newTemps[2]}°C`;
              gradFour.innerHTML = `${newTemps[3]}°C`;
              gradFive.innerHTML = `${newTemps[4]}°C`;
            })
            .catch((error) => {
              "last fecht error", error;
            });
        })
        .catch((error) => {
          "Second fecht error", error;
        });
    })
    .catch((error) => {
      "First fecht error", error;
    });
};

getWeather();

btn.addEventListener("click", getWeather);
