import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { AdminUnAuth } from "../../../../Auth_Middleware/UnAuth";
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { Base_URL } from './../../../../Constant';

const AddProducts = () => {
  const navigate = useNavigate();
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
  const [notice, setNotice] = useState([]);
  const [formData, setFormData] = useState({
    noticeTitle: '',
    file: '',
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
      axios.post(Base_URL+'/api/admin-it/notice/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + userToken
        },
      })
      .then((response) => {
        if (response.data.type === 'success') {
          toast.success(response.data.msg);
          navigate('/admin/it/notice');
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
        Create Notice
      </h1>{" "}
      <form onSubmit={handleSubmit}>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Title
          </span>
        </label>
        <input
          type="text"
          name='noticeTitle' required
          value={formData.noticeTitle}
          placeholder="Notice title..."
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
        />
      </div>
      <div className=" mt-8">
        <div className="my-2 mt-3">
          <label
            htmlFor="example1"
            className="label-text text-white text-lg font-semibold tracking-wider"
          >
            File
          </label>
          <input
            id="example1"
            type="file"
            name='file' required
            onChange={handleChange}
            accept="application/pdf"
            className="block mt-2  border rounded border-neutral-500 w-full text-sm file:mr-4 file:border-0 file:bg-green-800 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
          />
        </div>
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
