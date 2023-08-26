export default function Daily({ precipProb, weather, maxtemp, mintemp, date }) {
  let precip = ''
  if (precipProb > 60) {
    precip = 'bigRain'
  } else if (precipProb <= 30) {
    precip = 'noRain'
  } else {
    precip = 'littleRain'
  }
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  function getWeekDay(date) {
    const dateParts = date.split('-')
    const dateObj = new Date(dateParts[0], parseInt(dateParts[1]) - 1, dateParts[2])
    return weekDays[dateObj.getDay()]
  }

  return (
    <div className='Daily'>
      <p className='weekDays'>{date ? getWeekDay(date) : '----'}</p>
      <div className='precip'>
        <img src={`/images/${precip}.svg`} />
        <p>{precipProb}%</p>
      </div>
      <img src={`/images/weather/${weather}.png`} />
      <p>
        {maxtemp}&deg; / {mintemp}&deg;
      </p>
    </div>
  )
}
