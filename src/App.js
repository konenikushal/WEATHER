import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Details from './Details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/details/:latitude/:longitude" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
