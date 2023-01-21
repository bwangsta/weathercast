import Searchbar from "./Searchbar"

function Navbar() {
    return (
        <nav className="navbar">
            <button className="unit-btn">F°</button>
            <Searchbar />
            <button className="volume-btn"><i className="bi bi-volume-up"></i></button>
        </nav>
    )
}

export default Navbar