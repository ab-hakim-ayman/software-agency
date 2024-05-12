import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios'
import { Base_URL } from "../../../../Constant";


const EditEditImagesOfDetailsDesign = () => {

    const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [data, setData] = useState([])
    const [photo, setPhoto] = useState("")
    const [photoName, setPhotoName] = useState("")
    const [architecture, setArchitecture] = useState()
    
    console.log("19", data);



    const config = {
      headers: {
        "Content-type": "application/json",
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${adminToken}`,
      },
    };

    useEffect(() => {
      axios.get(Base_URL+`/api/civil-admin/images-details-design/${id}/`, config)
        .then(res => {
          console.log("34 res.data", res.data);
          setData(res.data)
          setArchitecture(res.data.DetailsDesign)
          
        })
        .catch(err => console.log(err));
      
      axios.get(Base_URL+"/api/civil-admin/details-feature-design/", config)
        .then(res => setData(res))
        .catch(err => console.log(err));
    },[])
  
    
    const UpdateImageOfDetailDesign = (e) => {
      e.preventDefault()
      var data1 = {}
      if (photo) {
        data1 = {
          'DetailsDesign': parseInt(architecture), 
          'img': photo,
        } 
      } else {
        data1 = {
          'DetailsDesign': parseInt(architecture), 
        } 
      }
      

      

      axios.patch(Base_URL+`/api/civil-admin/images-details-design/${id}/`, data1, config)
        .then(response => {
          // console.log(response.data)
          toast.success('ImageOfDetailDesign Edited Successfully')
          setTimeout(() => {
            navigate('/admin/civil/imagesOfDetailsDesign')
          }, 1000);
          })
        .catch(err => console.log(err));
    }


    

    return (
      <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
        
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Edit Image Of Detail Design
        </h1>{" "}
        <div className="mt-8">

      <label for="category" className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Architecture</span>
        </label>
        <select id="categories" class="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " onChange={(e)=> setArchitecture(e.target.value)}>
          {data?.data?.map((item, i) => { 
            return <>
            {
              architecture === item?.id ?
              <option key={i} value={item?.id} selected>{item?.Architecture_name}</option>
              :
              <option key={i} value={item?.id} selected>{item?.Architecture_name}</option>
            } 
          </>
          })}
          
          </select>
          
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

        
        
      </div>
        {/* Seo */}
     
        <div className="flex items-center justify-center mb-10">
          <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e)=>{UpdateImageOfDetailDesign(e)}}>
            Update
          </button>
        </div>
      </div>
    );
};

export default EditEditImagesOfDetailsDesign;