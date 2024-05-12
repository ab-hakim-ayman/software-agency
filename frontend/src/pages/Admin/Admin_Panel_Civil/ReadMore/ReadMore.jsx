import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import {
  FaBars,
  FaDownload,
  FaGripLinesVertical,
  FaUndoAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import toast from 'react-hot-toast';

import axios from 'axios'
import { Base_URL } from "../../../../Constant";

const ReadMore = () => {
  
  const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));
  const [data, setData] = useState("")
  // console.log("18 data", data);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
  };

  function DataFetch() {
    axios.get(Base_URL+"/api/civil-admin/read-more/", config)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    DataFetch()
  },[])

  const deleteButtonClick = (e, id) => {
    e.preventDefault()
    axios.delete(Base_URL+`/api/civil-admin/read-more/${id}/`, config)
      .then(res => {
        console.log(res.data);
        toast.success(res?.data?.message)
        DataFetch()
      })
      .catch(err => console.log(err));
  }


  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Read More
        </h1>{" "}
        <Link to="/admin/civil/addReadmore">
        <button className="bg-slate-950 mt-5 text-slate-100 hover:bg-gray-600 border-[0.3px] border-slate-400 font-bold uppercase py-2 px-4 rounded inline-flex items-center space-x-2">
 <GrAdd className="bg-slate-100"></GrAdd>
  <span>Create</span>
</button></Link>
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
        <table className="table  border-[0.3px] border-slate-500  mt-10 h-[full]  bg-slate-900  rounded-sm">
          {/* head */}
          <thead className="text-white  bg-slate-950">
          <tr className="border-0 grid grid-cols-6">
              <th>SL</th>
              <th>
                <span className=" border-l-2  border-slate-200  pl-2">ID</span>
              </th>
              <th>
                <span className=" border-l-2  border-slate-200  pl-2">Title</span>
              </th>
              <th>
                <span className=" border-l-2  border-slate-200  pl-2">
                Description
                </span>
              </th>
              <th>
                <span className=" border-l-2  border-slate-200  pl-2">
                  Status
                </span>
              </th>
              <th>
                <span className=" border-l-2  border-slate-200  pl-2">
                  Action
                </span>
              </th>
          </tr>
          </thead>
          <tbody className="h-[50vh] overflow-scroll">
          {data?.results?.map((item, i) => {
              return <>
                <tr class="grid grid-cols-6 bg-slate border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                <td class="px-6 py-4">
                    {i+1}
                </td>
                <td class="px-6 py-4">
                    {item?.id}
                </td>
                <td class="px-6 py-4">
                    {item?.title}
                </td>
                <td class="px-6 py-4">
                    {item?.description?.substring(0, 30)}
                </td>
                <td class="px-6 py-4">
                    {item?.active?"Active":"Deactive"}
                </td>
                <td class="px-6 py-4">
                  {/* <Link to="#">
                    <button class="bg-slate-500 hover:bg-slate-700 text-white text-sm font-bold -ml-5 py-0.5 px-0.5 rounded">
                      view
                    </button>
                  </Link> */}
                    <Link to={`/admin/civil/editReadmore/${item?.id}/`}>
                    <button class="bg-slate-500 hover:bg-slate-700 text-white text-sm font-bold ml-0.5 py-0.5 px-0.5  rounded">
                      View
                    </button>
                  </Link>
                  
                  <button class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold ml-0.5 py-0.5 px-0.5  rounded" onClick={(e)=>{deleteButtonClick(e, item?.id)}}>
                    {item?.active?"delete":"active"}
                  </button>
                </td>
              </tr>
              </>
            })} 
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadMore;
