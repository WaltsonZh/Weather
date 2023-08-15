import React, { useState } from 'react'
import './HourForcast.css'
import HourData from '../../public/HourData'

export default function HourForcast() {
    const [hourData, setHourData] = useState(HourData)

    return(
        <div className="HourForcast">
            
        </div>
    )
}