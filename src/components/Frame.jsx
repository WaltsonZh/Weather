import './Frame.css'
import Searchbar from './Searchbar'
import Current from './Current'
import HourForecast from './HourForecast'
import DailyForecast from './DailyForecast'
import Addition from './Addition'
import currentWeather from '/src/data/currentWeather.json'
import locationData from '/src/data/locationData.json'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Frame() {
  const [city, setCity] = useState({ City: 'Taoyuan', TimeZoneId: 'Asia/Taipei' })
  const [coords, setCoords] = useState({ lat: '24.9865848', lon: '121.2878685', current: false })
  const [weather, setWeather] = useState(currentWeather.current)

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({ code: 0, message: 'Geolocation not available in current browser' })
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError)

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
          const { data } = await axios.get('https://location.services.mozilla.com/v1/geolocate?key=test')
          setCoords({
            lat: data.location.lat,
            lon: data.location.lng,
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

    // const reverseGeocoding = async () => {
    //   const option = {
    //     method: 'GET',
    //     url: '/.netlify/functions/reverse-geocoding',
    //     params: { lat: coords.lat, lon: coords.lon },
    //   }
    //   const { data } = await axios.request(option)
    //   setCity(data[0])
    // }

    // reverseGeocoding().catch((error) => console.log(error))

    // const fetchLocationData = async () => {
    //   const option = {
    //     method: 'GET',
    //     url: '/.netlify/functions/fetch-location-data',
    //     params: { location: city.City }
    //   }

    //   const { data } = await axios.request()
    //   setCity((prevCity) => {
    //     return {
    //       ...prevCity,
    //       id: data.location[0].id
    //     }
    //   })
    // }

    // fetchLocationData().catch((error) => console.log(error))

    setCity((prevCity) => {
      return {
        ...prevCity,
        id: locationData.locations[0].id,
      }
    })

    // const fetchCurrentWeather = async () => {
    //   const option = {
    //     method: 'GET',
    //     url: '/.netlify/functions/fetch-current-weather',
    //     param: { location: city.id, timezone: TimeZoneId },
    //   }
    //   const { data } = await axios.request(option)
    //   setWeather(data.current)
    // }
    // fetchCurrentWeather().catch((error) => console.log(error))
  }, [])

  return (
    <main className='Frame'>
      <Searchbar />
      <Current city={city} coords={coords} weather={weather} />
      <HourForecast />
      <Addition humidity={weather.temperature} wind={{ speed: weather.windSpeed, dir: weather.windDirString }} UVI={weather.uvIndex} sun={weather.symbol[0] === 'n' ? { phrase: 'Sun Rise', time: 'time' } : { phrase: 'Sun Set', time: 'time' }} sunrsTime={'time'} />
      <DailyForecast />
    </main>
  )
}
