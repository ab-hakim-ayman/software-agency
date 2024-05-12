import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AdminUnAuth } from './../../../../Auth_Middleware/UnAuth';
import { toast } from 'react-hot-toast';
import { Base_URL } from './../../../../Constant';



const UpdateServices = () => {
    const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
      noticeTitle: '',
      active: '',
    });
    const countRef = useRef(0);
    // console.log(id);

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
        axios.get(Base_URL+`/api/admin-it/notice/${id}/`,{
            headers:{
                Authorization: 'Bearer ' + userToken
            }
        })
        .then((response) => {
          setFormData({
            ...formData,
            noticeTitle: response.data[0].noticeTitle,
            active: response.data[0].active,
          })
        }).catch((e)=>{
          AdminUnAuth(e)
        });
      };    

      const handleSubmit = (e) => {
        e.preventDefault();
        try {
          axios.patch(Base_URL+`/api/admin-it/notice/${id}/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + userToken,
            },
          })
          .then((response) => {
            if (response.data.type === 'success') {
              toast.success(response.data.msg);
              navigate('/admin/it/notice');
            }else {
             toast.error(response.data.msg);
            }
          }).catch((error) => {
            toast.error("Network error")
          })
        } catch (error) {
          toast.error("Notice updation failed")
        }         
      };

    return (
        <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Update Notice
        </h1>{" "}
        <form onSubmit={handleSubmit}>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Name
          </span>
        </label>
        <input
          type="text"
          name='noticeTitle'
          value={formData.noticeTitle}
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
            name='file'
            accept=".pdf"
            onChange={handleChange}
            className="block mt-2  border rounded border-neutral-500 w-full text-sm file:mr-4 file:border-0 file:bg-green-800 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
          />
        </div>
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

export default UpdateServices;