import React from 'react'

export default function SelectType({label,name,value,onChange,OptionsData,disabledPermanetADD=false}) {
    
  return (
    <div className='flex justify-between py-1' >
        <label className='mr-1 flex items-center w-[30%]'>{label}</label>
        <select
            disabled={disabledPermanetADD}
            name={name}
            onChange={(e)=>onChange(e)}
            defaultValue={value}
            className="border border-gray-400 p-2 rounded w-[70%]  focus:outline-none focus:shadow-md appearance-none"
        >
            <option value="">Select One</option>
            {
                OptionsData.map((data,i)=>{
                    return <option key={i} value={data?.val}>{data?.title}</option>
                })
            }
        </select>
    </div>
  )
}
