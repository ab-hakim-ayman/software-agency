import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Base_URL } from './../../../../Constant';
import { AdminUnAuth } from '../../../../Auth_Middleware/UnAuth';



const UpdateServices = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const navigate = useNavigate();
    const { id } = useParams();
    const [category, setCategory] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        path: '',
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
    
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Base_URL+'/api/admin-it/technologies-category/', {
          headers:{
            Authorization: 'Bearer ' + userToken,
          }
        });
        setCategory(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

    const retrieveMenu = () => {
      axios.get(Base_URL+`/api/admin-it/technology/${id}/`, {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      })
      .then((response) => {
        setFormData({
          ...formData,
          category: response.data[0].category.id,
          name: response.data[0].name,
          description: response.data[0].description,
          path: response.data[0].path
        })
      })
      .catch((e)=>{ AdminUnAuth(e) });
    };    


    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        axios.patch(Base_URL+`/api/admin-it/technology/${id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + userToken
          },
        })
        .then((response) => {
          if (response.data.type === 'success') {
            toast.success(response.data.msg);
            navigate('/admin/it/technology');
          }else {
           toast.error(response.data.msg);
          }
        }).catch((error) => {
          toast.error("Network error")
        })
      } catch (error) {
        toast.error("Product updation failed")
      } 
      // console.log('Form Data:', formData);
      
    };

    return (
        <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
      <form onSubmit={handleSubmit}>
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Update Technology
      </h1>{" "}
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Name
          </span>
        </label>
        <input
          type="text"
          name="name" 
          value={formData.name}
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Category
          </span>
        </label>
        <select id="type" name='category'
          onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300  bg-blue-950  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value=""> Select One </option>
            {category.map((item, i)=>(
              <option key={i} value={item.id}>{item.category} </option>
              ))
            }
        </select>
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Description
          </span>
        </label>
        <textarea
          name='description'
          value={formData.description}
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
        ></textarea>
      </div>
      <div>
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
          <p> {formData?.icon?  formData.icon.name   : ""} </p>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex h-10 w-64 flex-col items-center justify-center rounded cursor-pointer bg-green-800 dark:hover:bg-bray-800 "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className=" tracking-wider">Choose File</p>
              </div>
              <input name='icon' accept='image/*'
                onChange={handleChange} id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
        </div>
        <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
          Path (Ex: /seo)
          </span>
        </label>
        <input
          type="text"
          name='path'
          placeholder='follow this way : /seo'
          value={formData.path}
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
        />
      </div>
      <div className="flex items-center justify-center">
        <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600">
          Update
        </button>
      </div>
      </form>
    </div>       
    );
};

export default UpdateServices;