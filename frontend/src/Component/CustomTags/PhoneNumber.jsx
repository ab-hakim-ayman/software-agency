import React, { useState } from 'react'
import PhoneCodeFilter from '../AllFilter/PhoneCodeFilter';

export default function InputType({label,type,name,value,onChange,code_field_value, code_field_name,obj ,setState, disabledPermanetADD=false,required=true}) {

  const [ModalOpen, setModalOpen] = useState(false);
  

  return (
    <div className='relative'>
      <div className='flex justify-between py-1' >
          <label className='mr-1 flex items-center w-[30%]'>{label}</label>
          <div className='flex m-0 p-0 w-[70%]'>
            <button disabled={disabledPermanetADD} onClick={()=>setModalOpen(true)} type="button" className="w-[20%] inline-flex justify-center gap-x-1.5 rounded-tl-md border border-gray-400 rounded-bl-md bg-white px-2 py-2 text-sm text-gray-900 shadow-sm hover:bg-gray-50" aria-expanded="true" aria-haspopup ="true">
              {code_field_value?code_field_value:'880'}
              <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <input
                type={type}
                name={name}
                value={value ? value : ""}
                onChange={(e)=>onChange(e)}
                placeholder={label}
                disabled={disabledPermanetADD}
                readOnly={disabledPermanetADD}
                required={required}
                className="border border-gray-400 p-2 rounded w-[100%] focus:outline-none  focus:shadow-md 
                [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
          
      </div>
      {ModalOpen && <PhoneCodeFilter disabledPermanetADD={disabledPermanetADD}  setModalOpen={setModalOpen} name={code_field_name} code_field_value={code_field_value} obj={obj} setState={setState} />}
    </div>
  )
}
