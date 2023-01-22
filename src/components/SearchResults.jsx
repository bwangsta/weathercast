function SearchResults(props) {
    const searchResults = props.geoData.map(result => {
        return <li key={result.id}>{result.name}, {result.admin1} {result.country_code}</li>
    })
    return (
        <ul className="search-results">
            {searchResults}
        </ul>
    )
}

export default SearchResults