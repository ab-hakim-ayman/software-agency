import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import axios from 'axios'
import { Base_URL } from "../../../../Constant";

const AddFeatureWork = () => {
  
  const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));
  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState("")
  const [path, setPath] = useState("")
  const [photoName, setPhotoName] = useState("")

  const [data, setData] = useState("")


  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
  };

  useEffect(() => {
    axios.get(Base_URL+"/api/civil-admin/feature-work-category/", config)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  },[])

  const CreateFeatureWork = (e) => {
    e.preventDefault()
    const data = {
      'category': category, 
      'name': name, 
      'description': description, 
      'img': photo, 
      'path': path,
      'active': true,
    } 

    const config = {
      headers: {
        "Content-type": "application/json",
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${adminToken}`,
      },
    };
  
    axios.post(Base_URL+"/api/civil-admin/feature-work/", data, config)
      .then(response => {
        toast.success('FeatureWork created Successfully')
        })
      .catch(err => console.log(err));
  }

  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Add FeatureWork
      </h1>{" "}
      <div className="mt-8">
  
        
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
          <span className="label-text text-white text-lg font-semibold tracking-wider">Name</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Name"
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
        
        <label className="label">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Photo</span>
        </label>
        <div className="h-52 border-2 border-dotted border-neutral-500 flex space-y-10 flex-col items-center justify-center">
            <p className=" text-2xl font-semibold tracking-wide">Drag and drop file here or click to upload</p>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex h-10 w-64 flex-col items-center justify-center rounded cursor-pointer bg-green-800 dark:hover:bg-bray-800 ">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className=" tracking-wider">Choose File</p>
                    </div>
              <input id="dropzone-file" type="file" className="hidden"
               onChange={(e) => {
                setPhoto(e.target.files[0])
                setPhotoName(e.target.files[0]?.name)
              }}
              />
                </label>
          </div> 
          <span className="text-1xl font-semibold tracking-wide mb-2">{ photoName ? photoName : ""}</span>
        </div>


        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Path</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Path"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        />

      </div>
      <div className="flex items-center justify-center mb-10">
      <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e)=>{CreateFeatureWork(e)}}>Create</button>
      </div>
    </div>
  );
};

export default AddFeatureWork;
