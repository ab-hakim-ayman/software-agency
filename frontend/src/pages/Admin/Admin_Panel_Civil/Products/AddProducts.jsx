import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import axios from 'axios'
import { Base_URL } from "../../../../Constant";

const AddProducts = () => {
  
  const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));
  
  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState("")
  const [fileone, setFileOne] = useState("")
  const [filetwo, setFileTwo] = useState("")
  const [filethree, setFileThree] = useState("")
  const [photoName, setPhotoName] = useState("")

  const [data, setData] = useState("")


  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
  };

  function DataFetch() {
    axios.get(Base_URL+"/api/civil-admin/product-category/", config)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    DataFetch()
  },[])

  const CreateProduct = (e) => {
    e.preventDefault()
    const data = {
      'category': category, 
      'proName': name, 
      'proDescription': description, 
      'proImg': photo, 
      'fileOne': fileone, 
      'fileTwo': filetwo, 
      'fileThree': filethree, 
      'active': true,
    } 

    const config = {
      headers: {
        "Content-type": "application/json",
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${adminToken}`,
      },
    };
  
    axios.post(Base_URL+"/api/civil-admin/product/", data, config)
      .then(response => {
        toast.success('Product created Successfully')
        DataFetch()
        })
      .catch(err => console.log(err));
  }


  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Create Product
      </h1>{" "}
      
      <form method="post" className="py-8" onSubmit={(e)=>{CreateProduct(e)}}>
  
        
        <label for="category" className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Category</span>
        </label>
        <select id="categories" class="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " onChange={(e)=> setCategory(e.target.value)}>
          <option selected>Choose a category</option>
          {data?.results?.map((item, i) => { 
            return <>
              <option value={item?.id}>{item?.category}</option>
            </>
          })}
          
        </select>

        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Product Name</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Product Name"
        value={name} required
        onChange={(e) => setName(e.target.value)}
        />
        
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Product Description</span>
        </label>
        <textarea className="h-32 px-4 py-2 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        
        <label className="label">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Photo *</span>
        </label>
        <div className="h-52 border-2 border-dotted border-neutral-500 flex space-y-10 flex-col items-center justify-center">
            {/* <input type="file" className="btn btn-lg bg-green-800 border-none rounded" /> */}
            <p className=" text-2xl font-semibold tracking-wide">Drag and drop file here or click to upload</p>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex h-10 w-64 flex-col items-center justify-center rounded cursor-pointer bg-green-800 dark:hover:bg-bray-800 ">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className=" tracking-wider">Choose File </p>
                    </div>
              <input id="dropzone-file" type="file" className="hidden" required accept="image/*"
                onChange={(e) => {
                  setPhoto(e.target.files[0])
                  setPhotoName(e.target.files[0]?.name)
                }}
              />
            </label>
          </div> 
          <span className="text-1xl font-semibold tracking-wide mb-2">{ photoName ? photoName : "image required"}</span>
        </div>


        <div className="my-2 mt-3">
          <label
            htmlFor="example1"
            className="label-text text-white text-lg font-semibold tracking-wider"
          >
            File One *
          </label>
          <input
            id="example1"
            type="file" required accept="application/pdf"
            onChange={(e)=>setFileOne(e.target.files[0])}
            className="block mt-2  border rounded border-neutral-500 w-full text-sm file:mr-4 file:border-0 file:bg-green-800 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
          />
        </div>

        <div className="my-2 mt-3">
          <label
            htmlFor="example1"
            className="label-text text-white text-lg font-semibold tracking-wider"
          >
            File Two
          </label>
          <input
            id="example1"
            type="file"
            onChange={(e)=>setFileTwo(e.target.files[0])}
            className="block mt-2  border rounded border-neutral-500 w-full text-sm file:mr-4 file:border-0 file:bg-green-800 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
          />
        </div>

        <div className="my-2 mt-3">
          <label
            htmlFor="example1"
            className="label-text text-white text-lg font-semibold tracking-wider"
          >
            File Three
          </label>
          <input
            id="example1"
            type="file"
            onChange={(e)=>setFileThree(e.target.files[0])}
            className="block mt-2  border rounded border-neutral-500 w-full text-sm file:mr-4 file:border-0 file:bg-green-800 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
          />
        </div>

        <div className="flex items-center justify-center mb-10">
          <button type="submit" className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" >
            Create
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProducts;
