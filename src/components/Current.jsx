import pin from '/images/pin.svg'

export default function Current({ city, coords, weather }) {
  return (
    <div className='Current'>
      <div className='current-location'>
        {coords.current && (
          <img
            className='location-icon'
            src={pin}
          />
        )}
        <p className='location'>{city.City.toUpperCase()}</p>
      </div>
      <div className='current-weather'>
        <p className='current-temp'>{weather.temperature}&deg;C</p>
        <p className='current-env'>{weather.symbolPhrase[0].toUpperCase() + weather.symbolPhrase.slice(1)}</p>
      </div>
      <img
        className='current-img'
        src={`/images/weather/${weather.symbol}.png`}
      />
    </div>
  )
}
