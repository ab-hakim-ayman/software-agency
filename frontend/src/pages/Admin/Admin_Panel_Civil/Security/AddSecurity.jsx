import React, { useState } from "react";

import toast  from 'react-hot-toast';

import axios from 'axios'
import { Base_URL } from "../../../../Constant";

const AddSecurity = () => {
  
  const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")


  const CreateSecurity = (e) => {
    e.preventDefault()
    const data = {
      'title': name, 
      'description': description,
      'active': true,
    } 

    const config = {
      headers: {
        "Content-type": "application/json",
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${adminToken}`,
      },
    };
  
    axios.post(Base_URL+"/api/civil-admin/security/", data, config)
      .then(response => {
        toast.success('Security Page created Successfully')
        })
      .catch(err => console.log(err));
  }
  
  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Add Security
      </h1>{" "}
      <div className="mt-8">
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Title</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Description</span>
        </label>
        <textarea className="h-32 px-4 py-2 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        
        
      </div>
      <div className="flex items-center justify-center mb-4">
      <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e)=>{CreateSecurity(e)}}>Create</button>
      </div>
    </div>
  );
};

export default AddSecurity;
