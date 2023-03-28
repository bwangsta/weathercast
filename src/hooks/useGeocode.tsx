import { useState, useEffect } from "react"

function useGeocode(locationText, status, setError, setStatus, setSearchError) {
  const [geoData, setGeoData] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    if (status === "typing") {
      if (locationText.length === 0) {
        setStatus("error")
        setSearchError("Please enter a location")
      } else if (locationText.length === 1) {
        setStatus("error")
        setSearchError("Location name should be at least 2 characters")
      } else {
        fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${locationText}`,
          { signal: controller.signal }
        )
          .then((response) => {
            if (!response.ok) {
              setError(true)
              return
            }
            return response.json()
          })
          .then((data) => {
            if (data.results !== undefined) {
              setGeoData(data.results)
              setSearchError("")
            } else {
              setStatus("error")
              setSearchError(
                "Unable to find the location. Please enter a different location"
              )
            }
          })
          .catch((error) => {
            if (error.name !== "AbortError") {
              setError(true)
              console.error(error)
            }
          })
      }
    }

    return () => {
      controller.abort()
    }
  }, [locationText])

  return geoData
}

export default useGeocode
