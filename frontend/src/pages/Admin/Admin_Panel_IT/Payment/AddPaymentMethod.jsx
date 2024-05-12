import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Base_URL } from '../../../../Constant';


const AddPaymentMethod = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      method_name: '',
      active: ''
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
         axios.post(Base_URL+'/api/admin-it/payment-method/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + userToken
          },
        })
        .then((response)=>{
          if (response.data.type === 'success') {
            toast.success(response.data.msg);
            navigate('/admin/it/payment-method', {replace: true});
  
          } else {
            toast.error(response.data.msg);
          }
        }).catch((error)=>{
          toast.error("Payment method creation failed!")
          // console.log(error)
        })
        
      } catch (error) {
        toast.error("Network Error")
      } 
    };

    return (
        <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Create Payment Method
        </h1>{" "}
        <div className=" mt-8">
          <form onSubmit={handleSubmit}>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
              Name
              </span>
            </label>
            <input
              type="text"
              className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="method_name" required
              onChange={handleChange}
              placeholder='Payment method name...'
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

export default AddPaymentMethod;