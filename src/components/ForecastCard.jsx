function ForecastCard(props) {
  return (
    <div className="card">
      <p className="card__title">{props.datetime}</p>
      <i className={`bi ${props.icon} card__icon`}></i>
      <p className="card__description">{props.description}</p>
      {props.metric === "hourly" ?
        <p>{`${props.temp} ${props.temperatureSymbol}`}</p> :

        <div className="card__low-high">
          <p className="card__low">{`L:${props.low_temp} ${props.temperatureSymbol}`}</p>
          <p className="card__high">{`H:${props.high_temp} ${props.temperatureSymbol}`}</p>
        </div>
      }
    </div>
  )
}

export default ForecastCard