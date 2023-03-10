import { useState } from "react"
import { motion } from "framer-motion"

import { selectWeatherSound } from "../helper"
import Searchbar from "./Searchbar"

function Navbar(props) {
  const [soundEffect, setSoundEffect] = useState({
    icon: "bi-volume-mute",
    muted: true,
  })

  let sound
  let temperatureSymbol = props.temperatureUnit === "fahrenheit" ? "°F" : "°C"

  if (props.status === "submitted") {
    const weatherCode = props.weatherData.current_weather.weathercode
    sound = selectWeatherSound(weatherCode)
  }

  // toggle muted audio
  function handleVolumeClick() {
    setSoundEffect((prevSoundEffect) => {
      if (prevSoundEffect.muted) {
        return { icon: "bi-volume-up", muted: false }
      } else {
        return { icon: "bi-volume-mute", muted: true }
      }
    })
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
          <i className={`bi ${soundEffect.icon}`}></i>
          <audio src={sound} autoPlay muted={soundEffect.muted} loop></audio>
        </motion.button>
      )}
      <Searchbar
        geoData={props.geoData}
        locationText={props.locationText}
        status={props.status}
        errorType={props.errorType}
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
