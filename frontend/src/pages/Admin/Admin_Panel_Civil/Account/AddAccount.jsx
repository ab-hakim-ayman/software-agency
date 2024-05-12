import React, { useState, useEffect } from "react";


import toast from 'react-hot-toast';

import axios from 'axios'
import { Base_URL } from "../../../../Constant";

const AddAccount = () => {
  
  const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));
  const [paymentMethod, setPaymentMethod] = useState()
  const [bankname, setBankName] = useState("")
  const [country, setCountry] = useState("")
  const [account_detail, setAccountDetail] = useState("")
  const [bank_photo, setBankPhoto] = useState("")
  const [bar_code_photo, setBarCodePhoto] = useState("")
  const [bankphotoName, setBankPhotoName] = useState("")
  const [barcodephotoName, setBarCodePhotoName] = useState("")

  const [data, setData] = useState([])
  // console.log("21 data", data);


  const config = {
    headers: {
      "Content-type": "application/json",
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${adminToken}`,
    },
  };

  
  useEffect(() => {
    axios.get(Base_URL+"/api/civil-admin/payment-method/", config)
      .then(res => setData(res))
      .catch(err => console.log(err));
  },[])


  const CreateCompanyAccount = (e) => {
    e.preventDefault()
    const data = {
      'payment_method': parseInt(paymentMethod), 
      'bank_name': bankname, 
      'country': country, 
      'account_details': account_detail, 
      'bank_img': bank_photo, 
      'bar_code': bar_code_photo, 
      'active': true,
    } 

    
  
    axios.post(Base_URL+"/api/civil-admin/company-account/", data, config)
      .then(response => {
        console.log(response.data)
        toast.success('Company Account created Successfully')
        })
      .catch(err => console.log(err));
  }


  return (
    <div className=" bg-slate-900   px-10 w-full h-full mt-12 text-white">
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Add Company Account
      </h1>{" "}
      <div className="mt-8">

      <label for="category" className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Payment Method</span>
        </label>
        <select id="categories" class="h-12 pl-4 w-full  bg-slate-900   border rounded border-neutral-500 " onChange={(e)=> setPaymentMethod(e.target.value)}>
          <option selected>Choose Payment Method</option>
          {data?.data?.map((item, i) => { 
            return <>
              <option value={item?.id}>{item?.method_name}</option>
            </>
          })}
          
        </select>

        <label className="label">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Bank Image</span>
        </label>
        <div className="h-52 border-2 border-dotted border-neutral-500 flex space-y-10 flex-col items-center justify-center">
            <p className=" text-2xl font-semibold tracking-wide">Drag and drop file here or click to upload</p>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file2" className="flex h-10 w-64 flex-col items-center justify-center rounded cursor-pointer bg-green-800 dark:hover:bg-bray-800 ">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className=" tracking-wider">Choose File</p>
                    </div>
              <input id="dropzone-file2" type="file" className="hidden"  name="bank_img"
                onChange={(e) => {
                  setBankPhoto(e.target.files[0])
                  setBankPhotoName(e.target.files[0].name)
                }}
              />
                </label>
          </div> 
          <span className="text-1xl font-semibold tracking-wide mb-2">{ bankphotoName ? bankphotoName : ""}</span>
        </div>
        
        <label className="label">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Bar Code</span>
        </label>
        <div className="h-52 border-2 border-dotted border-neutral-500 flex space-y-10 flex-col items-center justify-center">
            <p className=" text-2xl font-semibold tracking-wide">Drag and drop file here or click to upload</p>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file3" className="flex h-10 w-64 flex-col items-center justify-center rounded cursor-pointer bg-green-800 dark:hover:bg-bray-800 ">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className=" tracking-wider">Choose File</p>
                    </div>
              <input id="dropzone-file3" type="file" className="hidden" name="bar_code"
                onChange={(e) => {
                  setBarCodePhoto(e.target.files[0])
                  setBarCodePhotoName(e.target.files[0].name)
                }}
              />
                </label>
          </div> 
          <span className="text-1xl font-semibold tracking-wide mb-2">{ barcodephotoName ? barcodephotoName : ""}</span>
        </div>


        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Bank Name</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-900   border rounded border-neutral-500 " placeholder="Enter Bank Name"
        value={bankname}
        onChange={(e) => setBankName(e.target.value)}
        />
        

        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Country</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-900   border rounded border-neutral-500 " placeholder="Enter Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        />

        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Account Details</span>
        </label>
        <textarea className="h-32 px-4 py-2 w-full  bg-slate-900   border rounded border-neutral-500 " placeholder="Enter Account Details"
        value={account_detail}
        onChange={(e) => setAccountDetail(e.target.value)}
        ></textarea>

      </div>
      <div className="flex items-center justify-center mb-10">
      <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e)=>{CreateCompanyAccount(e)}}>Create</button>
      </div>
    </div>
  );
};

export default AddAccount;
