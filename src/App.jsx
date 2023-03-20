import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

import "./App.css"
import Navbar from "./components/Navbar"
import Location from "./components/Location"
import Weather from "./components/Weather"
import Forecast from "./components/Forecast"
import Footer from "./components/Footer"

function App() {
  const [locationText, setLocationText] = useState("")
  const [geoData, setGeoData] = useState([])
  const [weatherData, setWeatherData] = useState({})
  const [temperatureUnit, setTemperatureUnit] = useState("fahrenheit")
  const [status, setStatus] = useState("empty")
  const [errorType, setErrorType] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const indexRef = useRef(0)

  const controller = new AbortController()

  useEffect(() => {
    if (status !== "empty") {
      if (locationText.length === 0) {
        setStatus("error")
        setErrorType("Please enter a location")
      } else if (locationText.length === 1) {
        setStatus("error")
        setErrorType("Location name should be at least 2 characters")
      } else {
        fetchGeocode()
      }
    }
    return () => {
      controller.abort()
    }
  }, [locationText])

  useEffect(() => {
    if (status === "submitted") {
      fetchWeather(indexRef.current)
    }
  }, [temperatureUnit])

  // get location data from API
  async function fetchGeocode() {
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${locationText}&count=10`,
        { signal: controller.signal }
      )
      const data = await response.json()
      if (data.results !== undefined) {
        setGeoData(data.results)
      } else {
        setStatus("error")
        setErrorType(
          "Unable to find the location. Please enter a different location"
        )
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error)
      }
    }
    setIsLoading(false)
  }

  // get weather data from API
  async function fetchWeather(index) {
    setIsLoading(true)
    try {
      const { latitude, longitude } = geoData[index]
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weathercode&current_weather=true&timezone=auto&temperature_unit=${temperatureUnit}`
      )
      const data = await response.json()
      setWeatherData(data)
      setStatus("submitted")
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
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
  function handleClick(index) {
    indexRef.current = index
    fetchWeather(indexRef.current)
    setLocationText("")
  }

  function handleUnitClick() {
    setTemperatureUnit((prevUnit) =>
      prevUnit === "fahrenheit" ? "celsius" : "fahrenheit"
    )
  }

  return (
    <div className="App container">
      <Navbar
        geoData={geoData}
        locationText={locationText}
        status={status}
        errorType={errorType}
        temperatureUnit={temperatureUnit}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClick={handleClick}
        handleUnitClick={handleUnitClick}
        weatherData={weatherData}
      />
      <main id="content">
        {status === "submitted" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <section className="hero">
              <Location geoData={geoData[indexRef.current]} />
              <Weather weatherData={weatherData} />
            </section>
            <Forecast weatherData={weatherData} />
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
