import ForecastCard from "./ForecastCard"
import {
    selectWeatherIcon,
    convertTemperature,
    getDatetime,
    selectDescription,
} from "../helper.js"

function DailyForecast(props) {
    const { time, weathercode, temperature_2m_min, temperature_2m_max } = props.weatherData.daily

    const dailyWeather = [];
    for (let i = 1; i < time.length; i++) {
        dailyWeather.push(
            <ForecastCard
                key={time[i]}
                weekday={getDatetime(time[i]).weekday}
                icon={selectWeatherIcon(weathercode[i])}
                description={selectDescription(weathercode[i])}
                low_temp={convertTemperature(temperature_2m_min[i])}
                high_temp={convertTemperature(temperature_2m_max[i])}
            />
        )
    }
    return (
        <div className="daily-forecast">
            {dailyWeather}
        </div>
    )
}

export default DailyForecast