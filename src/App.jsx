import { useState, useEffect, useRef } from 'react';

import './App.css'
import Navbar from "./components/Navbar"
import Location from "./components/Location";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import Footer from "./components/Footer"

function App() {
  const [locationText, setLocationText] = useState("")
  const [geoData, setGeoData] = useState([])
  const [weatherData, setWeatherData] = useState({})
  const [status, setStatus] = useState("empty")
  const indexRef = useRef(0)

  // get location data from API
  async function fetchGeocode() {
    const item = localStorage.getItem(locationText)
    if (item === null) {
      try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${locationText}&count=10`)
        const data = await response.json()
        setGeoData(data.results)
        localStorage.setItem(locationText, JSON.stringify(data.results))
      }
      catch (error) {
        console.log(error)
      }
    }
    else {
      const parsedLocations = JSON.parse(localStorage.getItem(locationText))
      setGeoData(parsedLocations)
    }
  }

  // get weather data from API 
  async function fetchWeather(index) {
    try {
      const { latitude, longitude } = geoData[index]
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto&temperature_unit=fahrenheit`)
      const data = await response.json()
      setWeatherData(data)
      setStatus("submitted")
    }
    catch (error) {
      console.log(error)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    indexRef.current = 0
    fetchWeather(indexRef.current)
    setLocationText("")
  }

  function handleChange(event) {
    setLocationText(event.target.value)
    setStatus("typing")
  }

  // when search result item is clicked on
  function handleClick(event) {
    // retrieve the data-index
    indexRef.current = parseInt(event.target.dataset.index)
    // get the latitude and longitude from geoData based on the index
    // fetch the weather
    fetchWeather(indexRef.current)
    setLocationText("")
  }

  useEffect(() => {
    if (locationText.length > 1) {
      fetchGeocode()
    }
  }, [locationText])


  return (
    <>
      <Navbar
        geoData={geoData}
        locationText={locationText}
        status={status}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClick={handleClick}
      />
      {status === "submitted" &&
        <main id="content">
          <div className="hero container">
            <Location geoData={geoData[indexRef.current]} />
            <Weather weatherData={weatherData} />
          </div>
          <Forecast weatherData={weatherData} />
        </main>
      }
      <Footer />
    </>
  )
}

export default App
