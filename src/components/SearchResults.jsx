function SearchResults(props) {
  const results = []
  for (let i = 0; i < props.geoData.length; i++) {
    const { id, name, admin1, country } = props.geoData[i]
    results.push(
      <li
        key={id}
        data-index={i}
        onClick={props.handleClick}
      >
        {name}, {admin1} {country}
      </li>
    )
  }

  return (
    <ul className="search-results">
      {results}
    </ul>
  )
}

export default SearchResults