import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
<>
    <img
    src='Gemini.jpg'
   
    className="w-[1040px] h-[1000px] rounded-xl m-auto"
  />
    <div className='flex flex-col items-center mx-56 gap-9'>
    <h1 className='font-semibold text-7xl text-center text-purple-800'>
     🚗 No more endless research!
    <div className='text-pink-400 text-4xl text-center my-7'>
    Get AI-generated travel plans based on your preferences. </div>
        </h1>
        <div className='text-white rounded-md px-30 py-35 text-center hover:first-letter cursor-pointer '>
         <Link  to='/create-trip'>
        <Button>Get Started</Button>
        </Link>

        </div>

    </div>
    <footer>
    <p>&copy;Aman Dixit</p>
</footer>
    </>
  )
}

export default Hero