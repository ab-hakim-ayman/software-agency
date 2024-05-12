import React from "react";
import axios from 'axios';
import { useEffect, useState, useRef } from "react";
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { Base_URL } from './../../../../Constant';
import { useParams } from 'react-router-dom';
import { AdminUnAuth } from "../../../../Auth_Middleware/UnAuth";

const UpdateGlobalLocation = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    country: '',
    office_address: '',
    email: '',
    contact_number: '',
  });

  const countRef = useRef(0);

  useEffect(() => {
      retrieveMenu();
  }, [countRef]);

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

  const retrieveMenu = () => {
    axios.get(Base_URL+`/api/admin-it/global-loc/${id}/`,{
        headers:{
            Authorization: 'Bearer ' + userToken
        }
    })
    .then((response) => {
        setFormData(response.data)
    })
    .catch((e)=>{
      AdminUnAuth(e)
    });
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.patch(Base_URL+`/api/admin-it/global-loc/${id}/`, formData, {
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
      }).catch((error) => {
        toast.error("Network error")
      })
    } catch (error) {
      toast.error("Notice creation failed")
    }    
  };
  return (
    <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Update Global Location
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
          name='country'
          value={formData.country}
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
          name='office_address'
          value={formData.office_address}
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
          name='email'
          value={formData.email}
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
          type="text"
          name='contact_number'
          value={formData.contact_number}
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Active
          </span>
        </label>
        <select id="type" name='active' value={formData.active} onChange={handleChange}
           className="mt-1 block w-full py-2 px-3 border border-gray-300  bg-blue-950  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">          
              <option value="true">True</option>
              <option value="false">False</option>
        </select>
      </div>
      <div className="flex items-center justify-center">
        <button type="submit" className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600">
          Update
        </button>
      </div>
      </form>
    </div>
  );
};

export default UpdateGlobalLocation;
