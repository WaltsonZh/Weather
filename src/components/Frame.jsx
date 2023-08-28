import './Frame.css'
import Searchbar from './Searchbar'
import Current from './Current'
import HourForecast from './HourForecast'
import DailyForecast from './DailyForecast'
import Addition from './Addition'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Frame() {
  const [city, setCity] = useState({ City: '--', TimeZoneId: '--', id: '' })
  const [coords, setCoords] = useState({})
  const [weather, setWeather] = useState({ relHumidity: '--', windSpeed: '--', windDirString: '--', uvIndex: '--', symbol: 'd600', symbolPhrase: '--' })
  const [hourlyWeather, setHourlyWeather] = useState(() => initHourlyWeather())
  const [dailyWeather, setDailyWeather] = useState(() => initDailyWeather())

  // useEffect(() => {
  //   if (!('geolocation' in navigator)) {
  //     onError({ code: 0, message: 'Geolocation not available in current browser' })
  //   }

  //   navigator.geolocation.getCurrentPosition(onSuccess, onError)

  //   function onSuccess(position) {
  //     setCoords({
  //       lat: position.coords.latitude,
  //       lon: position.coords.longitude,
  //       current: true,
  //     })
  //   }

  //   async function onError(error) {
  //     if (error.message === 'The permission was revoked') {
  //       try {
  //         const { data } = await axios.get('https://location.services.mozilla.com/v1/geolocate?key=test')
  //         setCoords({
  //           lat: data.location.lat,
  //           lon: data.location.lng,
  //           current: true,
  //         })
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     } else {
  //       console.log(error)
  //       setCoords((prevCoords) => ({
  //         ...prevCoords,
  //         current: false,
  //       }))
  //     }
  //   }
  // }, [])

  // useEffect(() => {
  //   const reverseGeocoding = async () => {
  //     const options = {
  //       method: 'GET',
  //       url: '/.netlify/functions/reverse-geocoding',
  //       params: { lat: coords.lat, lon: coords.lon },
  //     }
  //     try {
  //       const { data } = await axios.request(options)
  //       setCity((prevCity) => ({
  //         ...prevCity,
  //         City: data[0].City,
  //       }))
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   if (coords.current) {
  //     reverseGeocoding().catch((error) => console.log(error))
  //   }
  // }, [coords])

  // useEffect(() => {
  //   const fetchLocationData = async () => {
  //     const options = {
  //       method: 'GET',
  //       url: '/.netlify/functions/fetch-location-data',
  //       params: { location: city.City },
  //     }

  //     try {
  //       const { data } = await axios.request(options)
  //       setCity((prevCity) => {
  //         return {
  //           ...prevCity,
  //           TimeZoneId: data.locations[0].timezone,
  //           id: data.locations[0].id,
  //         }
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   if (city.City !== '--') {
  //     fetchLocationData().catch((error) => console.log(error))
  //   }
  // }, [city.City])

  // useEffect(() => {
  //   const fetchCurrentWeather = async () => {
  //     const options = {
  //       method: 'GET',
  //       url: '/.netlify/functions/fetch-current-weather',
  //       params: { location: city.id, timezone: city.TimeZoneId },
  //     }
  //     try {
  //       const { data } = await axios.request(options)
  //       setWeather(data.current)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   if (city.id) {
  //     fetchCurrentWeather().catch((error) => console.log(error))
  //   }

  //   const fetchHourlyWeather = async () => {
  //     const options = {
  //       method: 'GET',
  //       url: '/.netlify/functions/fetch-hourly-forecast',
  //       params: {
  //         location: city.id,
  //         timezone: city.TimeZoneId,
  //       },
  //     }
  //     try {
  //       const { data } = await axios.request(options)
  //       setHourlyWeather(data.forecast)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   if (city.id) {
  //     fetchHourlyWeather().catch((error) => console.error(error))
  //   }

  //   const fetchDailyWeather = async () => {
  //     const options = {
  //       method: 'GET',
  //       url: '/.netlify/functions/fetch-daily-forecast',
  //       params: { location: city.id },
  //     }
  //     try {
  //       const { data } = await axios.request(options)
  //       setDailyWeather(data.forecast)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   if (city.id) {
  //     fetchDailyWeather().catch((error) => console.log(error))
  //   }
  // }, [city.id])

  function searchLocation(search) {
    setCity({ City: search })
    setCoords((prevCoords) => {
      return {
        ...prevCoords,
        current: false,
      }
    })
  }

  function initHourlyWeather() {
    const array = []
    for (let i = 0; i < 12; i++) {
      array.push({ time: '-------------:--', symbol: 'd600', temperature: '--', precipProb: '--' })
    }
    return array
  }

  function initDailyWeather() {
    const array = []
    for (let i = 0; i < 7; i++) {
      array.push({ sunset: '--:--', sunrise: '--:--', precipProb: '--', symbol: 'd600', maxTemp: '--', minTemp: '--', date: '' })
    }
    return array
  }

  function backgroundStyle() {
    if (weather.symbol[0] === 'n') {
      return 'night'
    } else if (weather.symbol[1] === '3' || weather.symbol[1] === '4' || weather.symbol[1] === '6') {
      return 'grey'
    }
  }

  return (
    <main className={`Frame ${backgroundStyle()}`}>
      <Searchbar search={searchLocation} />
      <Current city={city} coords={coords} weather={weather} />
      <HourForecast hourData={hourlyWeather} />
      <Addition humidity={weather.relHumidity} wind={{ speed: weather.windSpeed, dir: weather.windDirString }} UVI={weather.uvIndex} sun={weather.symbol[0] === 'n' ? { phrase: 'Sun Rise', time: dailyWeather[0].sunrise } : { phrase: 'Sun Set', time: dailyWeather[0].sunset }} />
      <DailyForecast dailyData={dailyWeather} />
    </main>
  )
}
