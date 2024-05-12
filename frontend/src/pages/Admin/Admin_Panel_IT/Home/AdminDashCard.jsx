import React from 'react';
import { FaClipboard } from "react-icons/fa";

const AdminDashCard = ({name,value}) => {
  return (
    <div className="bg-blue-900 rounded h-28 flex flex-col gap-8 p-4 border-slate-400 border-[0.3px]">
        <div className="flex text-xl font-semibold items-center justify-between">
        <p>{value}</p>
        {/* <FaClipboard></FaClipboard>  */}
        </div>
        <h1 className="text-lg font-mono">{name}</h1>
    </div>
  )
}

export default AdminDashCard
