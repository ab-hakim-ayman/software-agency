import React from 'react'

export default function DashCard({name,value}) {
  return (
    <div className="bg-slate-900 text-slate-100 rounded h-28 flex flex-col gap-8 p-4">
      <div className="flex text-xl font-semibold items-center justify-between">
        <p>{value}</p>
      </div>
      <h1 className="text-lg font-mono">{name}</h1>
    </div>
  )
}
