import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Base_URL } from './../../../../Constant';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const UpdateMember = () => {
    const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
      full_Name: '',
      staff_title: '',
      mobileNumber: '',
      email: '',
      home_address: '',
    });
    const countRef = useRef(0);
    // console.log(id);

    useEffect(() => {
        retrieveMenu();
    }, [countRef]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'staff_img') {
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
        axios.get(Base_URL+`/api/admin-it/company/${id}/`, {
          headers: {
            Authorization: 'Bearer ' + userToken
          }
        })
        .then((response) => {
            setFormData({
              ...formData,
              full_Name: response.data[0].full_Name,
              staff_title: response.data[0].staff_title,
              mobileNumber: response.data[0].mobileNumber,
              email: response.data[0].email,
              home_address: response.data[0].home_address,
            });
            // console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
      };    

    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        axios.patch(Base_URL+'/api/admin-it/company/'+ id + '/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + userToken
          },
        })
        .then((response) => {
          if (response.data.type === 'success') {
            toast.success(response.data.msg)
            navigate('/admin/it/company')
          } else {
            toast.error(response.data.msg)
          }
        }).catch((error) => {
          toast.error("Network error")
        })
      } catch (error) {
        toast.error("Company updation failed")
      }
  
      // console.log('Form Data:', formData);
    };

    return (
        <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Update Member
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
              <p> {formData?.staff_img?  formData.staff_img.name   : ""} </p>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex h-10 w-64 flex-col items-center justify-center rounded cursor-pointer bg-green-800 dark:hover:bg-bray-800 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className=" tracking-wider">Choose File</p>
                  </div>
                  <input id="dropzone-file" type="file" 
                  name="staff_img" accept='image/*'
                  onChange={handleChange} className="hidden" />
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
              name="full_Name" 
              value={formData.full_Name}
              onChange={handleChange}
            />
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
            Position</span>
            </label>
            <input
              type="text"
              className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="staff_title" 
              value={formData.staff_title}
              onChange={handleChange}
            />
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
            Phone</span>
            </label>
            <input
              type="number"
              className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="mobileNumber" 
              value={formData.mobileNumber}
              onChange={handleChange}
            />
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
            Email</span>
            </label>
            <input
              type="email"
              className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="email" 
              value={formData.email}
              onChange={handleChange}
            />
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
            Address</span>
            </label>
            <textarea
              className="h-32 px-4 py-2 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="home_address" 
              value={formData.home_address}
              onChange={handleChange}
            ></textarea>
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

export default UpdateMember;