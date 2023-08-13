import React from 'react'
import './Frame.css'
import Searchbar from './Searchbar'
import Current from './Current'

export default function Frame() {
    return (
        <section className='Frame'>
            <Searchbar />
            <Current />
        </section>
    )
}