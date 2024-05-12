import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios'
import { Base_URL } from "../../../../Constant";


const EditDetailsOfFeatureDesign = () => {

    const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [data, setData] = useState([])
    const [bed, setBed] = useState()
    const [bath, setBath] = useState()
    const [kitchen, setKitchen] = useState("")
    const [plan_description, setPlanDescription] = useState("")
    const [architecture, setArchitecture] = useState()
  
    const config = {
      headers: {
        "Content-type": "application/json",
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${adminToken}`,
      },
    };

    useEffect(() => {
      axios.get(Base_URL+`/api/civil-admin/details-feature-design/${id}/`, config)
        .then(res => {
          console.log("34 res.data", res.data);
          setData(res.data)
          setArchitecture(res.data.Architecture)
          setBed(res.data.bed)
          setBath(res.data.bath)
          setKitchen(res.data.kitchen)
          setPlanDescription(res.data.Plan_description)
        })
        .catch(err => console.log(err));
      
      axios.get(Base_URL+"/api/civil-admin/architecture/", config)
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    },[])
  
    
    const UpdateDetailOfFeatureDesign = (e) => {
      e.preventDefault()
      const data = {
        'Architecture': parseInt(architecture), 
        'bed': parseInt(bed), 
        'bath': parseInt(bath), 
        'kitchen': parseInt(kitchen), 
        'Plan_description': plan_description, 
      } 
      

      

      axios.patch(Base_URL+`/api/civil-admin/details-feature-design/${id}/`, data, config)
        .then(response => {
          // console.log(response.data)
          toast.success('DetailofFeatureDesign Edited Successfully')
          setTimeout(() => {
            navigate('/admin/civil/deatialofFeaturdesign')
          }, 1000);
          })
        .catch(err => console.log(err));
    }


    

    return (
      <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
        
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Edit Detail Of Feature Design
        </h1>{" "}
        <div className="mt-8">

      <label for="category" className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Architecture</span>
        </label>
        <select id="categories" class="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " onChange={(e)=> setArchitecture(e.target.value)}>
          {data?.results?.map((item, i) => { 
            return <>
            {
              parseInt(architecture) === item?.id ?
              <option key={i} value={item?.id} selected>{item?.name}</option>
              :
              ""
            } 
          </>
          })}
          
        </select>

        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Bed</span>
        </label>
        <input type="number" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Bed"
        value={bed}
        onChange={(e) => setBed(e.target.value)}
        />
        
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Bath</span>
        </label>
        <input type="number" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Bath"
        value={bath}
        onChange={(e) => setBath(e.target.value)}
        />
        
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Kitchen</span>
        </label>
        <input type="number" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Kitchen"
        value={kitchen}
        onChange={(e) => setKitchen(e.target.value)}
        />

        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Plan Description</span>
        </label>
        <textarea className="h-32 px-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Plan Description"
        value={plan_description}
        onChange={(e) => setPlanDescription(e.target.value)}
        ></textarea>
        
      </div>
        {/* Seo */}
     
        <div className="flex items-center justify-center mb-10">
          <button type="submit" className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e)=>{UpdateDetailOfFeatureDesign(e)}}>
            Update
          </button>
        </div>
      </div>
    );
};

export default EditDetailsOfFeatureDesign;