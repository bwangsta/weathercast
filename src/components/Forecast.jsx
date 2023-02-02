import { useState } from "react"
import { motion } from "framer-motion"
import DailyForecast from "./DailyForecast"
import HourlyForecast from "./HourlyForecast"

function Forecast(props) {
  const [metric, setMetric] = useState("daily")

  return (
    <section className="forecast container">
      <div className="forecast__btns">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className={`daily-btn ${metric === "daily" ? "active" : ""}`}
          onClick={() => setMetric("daily")}
        >
          Daily
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className={`hourly-btn ${metric === "hourly" ? "active" : ""}`}
          onClick={() => setMetric("hourly")}
        >
          Hourly
        </motion.button>
      </div>
      {
        metric === "daily" ?
          <DailyForecast
            dailyData={props.weatherData.daily}
            metric={metric}
            temperatureSymbol={props.temperatureSymbol}
          /> :
          <HourlyForecast
            hourlyData={props.weatherData.hourly}
            timezone={props.weatherData.timezone}
            metric={metric}
            temperatureSymbol={props.temperatureSymbol}
          />
      }
    </section >
  )
}

export default Forecast