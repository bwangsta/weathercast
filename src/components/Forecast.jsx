import { useState } from "react"
import DailyForecast from "./DailyForecast"
import HourlyForecast from "./HourlyForecast"

function Forecast(props) {
  const [metric, setMetric] = useState("daily")

  return (
    <section className="forecast">
      <div className="forecast__btns">
        <button
          type="button"
          className={`daily-btn ${metric === "daily" ? "active" : ""}`}
          onClick={() => setMetric("daily")}
        >
          Daily
        </button>
        <button
          type="button"
          className={`hourly-btn ${metric === "hourly" ? "active" : ""}`}
          onClick={() => setMetric("hourly")}
        >
          Hourly
        </button>
      </div>
      {metric === "daily" ? (
        <DailyForecast
          dailyData={props.weatherData.daily}
          metric={metric}
          temperatureSymbol={props.temperatureSymbol}
        />
      ) : (
        <HourlyForecast
          hourlyData={props.weatherData.hourly}
          timezone={props.weatherData.timezone}
          metric={metric}
          temperatureSymbol={props.temperatureSymbol}
        />
      )}
    </section>
  )
}

export default Forecast
