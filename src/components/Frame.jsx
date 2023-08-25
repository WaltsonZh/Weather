import './Frame.css'
import Searchbar from './Searchbar'
import Current from './Current'
import HourForecast from './HourForecast'
import DailyForecast from './DailyForecast'
import Addition from './Addition'
import currentWeather from '/src/data/currentWeather.json'
import locationData from '/src/data/locationData.json'
import hourForecast from '/src/data/hourForecast.json'
import dailyForecast from '/src/data/dailyForecast.json'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Frame() {
  const [city, setCity] = useState({ City: 'Taoyuan', TimeZoneId: 'Asia/Taipei' })
  const [coords, setCoords] = useState({ lat: '24.9865848', lon: '121.2878685', current: false })
  const [weather, setWeather] = useState(currentWeather.current)
  const [hourlyWeather, setHourlyWeather] = useState(hourForecast)
  const [dailyWeather, setDailyWeather] = useState(dailyForecast.forecast)

  useEffect(() => {
    const cancel = axios.CancelToken.source()
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
          const { data } = await axios.get('https://location.services.mozilla.com/v1/geolocate?key=test', { cancelToken: cancel.token })
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
    //   const options = {
    //     method: 'GET',
    //     url: '/.netlify/functions/reverse-geocoding',
    //     params: { lat: coords.lat, lon: coords.lon },
    //     cancelToken: cancel.token
    //   }
    //   const { data } = await axios.request(options)
    //   setCity(data[0])
    // }

    // reverseGeocoding().catch((error) => console.log(error))

    // const fetchLocationData = async () => {
    //   const options = {
    //     method: 'GET',
    //     url: '/.netlify/functions/fetch-location-data',
    //     params: { location: city.City },
    //     cancelToken: cancel.token,
    //   }

    //   const { data } = await axios.request(options)
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
    //   const options = {
    //     method: 'GET',
    //     url: '/.netlify/functions/fetch-current-weather',
    //     param: { location: city.id, timezone: TimeZoneId },
    //     cancelToken: cancel.token,
    //   }
    //   const { data } = await axios.request(options)
    //   setWeather(data.current)
    // }
    // fetchCurrentWeather().catch((error) => console.log(error))

    // const fetchData = async () => {
    //   const options = {
    //     method: 'GET',
    //     url: '/.netlify/functions/fetch-hourly-forecast',
    //     params: {
    //       location: 106696918,
    //       timezone: 'Asia/Taipei',
    //     },
    //     cancelToken: cancel.token,
    //   }
    //   const { data } = await axios.request(options)
    //   setHourData(data.forecast)
    // }

    // fetchData().catch((error) => console.error(error))

    // const fetchDailyWeather = async () => {
    //   const options = {
    //     method: 'GET',
    //     url: '/.netlify/functions/fetch-daily-forecast',
    //     param: { location: locationData.locations[0].id },
    //     cancelToken: cancel.token
    //   }
    //   const { data } = await axios.request(options)
    //   setDailyWeather(data.forecast)
    // }
    // fetchDailyWeather().catch((error) => console.log(error))

    return () => {
      console.log('clean up')
      cancel.cancel('Operation canceled due to new request')
    }
  }, [])

  return (
    <main className='Frame'>
      <Searchbar />
      <Current city={city} coords={coords} weather={weather} />
      <HourForecast hourData={hourlyWeather}  />
      <Addition humidity={weather.temperature} wind={{ speed: weather.windSpeed, dir: weather.windDirString }} UVI={weather.uvIndex} sun={weather.symbol[0] === 'n' ? { phrase: 'Sun Rise', time: 'time' } : { phrase: 'Sun Set', time: 'time' }} sunrsTime={'time'} />
      <DailyForecast />
    </main>
  )
}
