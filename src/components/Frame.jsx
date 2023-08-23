import './Frame.css'
import Searchbar from './Searchbar'
import Current from './Current'
import HourForecast from './HourForecast'
import DailyForecast from './DailyForecast'

export default function Frame() {
  return (
    <main className='Frame'>
      <Searchbar />
      <Current />
      <HourForecast />
      <DailyForecast />
    </main>
  )
}
