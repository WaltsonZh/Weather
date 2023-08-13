import React from 'react'
import location from '/images/location.svg'

export default function Current() {
    return (
        <React.Fragment>
            <div className='current-location'>
                <img className='location-icon' src={location} />
                <p className='location'>Location</p>
            </div>
        </React.Fragment>
    )
}
