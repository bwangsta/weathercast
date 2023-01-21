import SearchError from "./SearchError"

function Searchbar() {
    return (
        <form noValidate role="search">
            <input
                type="search"
                placeholder="Location Name"
                id="searchbar"
                name="q"
                aria-label="Search for location"
                minLength={2}
                maxLength={60}
                required
            />
            <SearchError />
            <button type="submit">
                <i className="bi bi-search"></i>
            </button>
        </form>
    )
}

export default Searchbar