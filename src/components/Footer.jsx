import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className='Footer'>
      <p>&copy; 2023 Waltson Zh</p>
      <div className='links'>
        <a
          href='https://github.com/WaltsonZh/Weather'
          target='_blank'
        >
          <img
            className='icon'
            src='/images/github.svg'
          />
        </a>
        <a
          href='https://www.linkedin.com/in/waltsonzh/'
          target='_blank'
        >
          <img
            className='icon'
            src='/images/linkedin.svg'
          />
        </a>
        <a href='mailto:waltson2003@gmail.com'>
          <img
            className='icon'
            src='/images/mail.svg'
          />
        </a>
      </div>
    </footer>
  )
}
