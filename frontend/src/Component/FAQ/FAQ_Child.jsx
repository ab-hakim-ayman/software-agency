import React, { useState } from 'react'

export default function FAQ_Child({item,StateOpen,setStateOpen}) {
    

    return (
        <div onClick={()=>setStateOpen(item.id)} key={item.id}>
            <hr className="my-6 border-gray-200 dark:border-gray-700" />
            <button className="flex items-center focus:outline-none">
                { StateOpen === item.id ?
                    (<svg className="flex-shrink-0 w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>)
                    :
                    (<svg className='flex-shrink-0 w-6 h-6 text-white' enableBackground="new 0 0 50 50" height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="50px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><rect fill="none" height="30" width="30"/><line fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="4" x1="9" x2="41" y1="25" y2="25"/><line fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="4" x1="25" x2="25" y1="9" y2="41"/></svg>)
                }
                <h1 className="mx-4 text-xl text-gray-700 dark:text-white">{item.question}</h1>
            </button>
            { StateOpen === item.id &&
            <div className="flex mt-8 md:mx-10">
                <span className="border border-white"></span>

                <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                {item.answer}
                </p>
            </div>}
        </div>
  )
}
