import React from 'react'

export default function Card({text,number, textColor, BgColor}) {
  return (
    <div className=''>
        <div className={`${textColor?textColor: " text-white "} ${BgColor?BgColor:" bg-blue-950 "}" border-2 border-slate-700 px-2 py-4 h-30 rounded-lg shadow-md flex flex-col justify-center items-center text-center duration-300" `}>
            <div className="text-xl mb-1 ">{number}</div>
            <div className="text-sm font-medium font-noto">{text}</div>
        </div>
    </div>
  )
}
