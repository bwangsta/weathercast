import DailyForecast from "./DailyForecast"

function Forecast(props) {
    return (
        <div className="forecast">
            <button type="button">Daily</button>
            <button type="button">Hourly</button>
            <DailyForecast weatherData={props.weatherData} />
        </div>
    )
}

export default Forecast