import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';

import axios from 'axios'
import { Base_URL } from "../../../../Constant";


const EditSecurity = () => {
  
    const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")



    const config = {
      headers: {
        "Content-type": "application/json",
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${adminToken}`,
      },
    };

    useEffect(() => {
      axios.get(Base_URL+`/api/civil-admin/security/${id}/`, config)
        .then(res => {
          console.log("34 res.data", res.data);
          setData(res.data)
          setName(res.data.title)
          setDescription(res.data.description)
        })
        .catch(err => console.log(err));
    },[])
  

    const UpdateServices = (e) => {
      e.preventDefault()
      var data1 = {
        'title': name, 
        'description': description,
      }
      
      axios.patch(Base_URL+`/api/civil-admin/security/${id}/`, data1, config)
        .then(response => {
          // console.log(response.data)
          toast.success('Security Edited Successfully')
          setTimeout(() => {
            navigate('/admin/civil/security')
          }, 1000);
          })
        .catch(err => console.log(err));
    }


    

    return (
      <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">

        {/* <div className="flex items-center justify-between">
          <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
          Detail Security
          </h1>{" "}
        </div>

        <div className="flex justify-between items-center mt-4 ml-1 mb-10 uppercase text-lg tracking-wide">
        <div>
          <p>ID: { data?.id}</p>
          <p>Title: { data?.title}</p>
          <p>Description: { data?.description}</p>
          <p>status: { data?.active?"Active":"Deactive"}</p>
          <p>created_at: { data?.created_at}</p>
          <p>last_update_at: { data?.last_update_at}</p>
        </div>
      </div> */}


        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Edit Security
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
        {/* Seo */}
     
        <div className="flex items-center justify-center mb-10">
          <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e)=>{UpdateServices(e)}}>
            Update
          </button>
        </div>
      </div>
    );
};

export default EditSecurity;