import React from 'react'
import './Loader.css'

export default function Loader() {
  return (
    <div className="preloader bg-primary h-screen flex justify-center items-center" id="loader">
      <div className="loading-animation">
      </div>
    </div>
    // <div className='bg-primary h-screen flex justify-center items-center text-7xl text-white'>Loading...</div>
  )
}
