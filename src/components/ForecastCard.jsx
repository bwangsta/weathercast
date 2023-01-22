function ForecastCard(props) {
    return (
        <div className="card">
            <p className="card__title">{props.weekday}</p>
            <i className={`bi ${props.icon}`}></i>
            <p className="card__description">{props.description}</p>
            <div className="card__low-high">
                <p className="card__low">L:{props.low_temp}</p>
                <p className="card__high">H:{props.high_temp}</p>
            </div>
        </div>
    )
}

export default ForecastCard