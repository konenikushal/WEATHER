import React, { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherCard from './WeatherCard'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [favorites, setFavorites] = useState([])
  const defaultLocation = 'Charlotte'

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
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <WeatherCard data={data} addToFavorites={addToFavorites} isFavorite={isFavorite} />
      </div>
      <div>
        <h2>Favorites:</h2>
        <ul>
          {favorites.map((city, index) => (
            <li key={index}>{city}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

