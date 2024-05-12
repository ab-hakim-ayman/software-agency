import React from 'react';
import { FaPen, FaUndoAlt } from 'react-icons/fa';

const Working = () => {
    return (
        <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
           Working
          </h1>
          <div>
          <button className="bg-gray-300 mt-5 font-normal hover:bg-gray-400 text-gray-800  uppercase py-2 px-4 rounded inline-flex items-center justify-center space-x-2">
          <FaUndoAlt/><span>Refresh</span>
          </button>
          <button className="bg-gray-300 ml-3 mt-5 font-normal hover:bg-gray-400 text-gray-800  uppercase py-2 px-4 rounded inline-flex items-center justify-center space-x-2">
          <FaPen/><span>Edit</span>
          </button>
          </div>
        </div>
      </div>
    );
};

export default Working;