import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { AdminUnAuth } from "../../../../Auth_Middleware/UnAuth";
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { Base_URL } from './../../../../Constant';

const AddProducts = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    proName: '',
    category: '',
    proDescription: '',
    proImg: '',
    fileOne: '',
    fileTwo: '',
    fileThree: '',
    active : true
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if ((name === 'proImg') || (name === 'fileOne') || (name === 'fileTwo') || (name === 'fileThree')) {
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
        const response = await axios.get(Base_URL+'/api/admin-it/product-category/', {
          headers: {
            Authorization: 'Bearer ' + userToken
          }
        });
        setCategory(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post(Base_URL+'/api/admin-it/product/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + userToken
        },
      })
      .then((response) => {
        // console.log(response)
        if (response.data.type === 'success') {
          toast.success(response.data.msg);
          navigate('/admin/it/products');
        }else {
         toast.error(response.data.msg);
        }
      }).catch((error) => {
        toast.error("Network error")
      })
    } catch (error) {
      toast.error("Product creation failed")
    } 
    // console.log('Form Data:', formData);
    
  };
  // console.log(formData);
  return (
    <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Create Product
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
          name='proName'
          value={formData.proName}
          placeholder="Product name..."
          onChange={handleChange} required
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
          name='proDescription' required
          value={formData.proDescription}
          placeholder="Product description"
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
        ></textarea>
      </div>
      <div className=" mt-8">
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
          <p> {formData?.proImg?  formData.proImg.name   : ""} </p>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex h-10 w-64 flex-col items-center justify-center rounded cursor-pointer bg-green-800 dark:hover:bg-bray-800 "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className=" tracking-wider">Choose File</p>
              </div>
              <input name='proImg' accept="image/*" required
                onChange={handleChange} id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
        {/* ok */}

        <div className="my-2 mt-3">
          <label
            htmlFor="example1"
            className="label-text text-white text-lg font-semibold tracking-wider"
          >
            FileOne
          </label>
          <input
            id="example1"
            type="file"
            name='fileOne'
            onChange={handleChange}
            accept="application/pdf"
            className="block mt-2  border rounded border-neutral-500 w-full text-sm file:mr-4 file:border-0 file:bg-green-800 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
          />
        </div>

        <div className="my-2 mt-3">
          <label
            htmlFor="example1"
            className="label-text text-white text-lg font-semibold tracking-wider"
          >
            FileTwo
          </label>
          <input
            id="example1"
            type="file"
            name='fileTwo'
            onChange={handleChange}
            accept="application/pdf"
            className="block mt-2  border rounded border-neutral-500 w-full text-sm file:mr-4 file:border-0 file:bg-green-800 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
          />
        </div>

        <div className="my-2 mt-3">
          <label
            htmlFor="example1"
            className="label-text text-white text-lg font-semibold tracking-wider"
          >
            FileThree
          </label>
          <input
            id="example1"
            type="file"
            name='fileThree'
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
