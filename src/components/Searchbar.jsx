import SearchError from "./SearchError"
import SearhResults from "./SearchResults"

function Searchbar(props) {
  return (
    <form
      noValidate
      role="search"
      className="search-form"
      onSubmit={(e) => props.handleSubmit(e)}
    >
      <div className="search__icon">
        <i className="bi bi-search"></i>
      </div>
      <input
        type="search"
        placeholder="Search..."
        id="searchbar"
        className={`search__input ${props.status === "error" ? "invalid" : ""}`}
        name="q"
        aria-label="Search for location"
        minLength={2}
        maxLength={60}
        size={60}
        required
        onChange={(e) => props.handleChange(e)}
        value={props.locationText}
      />
      {props.status === "error" && (
        <SearchError searchError={props.searchError} />
      )}
      {props.status === "typing" && (
        <SearhResults geoData={props.geoData} handleClick={props.handleClick} />
      )}
    </form>
  )
}

export default Searchbar
