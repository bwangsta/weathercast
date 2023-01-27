import cloudyImg from "./assets/img/cloudy.jpg"
import sunnyImg from "./assets/img/sunny.jpg"
import drizzleImg from "./assets/img/drizzle.jpg"
import rainImg from "./assets/img/rain.jpg"
import snowImg from "./assets/img/snow.jpg"
import thunderstormImg from "./assets/img/thunderstorm.jpg"
import { DateTime } from "luxon";

const weatherDescription = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
}

function getCurrentTime(timezone) {
  const dt = DateTime.now().setZone(timezone)
  return dt.toFormat("tt")
}

function getDatetime(datetime, timezone) {
  const dt = DateTime.fromISO(datetime, { zone: timezone })
  const formattedDatetime = {
    time: dt.toFormat("t"),
    date: dt.toFormat("DDD"),
    weekday: dt.toFormat("EEEE"),
  }

  return formattedDatetime
}

// calculate the different in milliseconds between current time and another time
// returns true if the time has not passed yet
function hasTimePassed(datetime, timezone) {
  const now = DateTime.now().setZone(timezone)
  const dt = DateTime.fromISO(datetime, { zone: timezone })
  const diff = now.diff(dt).toObject()

  return diff.milliseconds < 0
}

function selectWeatherIcon(code) {
  switch (true) {
    case (code === 0):
      return "bi-brightness-high"
    case (code > 0 && code < 4):
      return "bi-clouds"
    case (code > 44 && code < 49):
      return "bi-cloud-fog2"
    case (code > 50 && code < 58):
      return "bi-cloud-drizzle"
    case (code > 60 && code < 68 || code > 79 && code < 83):
      return "bi-cloud-rain"
    case (code > 70 && code < 78 || code > 84 && code < 87):
      return "bi-snow"
    case (code > 94 && code < 100):
      return "bi-cloud-lightning"
    default:
      return "bi-cloudy"
  }
}

function selectBackgroundImage(code) {
  switch (true) {
    case (code === 0):
      return sunnyImg
    case (code > 0 && code < 4):
      return cloudyImg
    case (code > 50 && code < 58):
      return drizzleImg
    case (code > 60 && code < 68 || code > 79 && code < 83):
      return rainImg
    case (code > 70 && code < 78 || code > 84 && code < 87):
      return snowImg
    case (code > 94 && code < 100):
      return thunderstormImg
    default:
      return cloudyImg
  }
}

function selectDescription(code) {
  return weatherDescription[code]
}

function convertTemperature(temp) {
  return `${Math.ceil(temp)}`
}


export {
  selectWeatherIcon,
  convertTemperature,
  getDatetime,
  getCurrentTime,
  hasTimePassed,
  selectBackgroundImage,
  selectDescription,
}