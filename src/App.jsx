import { useState, useEffect } from 'react';
import './App.css'
import Navbar from "./components/Navbar"
import Location from "./components/Location";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import Footer from "./components/Footer"
import { geoAPI, weatherAPI } from "./test-data";

function App() {
    const [locationText, setLocationText] = useState("")
    const [locations, setLocations] = useState([])

    const geoData = geoAPI.results
    const daily = weatherAPI.daily

    // get location data from API
    async function fetchGeocode() {
        if (localStorage.getItem(locationText)) {
            const parsedLocations = JSON.parse(localStorage.getItem(locationText))
            setLocations(parsedLocations)
        }
        else {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${locationText}&count=10`)
            const data = await response.json()
            setLocations(data.results)
            localStorage.setItem(locationText, JSON.stringify(data.results))
        }
    }

    // get weather data from API 
    // async function fetchWeather() {
    //     const response = await fetch()
    // }

    useEffect(() => {
        fetchGeocode()
    }, [locationText])

    function handleSubmit(event) {
        event.preventDefault()
        fetchGeocode()
    }

    function handleChange(value) {
        setLocationText(value)
    }

    return (
        <>
            <Navbar geoData={geoData} locationText={locationText} handleChange={handleChange} handleSubmit={handleSubmit} />
            <main id="content">
                <Location geoData={geoData} />
                <Weather weatherData={weatherAPI} />
                <Forecast daily={daily} />
            </main>
            <Footer />
        </>
    )
}

export default App
