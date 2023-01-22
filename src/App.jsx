import './App.css'
import { geoAPI, weatherAPI } from "./test-data";
import Navbar from "./components/Navbar"
import Location from "./components/Location";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import Footer from "./components/Footer"

function App() {
    const geoData = geoAPI.results
    const daily = weatherAPI.daily

    return (
        <>
            <Navbar geoData={geoData} />
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
