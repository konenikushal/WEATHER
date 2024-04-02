import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import citiesData from './data/citiesData.json';

function Landing() {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="app p-4">
      <div className="search my-4 relative">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter Location"
          type="text"
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
    </div>
  );
}

export default Landing;
