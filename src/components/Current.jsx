import { useEffect, useState } from 'react'
import pin from '/images/pin.svg'
import clear from '/images/weather/d000.png'
import axios from 'axios'

export default function Current() {
  const [coords, setCoords] = useState({ lat: '24.9865848', lon: '121.2878685', current: false })

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({ code: 0, message: 'Geolocation not available in current browser' })
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [])

  function onSuccess(position) {
    setCoords({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      current: true,
    })
  }

  async function onError(error) {
    if (error.message === 'The permission was revoked') {
      const { data } = await axios.get('https://location.services.mozilla.com/v1/geolocate?key=test')
      setCoords({
        lat: data.location.lat,
        lon: data.location.lng,
        current: true,
      })
    } else {
      console.log(error)
      setCoords((prevCoords) => ({
        ...prevCoords,
        current: false
      }))
    }
  }

  console.log(coords)

  return (
    <div className='Current'>
      <div className='current-location'>
        {coords.current && <img className='location-icon' src={pin} />}
        <p className='location'>Location</p>
      </div>
      <div className='current-weather'>
        <p className='current-temp'>18&deg;C</p>
        <p className='current-env'>Clear</p>
      </div>
      <img className='current-img' src={clear} />
    </div>
  )
}
