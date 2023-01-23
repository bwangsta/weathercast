import Searchbar from "./Searchbar"

function Navbar(props) {
    return (
        <nav className="navbar">
            <button className="unit-btn">F°</button>
            <Searchbar geoData={props.geoData} locationText={props.locationText} handleChange={props.handleChange} handleSubmit={props.handleSubmit} />
            <button className="volume-btn"><i className="bi bi-volume-up"></i></button>
        </nav>
    )
}

export default Navbar