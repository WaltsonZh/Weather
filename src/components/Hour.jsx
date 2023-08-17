import React from 'react'

export default function Hour(props) {
    const hourData = Object.keys(props).map(key =>(
        <p key={key}>{props[key]}</p>
    ))

    return (
        <div className='Hour'>
            {hourData}
        </div>
    )
}
