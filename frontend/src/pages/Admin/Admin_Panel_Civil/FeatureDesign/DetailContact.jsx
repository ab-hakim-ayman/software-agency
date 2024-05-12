import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import {
  FaBars,
  FaDownload,
  FaGripLinesVertical,
  FaUndoAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import axios from 'axios'

import {
  useNavigate,
  useParams
} from "react-router-dom";
import { Base_URL } from "../../../../Constant";


const DetailContact = () => {
  const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));
  const { id } = useParams();

  const [data, setData] = useState("")
  console.log("18 data", data);

  function DataFetch() {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
    };
    axios.get(Base_URL+`/api/civil-admin/contact/${id}/`, config)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }
  

  useEffect(() => {
    DataFetch()
  },[])
  
 


  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Detail Contact
        </h1>{" "}
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
      <div className="flex justify-between items-center mt-10 ml-1 mb-10 uppercase text-lg tracking-wide">
        <div>
          <p>ID: { data?.id}</p>
          <p>Full Name: { data?.fullName}</p>
          <p>email: { data?.email}</p>
          <p>Phone: { data?.phone_number}</p>
          <p>subject: { data?.subject}</p>
          <p>comment: { data?.comment}</p>
          <p>status: { data?.active?"Active":"Deactive"}</p>
          <p>created_at: { data?.created_at}</p>
          <p>last_update_at: { data?.last_update_at}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailContact;
