import React, { useState, useEffect } from "react";

import toast from 'react-hot-toast';


import { useNavigate, useParams } from "react-router-dom";

import axios from 'axios'
import { Base_URL } from "../../../../Constant";


const EditFeatureWorksCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));

  const [category, setCategory] = useState("")
  const [data, setData] = useState([])
  // console.log("18 data", data);


  
  // console.log("9 category", category);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
  };

  useEffect(() => {
    axios.get(Base_URL+`/api/civil-admin/feature-work-category/${id}/`, config)
      .then(res => {
        setData(res.data)
        setCategory(res.data.category)
      })
      .catch(err => console.log(err));
  },[])

  const updateCategory = (e) => {
    e.preventDefault()
    const data = {
      'category': category, 
    } 
 
  
    axios.patch(Base_URL+`/api/civil-admin/feature-work-category/${id}/`, data, config)
      .then(response => {
        // console.log(response.data)
        toast.success('FeatureWorksCategory edited Successfully')
        setCategory("")
        setTimeout(() => {
          navigate('/admin/civil/featureworkscategory');
        }, 1000);
       
        
        })
      .catch(err => console.log(err));
  }

  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      {/* <div className="flex items-center justify-between">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Detail Feature Works Category
        </h1>{" "}
      </div>
      <div className="flex justify-between items-center mt-4 ml-1 uppercase text-lg tracking-wide">
        <div>
          <p>ID: { data?.id}</p>
          <p>Category: { data?.category}</p>
          <p>status: { data?.active?"Active":"Deactive"}</p>
          <p>created_at: { data?.created_at}</p>
          <p>last_update_at: { data?.last_update_at}</p>
        </div>
      </div> */}
      
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-8">
        Edit FeatureWorksCategory
      </h1>{" "}
      <div className=" mt-8">
        
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Category</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center">
      <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e)=>{updateCategory(e)}}>Update</button>
      </div>
      
    </div>
  );
};

export default EditFeatureWorksCategory;
