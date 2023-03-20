function SearchResults(props) {
  const results = props.geoData.map((location, index) => {
    const { id, name, admin1, country } = location
    return (
      <li key={id} onClick={() => props.handleClick(index)}>
        {name}, {admin1} {country}
      </li>
    )
  })

  return <ul className="search-results">{results}</ul>
}

export default SearchResults
