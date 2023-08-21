import React from 'react'
import icon from '/images/search-icon.svg'
import './Frame.css'

export default function Searchbar() {
  return (
    <React.Fragment>
      <input className='searchBox' type='text' placeholder='Enter Location...' />
      <button className='searchBtn'>
        <img src={icon} />
      </button>
    </React.Fragment>
  )
}
