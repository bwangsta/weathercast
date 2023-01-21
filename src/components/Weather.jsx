function Weather() {
    return (
        <div className="weather">
            <p className="weather__date">January 14, 2023</p>
            <p className="weather__weekday">Sunday</p>
            <div className="weather__current">
                <i className="weather__icon bi bi-cloudy"></i>
                <p className="weather__temperature">81°F</p>
            </div>
            <p className="weather__description">Cloudy</p>
            <div className="weather__low-high">
                <p className="weather__low">L:65°F</p>
                <p className="weather__high">H:85°F</p>
            </div>
        </div>
    )
}

export default Weather