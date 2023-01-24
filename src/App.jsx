import { useState, useEffect, useRef } from 'react';
import './App.css'
import Navbar from "./components/Navbar"
import Location from "./components/Location";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import Footer from "./components/Footer"

function App() {
    const [locationText, setLocationText] = useState("")
    const [geoData, setGeoData] = useState([])
    const [weatherData, setWeatherData] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    // get location data from API
    async function fetchGeocode() {
        const item = localStorage.getItem(locationText)
        if (item === null) {
            try {
                const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${locationText}&count=10`)
                const data = await response.json()
                setGeoData(data.results)
                localStorage.setItem(locationText, JSON.stringify(data.results))
            }
            catch (error) {
                console.log(error)
            }
        }
        else {
            const parsedLocations = JSON.parse(localStorage.getItem(locationText))
            setGeoData(parsedLocations)
        }
    }

    // get weather data from API 
    async function fetchWeather() {
        try {
            const { latitude, longitude } = geoData[0]
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto&temperature_unit=fahrenheit`)
            const data = await response.json()
            setWeatherData(data)
            setHasSubmitted(true)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (locationText.length > 1) {
            fetchGeocode()
        }
    }, [locationText])

    function handleSubmit(event) {
        event.preventDefault()
        fetchWeather()
        setLocationText("")
    }

    function handleChange(event) {
        setLocationText(event.target.value)
        setHasSubmitted(false)
    }

    return (
        <>
            <Navbar geoData={geoData} locationText={locationText} handleChange={handleChange} handleSubmit={handleSubmit} />
            {hasSubmitted &&
                <main id="content">
                    <Location geoData={geoData} />
                    <Weather weatherData={weatherData} />
                    <Forecast weatherData={weatherData} />
                </main>
            }
            <Footer />
        </>
    )
}

export default App
