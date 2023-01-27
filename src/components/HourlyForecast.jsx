import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import ForecastCard from "./ForecastCard"
import {
  selectWeatherIcon,
  convertTemperature,
  getDatetime,
  selectDescription,
  hasTimePassed,
} from "../helper.js"

function HourlyForecast(props) {
  const { time, weathercode, temperature_2m } = props.hourlyData

  const hourlyWeather = []
  let i = 0

  // only displays the weather for the next 24 hours based on current time
  while (hourlyWeather.length < 24) {
    if (hasTimePassed(time[i], props.timezone)) {
      hourlyWeather.push(
        <SwiperSlide key={time[i]}>
          <ForecastCard
            datetime={getDatetime(time[i]).time}
            icon={selectWeatherIcon(weathercode[i])}
            description={selectDescription(weathercode[i])}
            temp={convertTemperature(temperature_2m[i])}
            metric={props.metric}
            temperatureSymbol={props.temperatureSymbol}
          />
        </SwiperSlide>
      )
    }
    i++
  }

  return (
    <Swiper
      freeMode={true}
      grabCursor={true}
      modules={[FreeMode, Pagination]}
      spaceBetween={16}
      slidesPerView={6}
      breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 16
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 16
        },
        // when window width is >= 640px
        1000: {
          slidesPerView: 6,
          spaceBetween: 16
        }
      }}
    >
      {hourlyWeather}
    </ Swiper >
  )
}

export default HourlyForecast