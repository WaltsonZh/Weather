import React from 'react'

export default function Hour({ time, weather, temp, precipProb }) {
    // const hourData = Object.keys(props).map(key =>(
    //     <p key={key}>{props[key]}</p>
    // ))

    let precip = ''
    if (precipProb > 60) {
        precip = 'bigRain'
    } else if (precipProb <= 30) {
        precip = 'noRain'
    } else {
        precip = 'littleRain'
    }

    return (
        <div className='Hour'>
            <p className='time'>{time.slice(11, 16)}</p>
            <img className='weather' src={`/public/images/weather/${weather}.png`} />
            <p className='temp'>{temp}&deg;</p>
            <div className='precip'>
                <img src={`/public/images/${precip}.svg`} />
                <p>{precipProb}%</p>
            </div>
        </div>
    )
}
