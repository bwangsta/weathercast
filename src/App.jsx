import "bootstrap-icons/font/bootstrap-icons.css";

import './App.css'
import Navbar from "./components/Navbar"
import Location from "./components/Location";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import Footer from "./components/Footer"

function App() {

    return (
        <>
            <Navbar />
            <main id="content">
                <Location />
                <Weather />
                <Forecast />
            </main>
            <Footer />
        </>
    )
}

export default App
