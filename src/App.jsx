import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

import "./App.css"
import Navbar from "./components/Navbar"
import Location from "./components/Location"
import Weather from "./components/Weather"
import Forecast from "./components/Forecast"
import Footer from "./components/Footer"
import useGeocode from "./hooks/useGeocode"

function App() {
  const [locationText, setLocationText] = useState("")
  const [weatherData, setWeatherData] = useState({})
  const [temperatureUnit, setTemperatureUnit] = useState("fahrenheit")
  const [status, setStatus] = useState("empty")
  const [error, setError] = useState("")
  const [searchError, setSearchError] = useState("")
  const [isLoading, setLoading] = useState(false)
  const geoData = useGeocode(
    locationText,
    status,
    setError,
    setStatus,
    setSearchError
  )
  const indexRef = useRef(0)

  useEffect(() => {
    if (status === "submitted") {
      fetchWeather(indexRef.current)
    }
  }, [temperatureUnit])

  // get weather data from API
  async function fetchWeather(index) {
    setLoading(true)
    try {
      const { latitude, longitude } = geoData[index]
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weathercode&current_weather=true&timezone=auto&temperature_unit=${temperatureUnit}`
      )
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  // when user hits submit in search input
  // automatically retrieve top search result
  function handleSubmit(event) {
    event.preventDefault()
    if (status === "typing") {
      indexRef.current = 0
      fetchWeather(indexRef.current)
      setLocationText("")
      setStatus("submitted")
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
    setStatus("submitted")
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
        searchError={searchError}
        temperatureUnit={temperatureUnit}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClick={handleClick}
        handleUnitClick={handleUnitClick}
        weatherData={weatherData}
      />
      <main>
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
