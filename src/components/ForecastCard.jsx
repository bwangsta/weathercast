function ForecastCard(props) {
  return (
    <div className="card">
      <p className="card__title">{props.datetime}</p>
      <i className={`bi ${props.icon} card__icon`}></i>
      <p className="card__description">{props.description}</p>
      {props.metric === "hourly" ?
        <p className="card__temperature">{props.temp}</p> :

        <div className="card__low-high">
          <p className="card__low">L:{props.low_temp}</p>
          <p className="card__high">H:{props.high_temp}</p>
        </div>
      }
    </div>
  )
}

export default ForecastCard