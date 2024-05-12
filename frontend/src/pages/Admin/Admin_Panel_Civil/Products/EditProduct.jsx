import React, { useState, useEffect } from "react";

import toast from 'react-hot-toast';

import axios from 'axios'

import {
  useNavigate,
  useParams
} from "react-router-dom";
import { Base_URL } from "../../../../Constant";

const EditProduct = () => {
  const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState("")
  const [fileone, setFileOne] = useState("")
  const [filetwo, setFileTwo] = useState("")
  const [filethree, setFileThree] = useState("")
  const [data, setData] = useState([])
  const [pc, setPc] = useState([])
  const [photoName, setPhotoName] = useState("")


  // console.log("23", photo);

  
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
  };

  useEffect(() => {
    axios.get(Base_URL+`/api/civil-admin/product/${id}/`, config)
      .then(res => {
        console.log("34 res.data", res.data);
        setCategory(res.data.category)
        setName(res.data.proName)
        setDescription(res.data.proDescription)
        // setPath(res.data.path)
        setData(res.data)
      })
      .catch(err => console.log(err));
    
      axios.get(Base_URL+"/api/civil-admin/product-category/", config)
      .then(res => setPc(res.data))
      .catch(err => console.log(err));
  },[])


  const UpdateFeatureWork = (e) => {
    e.preventDefault()
    var data1 = {}
    if (photo && fileone && filetwo && filethree) {
      data1 = {
        'category': category, 
        'proName': name, 
        'proDescription': description, 
        'proImg': photo, 
        'fileOne': fileone, 
        'fileTwo': filetwo, 
        'fileThree': filethree, 
      } 
    } else {
      data1 = {
        'category': category, 
        'proName': name, 
        'proDescription': description, 
      } 
    }

    const config = {
      headers: {
        "Content-type": "application/json",
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${adminToken}`,
      },
    };
  
    axios.patch(Base_URL+`/api/civil-admin/product/${id}/`, data1, config)
      .then(response => {
        // console.log(response.data)
        toast.success('Product edited Successfully')
        setTimeout(() => {
          navigate('/admin/civil/products');
        }, 1000);
        })
      .catch(err => console.log(err));
  }
  
  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      {/* <div className="flex items-center justify-between">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Detail FeatureWork
        </h1>{" "}
      </div>
      <div className="flex justify-between items-center mt-4 ml-1 mb-10 uppercase text-lg tracking-wide">
        <div>
          <p>ID: { data?.id}</p>
          <p>Title: { data?.name}</p>
          <p>Description: { data?.description}</p>
          <p>Image: <img src={data?.img}e alt="" class="h-auto max-w-full rounded-lg w-60 h-70" /></p>
          <p>status: { data?.active?"Active":"Deactive"}</p>
          <p>created_at: { data?.created_at}</p>
          <p>last_update_at: { data?.last_update_at}</p>
        </div>
      </div> */}

      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Edit FeatureWork
      </h1>{" "}
      <div className="mt-8">
  
        
    <label for="category" className="label my-2">
      <span className="label-text text-white text-lg font-semibold tracking-wider">Category</span>
    </label>
    <select id="categories" class="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " onChange={(e)=> setCategory(e.target.value)}>
      {/* <option selected>Choose a category</option> */}
      {pc?.results?.map((item, i) => { 
        return <>
          {
                category === item?.id ?
                <option value={item?.id} selected>{item?.category}</option>
                :
                <option value={item?.id}>{item?.category}</option>
              } 
        </>
      })}
      
    </select>

    <label className="label my-2">
      <span className="label-text text-white text-lg font-semibold tracking-wider">Product Name</span>
    </label>
    <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Product Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    />
    
    <label className="label my-2">
      <span className="label-text text-white text-lg font-semibold tracking-wider">Product Description</span>
    </label>
    <textarea type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Product Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    ></textarea>
    
    <label className="label">
      <span className="label-text text-white text-lg font-semibold tracking-wider">Photo</span>
    </label>
    <div className="h-52 border-2 border-dotted border-neutral-500 flex space-y-10 flex-col items-center justify-center">
        {/* <input type="file" className="btn btn-lg bg-green-800 border-none rounded" /> */}
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


  <div className="my-2 mt-3">
    <label
      htmlFor="example1"
      className="label-text text-white text-lg font-semibold tracking-wider"
    >
      File One
    </label>
    <input
      id="example1"
      type="file"
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

</div>
      <div className="flex items-center justify-center mb-4">
        <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e) => { UpdateFeatureWork(e) }}>Update</button>
      </div>
    </div>
  );
};

export default EditProduct;
