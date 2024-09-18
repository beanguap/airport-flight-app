import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        },
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      // Fetch the weather data
      const apiKey = "66f99f55b8614db47da1a7af94a02a70"; // Replace with your OpenWeatherMap API key
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${apiKey}`;

      axios
        .get(url)
        .then((response) => {
          setWeather(response.data);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Error response:", error.response);
            setError(
              `Error: ${error.response.status} - ${error.response.data.message}`,
            );
          } else if (error.request) {
            // The request was made but no response was received
            console.error("Error request:", error.request);
            setError("Error: No response received from the server.");
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error message:", error.message);
            setError(`Error: ${error.message}`);
          }
          setLoading(false);
        });
    }
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {weather ? (
        <div>
          <h2>Current Weather</h2>
          <p>Location: {weather.name}</p>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <div>No weather data available.</div>
      )}
    </div>
  );
};

export default Weather;
