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


const Account = () => {
  
  const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));
  const [data, setData] = useState("")
  console.log("21 data", data);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
  };

 
  const DataFetch=()=>{
    axios.get(Base_URL+"/api/civil-admin/company-account/", config)
    .then(res => setData(res))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    DataFetch()
  },[])


  const deleteButtonClick = (e, id) => {
    e.preventDefault()
    axios.delete(Base_URL+`/api/civil-admin/company-account/${id}/`, config)
      .then(res => {
        console.log(res.data);
        toast.success(res?.data?.message)
        DataFetch()
      })
      .catch(err => console.log(err));
  }

  return (
    <div className=" bg-slate-900  px-10 w-full h-full mt-12 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Accounts
        </h1>{" "}
        <Link to="/admin/civil/addAccount">
        <button className="bg-blue-950 mt-5 text-slate-100 hover:bg-gray-600 border-[0.3px] border-slate-400 font-bold uppercase py-2 px-4 rounded inline-flex items-center space-x-2">
 <GrAdd className="bg-slate-100"></GrAdd>
  <span>Create</span>
</button></Link>
      </div>
      <div className="flex justify-between items-center mt-10 ml-1 uppercase text-lg tracking-wide">
        <div className="flex items-center justify-center gap-5">
          {/* search */}
        </div>
        <div>
          <p className="flex items-center justify-center gap-2">
            <FaUndoAlt></FaUndoAlt>Refresh
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table border-0 mt-10 mb-10 h-[full] bg-slate-900 rounded-sm">
          {/* head */}
          <thead className="text-white  bg-slate-950">
          <tr className="border-0 grid grid-cols-8">
              <th>SL</th>
              <th>
                <span className=" border-l-2  border-slate-200  pl-2">Bank Image</span>
              </th>
              <th>
                <span className=" border-l-2  border-slate-200  pl-2">Bar Code</span>
              </th>
              <th>
                <span className=" border-l-2  border-slate-200  pl-2">Bank Name</span>
              </th>
              <th>
                <span className=" border-l-2  border-slate-200  pl-2">Country</span>
              </th>
              <th>
                <span className=" border-l-2  border-slate-200  pl-2">
                  Payment Method
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
          {data?.data?.map((item, i) => {
              return <>
                <tr class="grid grid-cols-8 bg-blue border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                <td class="px-6 py-4">
                    {i+1}
                </td>
                <td class="px-6 py-4">
                  <img src={item?.bank_img}e alt="" class="h-6 w-6" />
                </td>
                <td class="px-6 py-4">
                  <img src={item?.bar_code}e alt="" class="h-6 w-6" />
                </td>
                <td class="px-6 py-4">
                    {item?.bank_name}
                </td>
                <td class="px-6 py-4">
                    {item?.country}
                </td>
                <td class="px-6 py-4">
                    {item?.method_name}
                </td>
                <td class="px-6 py-4">
                    {item?.active?"Active":"Deactive"}
                </td>
                <td class="px-6 py-4">
                  <Link to={`/admin/civil/editAccount/${item?.id}/`}>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold -ml-4 py-0.5 px-0.5  rounded">
                      View
                    </button>
                  </Link>
                  
                  <button class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold -ml-0.09 py-0.5 px-0.5  rounded" onClick={(e)=>{deleteButtonClick(e, item?.id)}}>
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

export default Account;
