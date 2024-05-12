import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from 'react-hot-toast';

import axios from 'axios'
import { Base_URL } from "../../../../Constant";



const EditGlobalLocation = () => {
  const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));

  const { id } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState("")
  const [office_address, setOfficeAddress] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")


  // console.log("23", photo);

  
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
  };

  useEffect(() => {
    axios.get(Base_URL+`/api/civil-admin/global-location/${id}/`, config)
      .then(res => {
        // console.log("34 res.data", res.data);
        setCountry(res.data.country)
        setOfficeAddress(res.data.office_address)
        setEmail(res.data.email)
        setContact(res.data.contact_no)
      })
      .catch(err => console.log(err));
  },[])


  const UpdateGlobalLocation = (e) => {
    e.preventDefault()
    const data = {
      'country': country, 
      'office_address': office_address, 
      'email': email, 
      'contact_no': contact, 
    } 

    const config = {
      headers: {
        "Content-type": "application/json",
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${adminToken}`,
      },
    };
  
    axios.patch(Base_URL+`/api/civil-admin/global-location/${id}/`, data, config)
      .then(response => {
        console.log(response.data)
        toast.success('Global Location edited Successfully')
        setTimeout(() => {
          navigate('/admin/civil/globalLocation');
        }, 1000);
        })
      .catch(err => console.log(err));
  }
  
  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      {/* <div className="flex items-center justify-between">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Detail Bottom Banner
        </h1>{" "}
      </div>
      <div className="flex justify-between items-center mt-4 ml-1 mb-10 uppercase text-lg tracking-wide">
        <div>
          <p>ID: { data?.id}</p>
          <p>Title: { data?.title}</p>
          <p>Description: { data?.description}</p>
          <p>Image: <img src={data?.img}e alt="" class="h-auto max-w-full rounded-lg w-60 h-70" /></p>
          <p>status: { data?.active?"Active":"Deactive"}</p>
          <p>created_at: { data?.created_at}</p>
          <p>last_update_at: { data?.last_update_at}</p>
        </div>
      </div> */}

      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Edit Global Location
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
      <div className="flex items-center justify-center mb-4">
        <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e) => { UpdateGlobalLocation(e) }}>Update</button>
      </div>
    </div>
  );
};

export default EditGlobalLocation;
