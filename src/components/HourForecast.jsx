import { useEffect, useState } from 'react'
import './HourForecast.css'
import axios from 'axios'
import Hour from './Hour'
import hourForecast from '/public/HourForecast.json'

export default function HourForecast() {
    const [hourData, setHourData] = useState([
        {
            time: 'time',
            weather: 'weather',
            temp: 'temp',
            precipitation: 'precipitation',
        },
    ])

    useEffect(() => {
        // const options = {
        //     method: 'GET',
        //     url: 'http://localhost:8000/hourforecast',
        //     params: {
        //         lat: '24.99',
        //         lon: '121.29',
        //         timezone: 'Asia/Taipei',
        //     },
        // }

        // axios
        //     .request(options)
        //     .then((response) => {
        //         console.log()
        //         setHourData(response.data.timelines.daily)
        //     })
        //     .catch((err) => console.log(err))
        setHourData(hourForecast.timelines.hourly[0])
    }, [])

    return (
        <div className='HourForecast'>
            <Hour
                time={hourData.time}
                weather={hourData.values.weatherCode}
                temp={hourData.values.temperature}
                precipitation={hourData.values.precipitationProbability}
            />
        </div>
    )
}
