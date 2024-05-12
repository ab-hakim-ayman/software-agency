import React, { useState } from "react";
import toast from 'react-hot-toast';
import axios from 'axios'
import { Base_URL } from "../../../../Constant";

const AddFeatureWorksCategory = () => {
  
  const [category, setCategory] = useState("")
  const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));
  
  const CreateCategory = (e) => {
    e.preventDefault()
    const data = {
      'category': category, 
      'active': true,
    } 

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
    };
  
    axios.post(Base_URL+"/api/civil-admin/feature-work-category/", data, config)
      .then(response => {
        toast.success("FeatureWorksCategory created Successfully")
        setCategory("")
        })
      .catch(err => console.log(err));
  }

  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Add FeatureWorksCategory
      </h1>{" "}
      <div className=" mt-8">
        
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Category</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Category" required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center">
      <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e)=>{CreateCategory(e)}}>Create</button>
      </div>
    </div>
  );
};

export default AddFeatureWorksCategory;
