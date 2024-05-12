import React from 'react'

export default function InputType({label,type,name,value,onChange,disabledPermanetADD=false,required=false}) {

  return (
    <div className='flex justify-between py-1 ' >
        <label className='mr-1 flex items-center w-[30%] '>{label}</label>
        <input
            type={type}
            name={name}
            required={required}
            value={value}
            onChange={(e)=>onChange(e)}
            placeholder={label}
            className={`${disabledPermanetADD === true ? " bg-gray-100 " : "  "} border border-gray-400 p-2 rounded w-[70%]  focus:outline-none  focus:shadow-md 
            [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none `}
            readOnly={disabledPermanetADD}
            disabled={disabledPermanetADD}
        />
    </div>
  )
}
