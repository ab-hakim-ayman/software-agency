import React, { useState } from "react";

import toast from 'react-hot-toast';

import axios from 'axios'
import { Base_URL } from "../../../../Constant";

const AddProductCategory = () => {
  const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));
  const [category, setCategory] = useState("")
    
  const CreateProductCategory = (e) => {
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
  
    axios.post(Base_URL+"/api/civil-admin/product-category/", data, config)
      .then(response => {
        // console.log(response.data)
        toast.success('Product Category created Successfully')
        setCategory("")
        })
      .catch(err => console.log(err));
  }


  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Create Product Category
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
      {/* <div className=" mt-8">
        <label className="label">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Photo
          </span>
        </label>
        <div className="h-52 border-2 border-dotted border-neutral-500 flex space-y-10 flex-col items-center justify-center">
          <p className=" text-2xl font-semibold tracking-wide">
            Drag and drop file here or click to upload
          </p>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex h-10 w-64 flex-col items-center justify-center rounded cursor-pointer bg-green-800 dark:hover:bg-bray-800 "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className=" tracking-wider">Choose File</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>

        <div className="my-2 mt-3">
          <label
            htmlFor="example1"
            className="label-text text-white text-lg font-semibold tracking-wider"
          >
            PDF
          </label>
          <input
            id="example1"
            type="file"
            className="block mt-2  border rounded border-neutral-500 w-full text-sm file:mr-4 file:border-0 file:bg-green-800 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
          />
        </div>
      </div>  */}
      <div className="flex items-center justify-center">
        <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e) => { CreateProductCategory(e) }}>
          Create
        </button>
      </div>
    </div>
  );
};

export default AddProductCategory;
