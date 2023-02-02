import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Pagination } from "swiper"
import { motion } from "framer-motion"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import ForecastCard from "./ForecastCard"
import {
  selectWeatherIcon,
  convertTemperature,
  getDatetime,
  selectDescription,
} from "../helper.js"

function DailyForecast(props) {
  const { time, weathercode, temperature_2m_min, temperature_2m_max } = props.dailyData

  const dailyWeather = [];
  for (let i = 1; i < time.length; i++) {
    dailyWeather.push(
      <SwiperSlide key={time[i]}>
        <ForecastCard
          datetime={getDatetime(time[i]).weekday}
          icon={selectWeatherIcon(weathercode[i])}
          description={selectDescription(weathercode[i])}
          low_temp={convertTemperature(temperature_2m_min[i])}
          high_temp={convertTemperature(temperature_2m_max[i])}
          metric={props.metric}
          temperatureSymbol={props.temperatureSymbol}
        />
      </SwiperSlide>
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Swiper
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode, Pagination]}
        spaceBetween={16}
        slidesPerView={6}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 8
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 16
          },
          1000: {
            slidesPerView: 6,
            spaceBetween: 16
          }
        }}
      >
        {dailyWeather}
      </ Swiper >
    </motion.div>
  )
}

export default DailyForecast