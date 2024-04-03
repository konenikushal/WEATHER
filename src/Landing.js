import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import citiesData from './data/citiesData.json';
import axios from 'axios'
import WeatherCard from './WeatherCard'

function Landing() {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([])
  const defaultLocation = 'Charlotte'
  const [data, setData] = useState({})

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=BLANK`
  const defaultUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=imperial&appid=BLANK`

  useEffect(() => {
    if (location === '') {
      axios.get(defaultUrl).then((response) => {
        setData(response.data)
        console.log(response.data)
      });
    }
  }, [location, defaultLocation]);

  const locations = citiesData.map(([index, country, city, latitude, longitude]) => ({
    label: `${city}, ${country}`,
    value: city,
    latitude,
    longitude
  }));

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
    if (value.length > 0) {
      const filteredSuggestions = locations.filter(({ label }) =>
        label.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (selectedOption) => {
    setLocation(selectedOption.label);
    navigate(`/details/${selectedOption.latitude}/${selectedOption.longitude}`);
  };

  const addToFavorites = () => {
    if (favorites.includes(data.name)) {
      setFavorites(favorites.filter((city) => city !== data.name));
    } else {
      setFavorites([...favorites, data.name]);
    }
  }

  const isFavorite = favorites.includes(data.name);

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app p-4">
      <div className="title my-4">
        <h1 className="text-8xl font-bold text-center text-white">WEATHER SEARCH</h1>
      </div>
      <div className="search my-4 relative">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter Location"
          type="text"
          onKeyPress={searchLocation}
        />
        {suggestions.length > 0 && (
          <div className="suggestions absolute bg-white mt-1 p-2 border rounded shadow-lg w-full">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion cursor-pointer p-2 hover:bg-gray-200"
              >
                {suggestion.label}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="container">
        <WeatherCard data={data} addToFavorites={addToFavorites} isFavorite={isFavorite} />
      </div>
    </div>
  );  
}

export default Landing;
