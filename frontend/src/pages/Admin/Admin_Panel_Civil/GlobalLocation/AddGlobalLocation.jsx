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

const AddGlobalLocation = () => {
  
  const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));
  const [country, setCountry] = useState("")
  const [office_address, setOfficeAddress] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")




  const CreateGlobalLocation = (e) => {
    e.preventDefault()
    const data = {
      'country': country, 
      'office_address': office_address, 
      'email': email, 
      'contact_no': contact, 
      'active': true,
    } 

    const config = {
      headers: {
        "Content-type": "application/json",
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${adminToken}`,
      },
    };
  
    axios.post(Base_URL+"/api/civil-admin/global-location/", data, config)
      .then(response => {
        console.log(response.data)
        toast.success('Global Location created Successfully')
        })
      .catch(err => console.log(err));
  }
   
  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Add Global Location
      </h1>{" "}
      <div className="mt-8">
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Country</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        />
        
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Office Address</span>
        </label>
        <textarea className="h-32 px-4 py-2 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Office Address"
        value={office_address}
        onChange={(e) => setOfficeAddress(e.target.value)}
        ></textarea>
        
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Email</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Contact Number</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Contact Number"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        />

      </div>
      <div className="flex items-center justify-center">
      <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600 mb-10" onClick={(e) => { CreateGlobalLocation(e) }}>Create</button>
      </div>
    </div>
  );
};

export default AddGlobalLocation;
