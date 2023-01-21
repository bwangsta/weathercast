function ForecastCard() {
    return (
        <div className="card">
            <p className="card__title">Monday</p>
            <i className="bi bi-cloudy"></i>
            <p className="card__description">Cloudy</p>
            <div className="card__low-high">
                <p className="card__low">L:65°F</p>
                <p className="card__high">H:85°F</p>
            </div>
        </div>
    )
}

export default ForecastCard