import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Base_URL } from '../../../../Constant';



const UpdatePaymentMethod = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const navigate = useNavigate();
    const { id } = useParams();
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

    
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          await axios.get(Base_URL+`/api/admin-it/payment-method/${id}/`, {
            headers: {
              Authorization: 'Bearer ' + userToken
            }
          })
          .then((response) =>{
            console.log(response.data)
            setFormData({
              ...formData,
              method_name: response.data.method_name,
              active: response.data.active,
            })
          }).catch((error) =>{
            toast.error(error);
          })          
        } catch (error) {
          toast.error("Network error occured!")
        }
      };
    
      fetchData();
    }, []);  
    // console.log(formData)
    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        axios.patch(Base_URL+'/api/admin-it/payment-method/'+ id + '/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + userToken
          }
        })
        .then((response) =>{
          if (response.data.type === 'success'){
            toast.success(response.data.msg)
            navigate('/admin/it/payment-method')
          } else {
            toast.error(response.data.msg)
          }
        }).catch((error) =>{
          toast.error("Payment update failed!")
        })
      } catch (error) {
        toast.error("Network error occured!")
      }  
    };

    return (
        <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Update Payment Method
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
              name="method_name" 
              value={formData.method_name}
              onChange={handleChange}
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
            <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" type="submit">
              Update
            </button>
          </div>
        </form>
        </div>        
      </div>
    );
};

export default UpdatePaymentMethod;