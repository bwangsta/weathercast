import {
  selectWeatherIcon,
  convertTemperature,
  getDatetime,
  selectBackgroundImage,
  selectDescription,
} from "../helper.js"

function Weather(props) {
  const { temperature, weathercode, time } = props.weatherData.current_weather
  const { date, weekday } = getDatetime(time, props.weatherData.timezone)
  const { temperature_2m_min, temperature_2m_max } = props.weatherData.daily

  const root = document.querySelector("#root")
  root.style.backgroundImage = `url(${selectBackgroundImage(weathercode)})`

  return (
    <div className="weather">
      <p className="weather__date">{date}</p>
      <p className="weather__weekday">{weekday}</p>
      <div className="weather__current">
        <i className={`weather__icon bi ${selectWeatherIcon(weathercode)}`}></i>
        <p className="weather__temperature">
          {`${convertTemperature(temperature)} ${props.temperatureSymbol}`}
        </p>
      </div>
      <p className="weather__description">
        {selectDescription(weathercode)}
      </p>
      <div className="weather__low-high">
        <p className="weather__low">
          {`L:${convertTemperature(temperature_2m_min[0])} ${props.temperatureSymbol}`}
        </p>
        <p className="weather__high">
          {`H:${convertTemperature(temperature_2m_max[0])} ${props.temperatureSymbol}`}
        </p>
      </div>
    </div>
  )
}

export default Weather