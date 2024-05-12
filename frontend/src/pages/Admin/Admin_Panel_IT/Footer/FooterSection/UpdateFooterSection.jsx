import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AdminUnAuth } from './../../../../../Auth_Middleware/UnAuth';
import { Base_URL } from './../../../../../Constant';


const UpdateFooterSection = () => {
    const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
    });
    const countRef = useRef(0);
    // console.log(id);

    useEffect(() => {
        retrieveMenu();
    }, [countRef]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'img') {
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
      axios.get(Base_URL+`/api/admin-it/footer-section/${id}/`,{
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      })
      .then((response) => {
          setFormData(response.data);
        }).catch((e)=>{
          AdminUnAuth(e)
        })
    };    
    // console.log(formData);

    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        axios.patch(Base_URL+'/api/admin-it/footer-section/'+ id + '/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + userToken
          },
        })
        .then((response) =>{
          if (response.data.type === 'success') {
            navigate('/admin/it/footer-section')
            toast.success(response.data.msg);
          } else {
            toast.error(response.data.msg);
          }
        }).catch((e)=>{
          AdminUnAuth(e)
        })
      } catch (error) {
        toast.error("Product category updation failed")
      }  
      // console.log('Form Data:', formData);
    };

    return (
        <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Update Footer Section
        </h1>{" "}
        <div className=" mt-8">
          <form onSubmit={handleSubmit}>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
              Title
              </span>
            </label>
            <input
              type="text"
              className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="title" 
              value={formData.title}
              onChange={handleChange}
            />
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

export default UpdateFooterSection;