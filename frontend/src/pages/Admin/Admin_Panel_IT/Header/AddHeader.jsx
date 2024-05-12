import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Base_URL } from './../../../../Constant';
import { AdminUnAuth } from '../../../../Auth_Middleware/UnAuth';


const AddHeader = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: '',
      baseroot: '',
      active : true
    });

    const handleChange = (e) => {
      const { name, value, files } = e.target;
        if (name === 'icon') {
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
         axios.post(Base_URL+'/api/admin-it/header/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + userToken
          },
        })
        .then((response)=>{
          if (response.data.type === 'success') {
            toast.success(response.data.msg);
            navigate('/admin/it/header', {replace: true});
  
          } else {
            toast.error(response.data.msg);
          }
        }).catch((e)=>{
          AdminUnAuth(e)
        })
        
      } catch (error) {
        toast.error("Network Error")
      } 
    };

    return (
        <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Create Header
        </h1>{" "}
        <div className=" mt-8">
          <form onSubmit={handleSubmit}>
            <label className="label">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
                Photo
              </span>
            </label>
            <div className="h-52 border-2 border-dotted border-neutral-500 flex space-y-10 flex-col items-center justify-center">
              {/* <input type="file" className="btn btn-lg bg-green-800 border-none rounded" /> */}
              <p className=" text-2xl font-semibold tracking-wide">
                Drag and drop file here or click to upload
              </p>
              <p> {formData?.icon?  formData.icon.name   : ""} </p>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex h-10 w-64 flex-col items-center justify-center rounded cursor-pointer bg-green-800 dark:hover:bg-bray-800 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className=" tracking-wider">Choose File</p>
                  </div>
                  <input id="dropzone-file" type="file" 
                  name="icon" accept="image/*" required
                  onChange={handleChange} className="" />
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
              name="name" required
              onChange={handleChange}
              placeholder='Header name...'
            />
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
                Path (ex : /it/path)
              </span>
            </label>
            <input
              type="text" required
              className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="baseroot" 
              onChange={handleChange}
              placeholder='follow this way: /it/path'
            />
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

export default AddHeader;