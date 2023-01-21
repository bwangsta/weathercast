import DailyForecast from "./DailyForecast"

function Forecast() {
    return (
        <div className="forecast">
            <button type="button">Daily</button>
            <button type="button">Hourly</button>
            <DailyForecast />
        </div>
    )
}

export default Forecast