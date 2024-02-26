// Selecting DOM elements
const btn = document.querySelector(".btn");
const weatherBox = document.querySelector(".current-weather");
const city = document.querySelector(".city-name");
const minMax = document.querySelector(".minmax");
const feelsLike = document.querySelector(".feelslike");
const grad = document.querySelector(".grad");
const unit = document.querySelector(".unit");
const iconCurrWeather = document.querySelector(".icon-curr-weather");
const infoFlexElement = document.querySelectorAll(".element-one");
const hourFlexElement = document.querySelectorAll(".element-two");
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

// Function to fetch weather data
const getWeather = () => {
  const input = document.querySelector(".city").value;

  // Fetching geo data
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=fc4fb985caa1af52ca153b514f4006ef`)
    .then((response) => response.json())
    .then((geoData) => {
      // Fetching weather data
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=fc4fb985caa1af52ca153b514f4006ef`)
        .then((response) => response.json())
        .then((cityData) => {
          console.log(cityData);

          // Function to convert Unix timestamp to formatted time
          const timeConvert = (unix_timestamp) => {
            let date = new Date((unix_timestamp + cityData.timezone) * 1000);
            let hours = date.getHours() + 3;
            let minutes = "0" + date.getMinutes();
            let formattedTime = hours + ":" + minutes.substr(-2);
            return formattedTime;
          };

          // Function to set weather image based on time and weather condition
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

          // Setting current weather details
          setWeatherImage(cityData.dt, cityData.weather[0].main, iconCurrWeather);
          city.innerHTML = `${geoData[0].name} - ${cityData.weather[0].main.charAt(0).toUpperCase() + cityData.weather[0].main.slice(1)}`;
          minMax.innerHTML = `${Math.round(cityData.main.temp_min - 273.15)} - ${Math.round(cityData.main.temp_max - 273.15)} °C`;
          feelsLike.innerHTML = `Feels Like: ${Math.round(cityData.main.feels_like - 273.15)} °C`;
          const tempC = Math.round(cityData.main.temp - 273.15);
          const tempF = Math.round(((cityData.main.temp - 273.15) * 9) / 5 + 32);
          grad.innerHTML = tempC;
          unit.innerHTML = "°C";

          // Adding CSS class to elements
          infoFlexElement.forEach((element) => {
            element.classList.add("flex-element-one");
          });

          // Setting other weather details
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

          // Fetching forecast data
          fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=fc4fb985caa1af52ca153b514f4006ef`)
            .then((response) => response.json())
            .then((forecast) => {
              // Adding CSS class to elements
              hourFlexElement.forEach((element) => {
                element.classList.add("flex-element-two");
              });

              // Extracting forecast data
              const list = forecast.list;
              const times = [timeConvert(list[0].dt), timeConvert(list[1].dt), timeConvert(list[2].dt), timeConvert(list[3].dt), timeConvert(list[4].dt)];
              const temps = list.map((item) => Math.round(item.main.temp - 273.15));

              // Setting forecast weather images
              [timeImgOne, timeImgTwo, timeImgThree, timeImgFour, timeImgFive].forEach((img, index) => {
                setWeatherImage(list[index].dt, list[index].weather[0].main, img);
              });

              // Setting forecast times and temperatures

              let newTemps = [];

              let newtimes = [];
              times.map((i) => {
                if (i === "25:00") {
                  i = "1:00";
                  newtimes.push(i);
                } else if (i === "26:00") {
                  i = "2:00";
                  newtimes.push(i);
                } else if (i === "27:00") {
                  i = "3:00";
                  newtimes.push(i);
                } else {
                  newtimes.push(i);
                }
              });

              [timeOne, timeTwo, timeThree, timeFour, timeFive].forEach((timeElement, index) => {
                timeElement.innerHTML = newtimes[index];
              });

              [gradOne, gradTwo, gradThree, gradFour, gradFive].forEach((gradElement, index) => {
                gradElement.innerHTML = `${temps[index]}°C`;
              });
            })
            .catch((error) => {
              console.error("Fetch error in forecast data", error);
            });
        })
        .catch((error) => {
          console.error("Fetch error in weather data", error);
        });
    })
    .catch((error) => {
      console.error("Fetch error in geo data", error);
    });
};

// Initial fetch weather function call
getWeather();

// Event listener for button click
btn.addEventListener("click", getWeather);
