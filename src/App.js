import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = '64dc4890f867cccb832ec3a41a31b20e'; 

const App = () => {
   const [location, setLocation] = useState('');
   const [weatherData, setWeatherData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
      setWeatherData(response.data);
    } catch (error) {
      setError('Location not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='q'> 
        <div className="w">
          <h1  className='e'>Weather Application</h1>
          <input
          className='r'
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter location"
          />
          <button className='t' onClick={fetchWeatherData}>Get Weather</button>

          {loading && <p>Loading...</p>}

          {error && <p>{error}</p>}

          {weatherData && (
            <div className='y'>
              <h2>{weatherData.name}</h2>
              <p>Temperature: {weatherData.main.temp} °C</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
