import { WeatherApi } from './weather_api.js';

class Thermostat {
  constructor(WeatherAPI) {
    this.temperature = 20;
    this.powerSaving = true;
    this.city = null;
    this.WeatherAPI = WeatherAPI;
  }

  setCity = (city) => this.city = city

  getTemperature = () => this.WeatherAPI.fetchWeatherData(this.city, (weatherData) => {
    this.temperature = (weatherData.main['temp_max'])
    console.log(this.temperature) });

  up = () => {
    if (this.powerSaving === true) {
      if (this.temperature < 25) { 
        this.temperature += 1; 
      }
    }
    else {
      if (this.temperature < 32) { 
        this.temperature += 1; 
      }
    }
  }

  down = () => {
    if (this.temperature > 10)
    { this.temperature -= 1; }
  }  

  setPowerSavingMode = (boolean) => this.powerSaving = boolean;

  reset = () => this.temperature = 20;

  currentEnergyUsage(){
    if (this.temperature > 25) {
      return "high-usage";
    }
    else if (this.temperature >= 18 && this.temperature < 26) {
      return "medium-usage";
    }
    else {
      return "low-usage"
    }
  }
    
}

export { Thermostat }