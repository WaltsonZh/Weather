import { useEffect, useState } from 'react'
import './HourForecast.css'
import axios from 'axios'
import Hour from './Hour'
import hourForecast from '/src/Hourforecast.json'

export default function HourForecast() {
    const [hourData, setHourData] = useState([
        {
            time: 'time',
            symbol: 'symbol',
            temperature: 'temperature',
            precipProb: 'precipProb',
        },
    ])

    useEffect(() => {
        // const fetchData = async () => {
        //     const options = {
        //         method: 'GET',
        //         url: '/.netlify/functions/fetch-hourly-forecast',
        //         params: {
        //             location: 106696918,
        //             timezone: 'Asia/Taipei',
        //         },
        //     }

        //     const { data } = await axios.request(options)
        //     console.log(data)
        //     setHourData(data.forecast)
        // }

        // fetchData().catch((error) => console.error(error))

        setHourData(hourForecast)
    }, [])

    return (
        <div className='HourForecast'>
            <Hour time={hourData[0].time} weather={hourData[0].symbol} temp={hourData[0].temperature} precipProb={hourData[0].precipProb} />
        </div>
    )
}
