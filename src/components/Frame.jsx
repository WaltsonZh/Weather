import React from 'react'
import './Frame.css'
import Searchbar from './Searchbar'
import Current from './Current'
import HourForecast from './HourForecast'

export default function Frame() {
  return (
    <main className='Frame'>
      <Searchbar />
      <Current />
      <HourForecast />
    </main>
  )
}
