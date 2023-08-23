import './Navbar.css'
import icon from '/images/sun-cloud.svg'

export default function Navbar() {
  return (
    <nav className='Navbar'>
      <img src={icon} />
      <h4>Weather</h4>
    </nav>
  )
}
