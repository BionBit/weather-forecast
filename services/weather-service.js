export class WeatherService {
    static async getGeoData(cityName) {
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`);
      const geoData = await geoResponse.json();

      return geoData; 
   }

   static async getWeatherData(latitude, longitude) {
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`);
      const weatherData = await weatherResponse.json();

      return weatherData
   }
 }