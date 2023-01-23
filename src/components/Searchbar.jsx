import SearchError from "./SearchError"
import SearhResults from "./SearchResults"

function Searchbar(props) {
    return (
        <form noValidate role="search" className="search-form" onSubmit={(e) => props.handleSubmit(e)}>
            <input
                type="search"
                placeholder="Location Name"
                id="searchbar"
                className="searchbar"
                name="q"
                aria-label="Search for location"
                minLength={2}
                maxLength={60}
                required
                onChange={(e) => props.handleChange(e.target.value)}
                value={props.locationText}
            />
            <SearchError />
            <SearhResults geoData={props.geoData} />
            <button type="submit" className="search-btn">
                <i className="bi bi-search"></i>
            </button>
        </form>
    )
}

export default Searchbar