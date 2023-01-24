import DailyForecast from "./DailyForecast"

function Forecast(props) {
    return (
        <div className="forecast container">
            <div className="forecast__btns">
                <button type="button" className="daily-btn">Daily</button>
                <button type="button" className="hourly-btn">Hourly</button>
            </div>
            <DailyForecast weatherData={props.weatherData} />
        </div>
    )
}

export default Forecast