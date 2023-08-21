import { useEffect, useState } from 'react'
import './HourForecast.css'
import axios from 'axios'
import Hour from './Hour'
import hourForecast from '/src/Hourforecast.json'

export default function HourForecast() {
  const [hourData, setHourData] = useState([
    {
      time: '',
      symbol: '',
      temperature: '',
      precipProb: '',
    },
  ])
  const [isDown, setIsDown] = useState(false)

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

  const hourDataArr = hourData.map((data) => {
    return <Hour key={hourData.indexOf(data)} time={data.time} weather={data.symbol} temp={data.temperature} precipProb={data.precipProb} />
  })

  const [startX, setStartX] = useState(0)
  const [currentScroll, setCurrentScroll] = useState(0)
  const panel = document.querySelector('.HourForecast')

  function onMouseDown(event) {
    setIsDown(true)
    setStartX(event.pageX - panel.getBoundingClientRect().left)
    setCurrentScroll(panel.scrollLeft)
  }

  function onMouseLeave() {
    setIsDown(false)
  }

  function onMouseUp() {
    setIsDown(false)
  }

  function onMouseMove(event) {
    if (!isDown) return
    const x = event.pageX - panel.getBoundingClientRect().left
    panel.scrollLeft = currentScroll - (x - startX)
  }

  return (
    <div className={`HourForecast subFrame ${isDown ? 'Down' : ''}`} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}>
      {hourDataArr}
    </div>
  )
}
