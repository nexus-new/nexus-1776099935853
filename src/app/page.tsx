```javascript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    async function fetchWeatherData() {
      if (location) {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    }

    fetchWeatherData();
  }, [location]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-4 text-center">Ob-havo</h1>

      {weatherData ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="border rounded-2xl p-4 bg-gray-800"
        >
          <h2 className="text-2xl font-semibold">{weatherData.name}, {weatherData.sys.country}</h2>
          <p className="text-lg">Harorat: {weatherData.main.temp}°C</p>
          <p className="text-gray-400">His etiladigan harorat: {weatherData.main.feels_like}°C</p>
          <p className="text-lg">Ob-havo: {weatherData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="Ob-havo ikonkasi"
            className="mx-auto mt-2"
          />
        </motion.div>
      ) : (
        <p className="text-center">Ob-havo ma'lumotlari yuklanmoqda...</p>
      )}
    </motion.div>
  );
}
```