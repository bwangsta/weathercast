import { useState } from "react"
import { motion } from "framer-motion"

import { selectWeatherSound } from "../helper"
import Searchbar from "./Searchbar"

function Navbar(props) {
  const [isMuted, setMuted] = useState(true)

  let sound
  let temperatureSymbol = props.temperatureUnit === "fahrenheit" ? "°F" : "°C"
  let volumeIcon = isMuted ? "bi-volume-mute" : "bi-volume-up"

  if (props.status === "submitted") {
    const weatherCode = props.weatherData.current_weather.weathercode
    sound = selectWeatherSound(weatherCode)
  }

  // toggle muted audio
  function handleVolumeClick() {
    setMuted((prevMuted) => !prevMuted)
  }

  return (
    <nav className="navbar">
      {props.status === "submitted" && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className="volume-btn"
          onClick={handleVolumeClick}
        >
          <i className={`bi ${volumeIcon}`}></i>
          <audio src={sound} autoPlay muted={isMuted} loop></audio>
        </motion.button>
      )}
      <Searchbar
        geoData={props.geoData}
        locationText={props.locationText}
        status={props.status}
        searchError={props.searchError}
        handleChange={props.handleChange}
        handleSubmit={props.handleSubmit}
        handleClick={props.handleClick}
      />
      {props.status === "submitted" && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className="unit-btn"
          onClick={props.handleUnitClick}
        >
          {temperatureSymbol}
        </motion.button>
      )}
    </nav>
  )
}

export default Navbar
