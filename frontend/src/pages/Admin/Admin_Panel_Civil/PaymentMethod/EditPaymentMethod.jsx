import React, { useState, useEffect } from "react";

import toast from 'react-hot-toast';


import { useNavigate, useParams } from "react-router-dom";

import axios from 'axios'
import { Base_URL } from "../../../../Constant";


const EditPaymentMethod = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));

  const [method_name, setMethodName] = useState("")
  const [Data, setData] = useState([])



  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
  };

  useEffect(() => {
    axios.get(Base_URL+`/api/civil-admin/payment-method/${id}/`, config)
      .then(res => {
        setData(res.data)
        setMethodName(res.data.method_name)
      })
      .catch(err => console.log(err));
  },[])

  const updatePaymentMethod = (e) => {
    e.preventDefault()
    const data = {
      'method_name': method_name, 
    } 
 
  
    axios.patch(Base_URL+`/api/civil-admin/payment-method/${id}/`, Data, config)
      .then(response => {
        // console.log(response.data)
        toast.success('PaymentMethod edited Successfully')
        setTimeout(() => {
          navigate('/admin/civil/paymentMethod');
        }, 1000);
       
        
        })
      .catch(err => console.log(err));
  }

  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-8">
        Edit Payment Method
      </h1>{" "}
      <div className=" mt-8">
        
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Category</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Category"
          value={method_name}
          onChange={(e) => setMethodName(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center">
      <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e)=>{updatePaymentMethod(e)}}>Update</button>
      </div>
      
    </div>
  );
};

export default EditPaymentMethod;
