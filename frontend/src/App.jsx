import React from 'react'
import { Link } from "react-router-dom"

function App() {
  return (
    <main className='h-screen flex justify-center flex-col gap-5 items-center bg-gray-900 w-full'>
      <h1 className='text-4xl font-semibold text-gray-400 text-center capitalize'>payTm e-wallet clone</h1>
      <div className='flex justify-center items-center gap-5'>
        <Link to={"/signup"} className='text-2xl text-gray-400 underline hover:text-gray-500/90 duration-75' href="">Sign up</Link>
        <Link to={"/signin"} className='text-2xl text-gray-400 underline hover:text-gray-500/90 duration-75' href="">Sign in</Link>
      </div>
    </main>
  )
}

export default App;
