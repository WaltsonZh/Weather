import { useEffect, useState } from 'react'
import pin from '/images/pin.svg'
import axios from 'axios'
import currentWeather from '/src/data/currentWeather.json'

export default function Current() {
  const [coords, setCoords] = useState({ lat: '24.9865848', lon: '121.2878685', current: false })
  const [city, setCity] = useState({ City: 'Taoyuan', TimeZoneId: 'Asia/Taipei' })
  const [weather, setWeather] = useState(currentWeather.current)

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({ code: 0, message: 'Geolocation not available in current browser' })
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError)

    // const fetchCity = async () => {
    //   const option = {
    //     method: 'GET',
    //     url: '/.netlify/functions/reverse-geocoding',
    //     params: { lat: coords.lat, lon: coords.lon },
    //   }
    //   const { data } = await axios.request(option)
    //   setCity(data[0])
    // }

    // fetchCity().catch((error) => console.log(error))

    // const fetchCurrentWeather = async () => {
    //   const option = {
    //     method: 'GET',
    //     url: '/.netlify/functions/fetch-current-weather',
    //     param: { location: city.City, timezone: TimeZoneId },
    //   }

    //   const { data } = await axios.request(option)
    //   setWeather(data.current)
    // }

    // fetchCurrentWeather().catch((error) => console.log(error))
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
      try {
        const { locationData } = await axios.get('https://location.services.mozilla.com/v1/geolocate?key=test')
        setCoords({
          lat: locationData.location.lat,
          lon: locationData.location.lng,
          current: true,
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log(error)
      setCoords((prevCoords) => ({
        ...prevCoords,
        current: false,
      }))
    }
  }

  return (
    <div className='Current'>
      <div className='current-location'>
        {coords.current && <img className='location-icon' src={pin} />}
        <p className='location'>{city.City}</p>
      </div>
      <div className='current-weather'>
        <p className='current-temp'>{weather.temperature}&deg;C</p>
        <p className='current-env'>{weather.symbolPhrase[0].toUpperCase() + weather.symbolPhrase.slice(1)}</p>
      </div>
      <img className='current-img' src={`/images/weather/${weather.symbol}.png`} />
    </div>
  )
}
