import React from 'react'
import './Frame.css'
import Searchbar from './Searchbar'
import Current from './Current'
import HourForcast from './HourForcast'

export default function Frame() {
    return (
        <main className='Frame'>
            <Searchbar />
            <Current />
            <HourForcast />
        </main>
    )
}