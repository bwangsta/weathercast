function Location(props) {
    const { name, admin1, country } = props.geoData[0]
    return (
        <div className="location">
            <h1 className="location__name">{name}</h1>
            <p className="location__state">{admin1}</p>
            <p className="location__country">{country}</p>
        </div>
    )
}

export default Location