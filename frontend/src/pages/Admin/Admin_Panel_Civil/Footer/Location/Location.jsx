import React from 'react';
import {
    FaBars,
    FaDownload,
    FaGripLinesVertical,
    FaUndoAlt,
  } from "react-icons/fa";
  import { Link } from "react-router-dom";
  import { GrAdd } from "react-icons/gr";  
const Location = () => {
    return (
        <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
          Global Location
          </h1>{" "}
          <Link to="/addLocation">
            <button className="bg-slate-950 mt-5 text-slate-100 hover:bg-gray-600 border-[0.3px] border-slate-400 font-bold uppercase py-2 px-4 rounded inline-flex items-center space-x-2">
              <GrAdd className="bg-slate-100"></GrAdd>
              <span>Create</span>
            </button>
          </Link>
        </div>
        <div className="flex justify-between items-center mt-10 ml-1 uppercase text-lg tracking-wide">
          <div className="flex items-center justify-center gap-5">
            <p className="flex items-center justify-center gap-2">
              <FaGripLinesVertical />
              Column
            </p>
            <p className="flex items-center justify-center gap-2">
              <FaBars></FaBars>Density
            </p>
            <p className="flex items-center justify-center gap-2">
              <FaDownload></FaDownload> Export
            </p>
          </div>
          <div>
            <p className="flex items-center justify-center gap-2">
              <FaUndoAlt></FaUndoAlt>Refresh
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table border-0 mt-10 h-[full] bg-slate-900 rounded-sm">
            {/* head */}
            <thead className="text-white  bg-slate-950">
              <tr className="border-0 grid grid-cols-6">
                <th>#</th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Country</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Email</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Phone</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Address</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="h-[50vh] overflow-scroll"></tbody>
          </table>
        </div>
      </div>
    );
};

export default Location;