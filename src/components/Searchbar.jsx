import { useState } from 'react'
import icon from '/images/search-icon.svg'

export default function Searchbar({ search }) {
  const [input, setInput] = useState('')

  function submit(event) {
    event.preventDefault()
    console.log('location passed: ' + input)
    search(input)
  }

  return (
    <form onSubmit={submit}>
      <input
        className='searchBox'
        type='text'
        placeholder='Enter Location...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className='searchBtn'>
        <img src={icon} />
      </button>
    </form>
  )
}
