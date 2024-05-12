import React from "react";
import axios from 'axios';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Base_URL } from './../../../../../Constant';

const AddFooterSection = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
  });

  const handleChange = (e) => {
    const { name, value} = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post(Base_URL+`/api/civil-admin/footer-section/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + userToken
        },
      })
      .then((response)=>{
        if (response.data.type === 'success') {
          toast.success(response.data.msg);
          navigate('/admin/civil/footer-section', {replace: true});
        } else {
          toast.error(response.data.msg);
        }
      }).catch((error) => {
        toast.error("Footer section creation failed")
      })      
    } catch (error) {
        toast.error("Network error!");
    }
    // console.log('Form Data:', formData);
    
  };

  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      <form onSubmit={handleSubmit}>
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Create Footer Section
      </h1>{" "}
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Name
          </span>
        </label>
        <input
          type="text"
          name="title" required
          onChange={handleChange}
          placeholder="Name..."
          className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
        />
      </div>
      <div className="flex items-center justify-center">
        <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600">
          Create
        </button>
      </div>
      </form>
    </div>
  );
};

export default AddFooterSection;
