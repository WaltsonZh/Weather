import Daily from './Daily'
import './DailyForecast.css'

export default function DailyForecast({ dailyData }) {
  const dailyDataArray = dailyData.map((data) => {
    return <Daily key={dailyData.indexOf(data)} precipProb={data.precipProb} weather={data.symbol} maxtemp={data.maxTemp} mintemp={data.minTemp} date={data.date} />
  })
  return (
    <div className='DailyForecast subFrame'>
      {dailyDataArray}
    </div>
  )
}
