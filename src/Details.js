import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import citiesData from './data/citiesData.json';
import WeatherCard from './WeatherCard'

function Details() {
  const { latitude, longitude } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [locationInfo, setLocationInfo] = useState({ name: '', country: '' });
  const navigate = useNavigate();

  function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
  }

  const apiKey = "BLANK";
  useEffect(() => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

    axios.get(weatherUrl)
      .then((response) => {
        setWeatherData(response.data);
        setLocationInfo({
          name: response.data.name,
          country: response.data.sys.country,
        });
      })
      .catch((error) => console.log(error));

    axios.get(forecastUrl)
      .then((response) => {
        const processedForecastData = response.data.list.reduce((acc, item) => {
          const date = new Date(item.dt_txt).toDateString();
          if (date !== new Date().toDateString()) {
            if (!acc[date]) {
              acc[date] = {
                min: item.main.temp_min,
                max: item.main.temp_max,
                weather: item.weather[0].description,
                date: item.dt_txt,
              };
            } else {
              acc[date].min = Math.min(acc[date].min, item.main.temp_min);
              acc[date].max = Math.max(acc[date].max, item.main.temp_max);
            }
          }
          return acc;
        }, {});
        setForecastData(Object.values(processedForecastData).slice(0, 5));
      })
      .catch((error) => console.log(error));
  }, [latitude, longitude]);

  return (
    <div className="details p-4">
      <button onClick={() => navigate(-1)} className="mb-4">RETURN</button>
      {locationInfo.name && (
        <div className="location-info text-center mb-4 bg-blue-300 p-5 border rounded shadow-lg">
          <h2 className="text-3xl font-semibold">{locationInfo.name}, {locationInfo.country}</h2>
        </div>
      )}
      <div className="weather-details-container">
        {weatherData && (
          <div className="weather-details grid grid-cols-2 gap-4 mb-5">
            <div className="temp tile p-5 border rounded shadow-lg bg-blue-300">
              <h2 className="text-lg">Temperature</h2>
              <p className="text-3xl">{Math.round(weatherData.main.temp)}°F</p>
            </div>
            <div className="humidity tile p-5 border rounded shadow-lg bg-blue-300">
              <h2 className="text-lg">Humidity</h2>
              <p className="text-3xl">{weatherData.main.humidity}%</p>
            </div>
          </div>
        )}
        <div className="forecast-details-container text-center mb-5">
          <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
          {forecastData.length > 0 && (
              <div className="forecast-tile p-5 border rounded shadow-lg inline-block">
              <div className="forecast-grid grid grid-cols-1 md:grid-cols-5 gap-4">
                  {forecastData.map((item, index) => (
                  <div key={index} className="forecast-item tile p-5 border rounded shadow-lg bg-blue-300 custom-width">
                      <p className="font-bold">{new Date(item.date).toLocaleDateString()}</p>
                      <p className="font-bold">High: {Math.round(item.max)}°F</p>
                      <p className="font-bold">Low: {Math.round(item.min)}°F</p>
                      <p>{item.weather}</p>
                  </div>
                  ))}
              </div>
              </div>
          )}
        </div>
        <div className="map-container" style={{ height: '400px', width: '100%' }}>
          <MapContainer center={[latitude, longitude]} zoom={6} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TileLayer
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`}
              attribution='&copy; OpenWeatherMap'
            />
            <SetViewOnClick coords={[latitude, longitude]} />
          </MapContainer>
        </div>
      </div>
      {weatherData && (
        <WeatherCard data={weatherData} addToFavorites={() => {}} isFavorite={false} />
      )}
    </div>
  );
}

export default Details;
