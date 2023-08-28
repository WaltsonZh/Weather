export default function Hour({ time, weather, temp, precipProb }) {
  let precip = ''
  if (precipProb > 60) {
    precip = 'bigRain'
  } else if (precipProb <= 30) {
    precip = 'noRain'
  } else {
    precip = 'littleRain'
  }

  return (
    <div className='Hour'>
      <p className='time'>{time.slice(11, 16)}</p>
      <img
        className='weather'
        src={`/images/weather/${weather}.png`}
        draggable={false}
      />
      <p className='temp'>{temp}&deg;</p>
      <div className='precip'>
        <img src={`/images/${precip}.svg`} />
        <p>{precipProb}%</p>
      </div>
    </div>
  )
}
