import React from 'react'
import location from '/images/location.svg'
import sunny from '/images/sunny.svg'

export default function Current() {
    return (
        <div className='Current'>
            <div className='current-location'>
                <img className='location-icon' src={location} />
                <p className='location'>Location</p>
            </div>
            <div className='current-weather'>
                <p className='current-tmp'>18&deg;C</p>
                <p className='current-env'>Sunny</p>
                <p className='current-HL'>22&deg; / 14&deg;</p>
            </div>
            <img className='current-img' src={sunny} />
        </div>
    )
}
