document.addEventListener("DOMContentLoaded", () => {
  const CityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const ErrorDisplay = document.getElementById("error-message");
  const API_KEY = "715c0a5a0b344116774va56d24150777a"; // ENV variable., se your own key to use
  // while requsting from other server it can throw some error
  // server/database is always in another continent

  getWeatherBtn.addEventListener("click", async () => {
    const city = CityInput.value.trim();
    if (!city) return;

    try {
     const weatherData = await fecthWeatherData(city)
     DisplayWeatherData(weatherData)
    } catch (error) {
      showError()
    }
  });

 async function fecthWeatherData(city) {
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

   const response = await fetch(url)

   console.log(typeof response);
   console.log("RESPONSE", response);
   
   if(!response.ok){
    throw new Error("try again")
   }
  const data = await response.json()
  return data
  }
  function showError() {
    weatherInfo.classList.add("hidden");
    ErrorDisplay.classList.remove("hidden");
  }

  function DisplayWeatherData(data) {
    console.log(data);
    const {name, main, weather} = data
    temperatureDisplay.textContent = `Temperature : ${main.temp}`
 descriptionDisplay.textContent = `Weather : ${weather[0].description}`
    cityNameDisplay.textContent = name


    //Unlock the display
    weatherInfo.classList.remove('hidden')
    ErrorDisplay.classList.add('hidden')
  
  }
});
