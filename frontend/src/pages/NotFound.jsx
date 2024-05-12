import React from 'react'
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='h-screen flex justify-center align-middle items-center  bg-slate-200'>
        <div className='bg-slate-100 flex justify-center align-middle items-center flex-col border-[0.1px] border-blue-950 p-16 shadow-lg w-[50%] h-[60%]'> 
            <h1 className='font-extrabold text-9xl drop-shadow-xl hover:drop-shadow-md '> 404 </h1>  
            <div className='text-3xl font-semibold'> Page Not Found </div> 
            <Link className='shadow-yellow-300 hover:shadow-slate-300 shadow-md my-8 border bg-white hover:text-blue-900 border-yellow-300 hover:scale-110 duration-500 hover:border-slate-950 hover:bg-yellow-300 py-4 px-8 font-bold' to='/'> Go Home </Link>
        </div>
    </div>
  )
}
