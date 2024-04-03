import React from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import Landing from './Landing';
import Details from './Details';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router> {/* Use BrowserRouter for most web applications */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/details/:latitude/:longitude" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
