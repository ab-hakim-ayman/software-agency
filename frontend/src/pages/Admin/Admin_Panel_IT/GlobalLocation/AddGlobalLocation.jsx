import React from "react";
import axios from 'axios';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { Base_URL } from './../../../../Constant';
import { AdminUnAuth } from "../../../../Auth_Middleware/UnAuth";

const AddProducts = () => {
  const navigate = useNavigate();
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
  const [formData, setFormData] = useState({
    country: '',
    office_address: '',
    email: '',
    contact_number: '',
    active : true
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
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
      axios.post(Base_URL+'/api/admin-it/global-loc/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + userToken
        },
      })
      .then((response) => {
        if (response.data.type === 'success') {
          toast.success(response.data.msg);
          navigate('/admin/it/global-location');
        }else {
         toast.error(response.data.msg);
        }
      }).catch((e)=>{
        AdminUnAuth(e)
      })
    } catch (error) {
      toast.error("Notice creation failed")
    }    
  };
  return (
    <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Create Global Location
      </h1>{" "}
      <form onSubmit={handleSubmit}>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Country
          </span>
        </label>
        <input
          type="text"
          name='country' required
          value={formData.country}
          placeholder="Country..."
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Office Address
          </span>
        </label>
        <textarea
          name='office_address' required
          value={formData.office_address}
          placeholder="Office Address..."
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
        ></textarea>
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Email
          </span>
        </label>
        <input
          type="text"
          name='email' required
          value={formData.email}
          placeholder="Email..."
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Contact Number
          </span>
        </label>
        <input
          type="number"
          name='contact_number' required
          value={formData.contact_number}
          placeholder="Contact number..."
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
        />
      </div>
      <div className="flex items-center justify-center">
        <button type="submit" className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600">
          Create
        </button>
      </div>
      </form>
    </div>
  );
};

export default AddProducts;
