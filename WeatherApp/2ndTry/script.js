document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const discriptionDisplay = document.getElementById("description");
  const errorDisplay = document.getElementById("error-message");
  const API_KEY = "715c0a5a0b344116774va56d24150777a";// Use your own api key 


  getWeatherBtn.addEventListener('click',async () => {
    const city = cityInput.value.trim()
    if(!city) return    // this indicate that is city is empty then exit from the function

    try {
     const data = await  fecthWeatherData(city)
        DisplayWeatherData(data)
    } catch (error) {
        showError()
    }
  }
  )
  async function fecthWeatherData(city) {
    console.log("fecthing data")
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

    const response = await fetch(url)
    console.log(typeof response)
    console.log("RESPONSE", response)
    if(!response.ok){
        throw new Error("try again")
       }
       const data = await response.json()
       return data
      
  }
  function showError() {
   weatherInfo.classList.add('hidden')
   errorDisplay.classList.remove('hidden')
    console.log('error loading data');
    
  }
  
  function DisplayWeatherData(data) {
    console.log(data)
    const {name, main, weather} = data
    temperatureDisplay.textContent = `Temprature: ${main.temp}`
    cityNameDisplay.textContent = name
    discriptionDisplay.textContent = `Weather: ${weather[0].description}`

    weatherInfo.classList.remove('hidden')
    errorDisplay.classList.add('hidden')
  }
});
