import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Base_URL } from '../../../../../Constant';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AdminUnAuth } from '../../../../../Auth_Middleware/UnAuth';



const UpdatePayment_Icon = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
  const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
      name: '',
      active:''
    });
    const countRef = useRef(0);
    // console.log(id);

    useEffect(() => {
        retrieveMenu();
    }, [countRef]);

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
    
    const retrieveMenu = async () => {
        await axios.get(Base_URL+`/api/admin-it/payment-icon/${id}/`, {
          headers:{
            Authorization: 'Bearer ' + userToken
          }
        })
        .then((response) => {
            setFormData({
              ...formData,
              name: response.data.name
            });
            // console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
      };    

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.patch(Base_URL+'/api/admin-it/payment-icon/'+ id + '/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + userToken
          },
        })
        .then((response) => {
          if (response.data.type === 'success') {
            toast.success(response.data.msg)
            navigate('/admin/it/payment')
          }
        }).catch((e)=>{
          AdminUnAuth(e)
        })
      } catch (error) {
        console.error('Image upload error:', error);
      }
  
      // console.log('Form Data:', formData);
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
              Icon
              </span>
            </label>
            <div className="h-52 border-2 border-dotted border-neutral-500 flex space-y-10 flex-col items-center justify-center">
              <p className=" text-2xl font-semibold tracking-wide">
                Drag and drop file here or click to upload
              </p>
              <p> {formData?.img?  formData.img.name   : ""} </p>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex h-10 w-64 flex-col items-center justify-center rounded cursor-pointer bg-green-800 dark:hover:bg-bray-800 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className=" tracking-wider">Choose File</p>
                  </div>
                  <input id="dropzone-file" type="file" 
                  name="icon" accept="image/*"
                  onChange={handleChange} className="" />
                </label>
              </div>
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
              name="name" 
              value={formData.name}
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

export default UpdatePayment_Icon;