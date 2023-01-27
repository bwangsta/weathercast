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
  const [temperatureUnit, setTemperatureUnit] = useState({ type: "fahrenheit", symbol: "F°" })
  const [status, setStatus] = useState("empty")
  const [errorType, setErrorType] = useState("")
  const indexRef = useRef(0)

  // get location data from API
  async function fetchGeocode() {
    const item = localStorage.getItem(locationText)
    if (item === null) {
      try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${locationText}&count=10`)
        const data = await response.json()
        if (data.results !== undefined) {
          setGeoData(data.results)
          localStorage.setItem(locationText, JSON.stringify(data.results))
        }
        else {
          setStatus("error")
          setErrorType("Unable to find the location. Please enter a different location")
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    else {
      const parsedLocations = JSON.parse(item)
      setGeoData(parsedLocations)
    }
  }


  // get weather data from API 
  async function fetchWeather(index) {
    try {
      const { latitude, longitude } = geoData[index]
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weathercode&current_weather=true&timezone=auto&temperature_unit=${temperatureUnit.type}`)
      const data = await response.json()
      setWeatherData(data)
      setStatus("submitted")
    }
    catch (error) {
      console.log(error)
    }
  }

  // when user hits submit in search input
  // automatically retrieve top search result
  function handleSubmit(event) {
    event.preventDefault()
    if (status !== "error" && status !== "empty") {
      indexRef.current = 0
      fetchWeather(indexRef.current)
      setLocationText("")
    }
  }

  // when user types something in search input
  function handleChange(event) {
    setLocationText(event.target.value)
    setStatus("typing")
  }

  // when a search result is clicked on
  // retrieve data for that specific location
  function handleClick(event) {
    indexRef.current = parseInt(event.target.dataset.index)
    fetchWeather(indexRef.current)
    setLocationText("")
  }

  function handleUnitClick() {
    setTemperatureUnit(prevUnit => {
      if (prevUnit.type === "fahrenheit") {
        return { type: "celsius", symbol: "C°" }
      }
      else {
        return { type: "fahrenheit", symbol: "F°" }
      }
    })
  }

  useEffect(() => {
    if (status !== "empty") {
      if (locationText.length === 0) {
        setStatus("error")
        setErrorType("Please enter a location")
      }
      else if (locationText.length === 1) {
        setStatus("error")
        setErrorType("Location name should be at least 2 characters")
      }
      else {
        fetchGeocode()
      }
    }
  }, [locationText])

  useEffect(() => {
    if (status !== "empty") {
      fetchWeather(indexRef.current)
    }
  }, [temperatureUnit])

  return (
    <>
      <Navbar
        geoData={geoData}
        locationText={locationText}
        status={status}
        errorType={errorType}
        temperatureSymbol={temperatureUnit.symbol}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClick={handleClick}
        handleUnitClick={handleUnitClick}
      />
      <main id="content">
        {status === "submitted" &&
          <>
            <section className="hero container">
              <Location geoData={geoData[indexRef.current]} />
              <Weather weatherData={weatherData} temperatureSymbol={temperatureUnit.symbol} />
            </section>
            <Forecast weatherData={weatherData} temperatureSymbol={temperatureUnit.symbol} />
          </>
        }
      </main>
      <Footer />
    </>
  )
}

export default App
