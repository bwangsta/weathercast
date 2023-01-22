import DailyForecast from "./DailyForecast"

function Forecast(props) {
    return (
        <div className="forecast">
            <button type="button">Daily</button>
            <button type="button">Hourly</button>
            <DailyForecast daily={props.daily} />
        </div>
    )
}

export default Forecast