import Searchbar from "./Searchbar"

function Navbar(props) {
  return (
    <nav className="navbar">
      <button
        className="unit-btn"
        onClick={props.handleUnitClick}
      >
        {props.temperatureSymbol}
      </button>
      <Searchbar
        geoData={props.geoData}
        locationText={props.locationText}
        status={props.status}
        errorType={props.errorType}
        handleChange={props.handleChange}
        handleSubmit={props.handleSubmit}
        handleClick={props.handleClick}
      />
      <button className="volume-btn">
        <i className="bi bi-volume-up"></i>
      </button>
    </nav>
  )
}

export default Navbar