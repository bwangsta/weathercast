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
} from "../helper.js"

function DailyForecast(props) {
    const { time, weathercode, temperature_2m_min, temperature_2m_max } = props.weatherData.daily

    const dailyWeather = [];
    for (let i = 1; i < time.length; i++) {
        dailyWeather.push(
            <SwiperSlide key={time[i]}>
                <ForecastCard
                    weekday={getDatetime(time[i]).weekday}
                    icon={selectWeatherIcon(weathercode[i])}
                    description={selectDescription(weathercode[i])}
                    low_temp={convertTemperature(temperature_2m_min[i])}
                    high_temp={convertTemperature(temperature_2m_max[i])}
                />
            </SwiperSlide>
        )
    }
    return (
        <Swiper
            freeMode={true}
            grabCursor={true}
            modules={[FreeMode, Pagination]}
            spaceBetween={16}
            slidesPerView={4}
            breakpoints={{
                320: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                640: {
                    slidesPerView: 4,
                    spaceBetween: 30
                },
                // when window width is >= 640px
                1000: {
                    slidesPerView: 6,
                    spaceBetween: 40
                }
            }}
        >
            {dailyWeather}
        </ Swiper >

        // className="daily-forecast"
    )
}

export default DailyForecast