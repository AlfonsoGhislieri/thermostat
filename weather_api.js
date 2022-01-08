import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

class WeatherApi {

  #getApiKey = () => process.env.WEATHER_API;
  
  fetchWeatherData = (city, callback) => {
    const apiKey = this.#getApiKey();
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    
    axios.get(apiUrl).then((response) => {
      const weatherData = JSON.parse(response.body);
      callback(weatherData)
      });
  }
}

export { WeatherApi } 