import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Base_URL } from './../../../../Constant';
const AddMember = () => {
    const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      full_Name: '',
      staff_title: '',
      mobileNumber: '',
      email: '',
      home_address: '',
      active : true
    });

    const handleChange = (e) => {
      const { name, value, files } = e.target;
  
      if (name === 'staff_img') {
        setFormData({
          ...formData,
          [name]: files[0],
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        axios.post(Base_URL+'/api/admin-it/company/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + userToken
          },
        })
        .then((response)=>{
          if (response.data.type === 'success'){
            toast.success(response.data.msg)
            navigate('/admin/it/company')
          } else {
            toast.error(response.data.msg)
          }
        }).catch((error)=>{
          toast.error("Network error")
        })
      } catch (error) {
        toast.error("Company creation failed")
      }
  
      // console.log('Form Data:', formData);
      
    };

    return (
        <div className=" bg-blue-950  px-10 pb-12 w-full h-full mt-12 text-white">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Create Member
        </h1>{" "}
        <div className=" mt-8">
          <form onSubmit={handleSubmit}>
            <label className="label">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
                Photo *
              </span>
            </label>
            <div className="h-52 border-2 border-dotted border-neutral-500 flex space-y-10 flex-col items-center justify-center">
              {/* <input type="file" className="btn btn-lg bg-green-800 border-none rounded" /> */}
              <p className=" text-2xl font-semibold tracking-wide">
                Drag and drop file here or click to upload
              </p>
              <p> {formData?.staff_img?  formData.staff_img.name   : ""} </p>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex h-10 w-64 flex-col items-center justify-center rounded cursor-pointer bg-green-800 dark:hover:bg-bray-800 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className=" tracking-wider">Choose image</p>
                  </div>
                  <input id="dropzone-file" type="file" 
                  name="staff_img" accept='image/*' required
                  onChange={handleChange} className="hidden" />
                </label>
              </div>
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
              Name
              </span>
            </label>
            <input
              type="text"
              className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="full_Name"
              required
              placeholder='Employee name...'
              onChange={handleChange}
            />
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
            Position</span>
            </label>
            <input
              type="text"
              className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="staff_title" 
              required
              placeholder='Employee title...'
              onChange={handleChange}
            />
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
            Phone</span>
            </label>
            <input
              type="number"
              className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="mobileNumber" 
              required
              onChange={handleChange}
              placeholder='Phone number...'
            />
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
            Email</span>
            </label>
            <input
              type="email"
              className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="email" 
              required
              placeholder='Company email...'
              onChange={handleChange}
            />
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
            Address</span>
            </label>
            <textarea
              className="h-32 px-4 py-2 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="home_address" 
              required
              onChange={handleChange}
              placeholder='Comapany address...'
            ></textarea>
            </div>
            <div className="flex items-center justify-center">
            <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" type="submit">
              Create
            </button>
          </div>
        </form>
        </div>        
      </div>
    );
};

export default AddMember;