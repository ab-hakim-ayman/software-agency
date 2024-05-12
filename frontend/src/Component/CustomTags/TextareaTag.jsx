import React from 'react'

export default function TextareaTag({label,name,value,onChange,rows=4,required=false,disabledPermanetADD=false}) {
  
  return (
    <div className='flex justify-between py-1 ' >
        <label className='mr-1 w-[30%] md:w-[20%] text-left pl-2'>{label}</label>
        <textarea
        rows={rows}
        name={name}
        value={value}
        required={required}
        disabled={disabledPermanetADD}
        readOnly={disabledPermanetADD}
        onChange={onChange}
        placeholder={label}
        className="border border-gray-400 p-2 rounded w-[70%] md:w-[50%] lg:w-[40%] mr-auto focus:outline-none  focus:shadow-md"
        ></textarea>
    </div>
  )
}
