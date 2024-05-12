import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Base_URL } from './../../../../Constant';
import { AdminUnAuth } from "../../../../Auth_Middleware/UnAuth";

const AddTechnologyCategory = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    icon: '',
    description: '',
    path: '',
    active : true

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
        await axios.get(Base_URL+'/api/admin-it/technologies-category/', {
          headers:{
            Authorization: 'Bearer ' + userToken
          }
        }).then((res)=>{ setCategory(res.data); })
        .catch((e)=>{ AdminUnAuth(e) });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post(Base_URL+'/api/admin-it/technology/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + userToken
        },
      })
      .then((response) => {
        // console.log(response)
        if (response.data.type === 'success') {
          toast.success(response.data.msg);
          navigate('/admin/it/technology');
        }else {
         toast.error(response.data.msg);
        }
      }).catch((e)=>{ AdminUnAuth(e) });
    } catch (error) {
      toast.error("Product creation failed")
    } 
    // console.log('Form Data:', formData);
    
  };

  return (
    <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
      <form onSubmit={handleSubmit}>
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Create Technology
      </h1>{" "}
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Name
          </span>
        </label>
        <input
          type="text"
          name="name" required
          onChange={handleChange}
          placeholder="Technology name..."
          className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Category
          </span>
        </label>
        <select id="type" name='category' required
          defaultValue={formData.category}
          onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300  bg-blue-950  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value=''>Select one </option>
            {category.map((item, i)=>(
              <option key={i} value={item.category}>{item.category} </option>
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
          name='description' required
          value={formData.description}
          onChange={handleChange}
          placeholder="Description..."
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
              <input name='icon' accept="image/*" required
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
          name='path' required
          value={formData.path}
          onChange={handleChange}
          placeholder="follow this way:   /seo"
          className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
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

export default AddTechnologyCategory;
