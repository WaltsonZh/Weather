import { useState } from 'react'
import './HourForecast.css'
import Hour from './Hour'

export default function HourForecast({ hourData }) {
  const [isDown, setIsDown] = useState(false)

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
