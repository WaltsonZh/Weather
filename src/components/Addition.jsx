import './Addition.css'

export default function Addition({ humidity, wind, UVI, sun }) {
  return (
    <div className='Addition subFrame'>
      <div className='title'>
        <p>
          <img className='titleImg' src='/images/humidity.svg' />
          Humidity
        </p>
        <p>{humidity}%</p>
      </div>
      <div className='title'>
        <p>
          <img className='titleImg' src='/images/wind.svg' />
          Wind
        </p>
        <p>
          <img className='dir' src={`/images/windDir/${wind.dir}.svg`} /> {wind.speed} KM/H
        </p>
      </div>
      <div className='title'>
        <p>
          <img className='titleImg' src='/images/UVI.svg' />
          UVI
        </p>
        <p>{UVI}</p>
      </div>
      <div className='title'>
        <p>
          <img className='titleImg' src='/images/sunrs.svg' />
          {sun.phrase}
        </p>
        <p>{sun.time}</p>
      </div>
    </div>
  )
}
