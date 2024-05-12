import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Base_URL } from './../../../../../Constant';

const AddFooterItem = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
  const navigate = useNavigate();
  const [section, setSection] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    link: '',
    order: '',
    footerSection: '',
  });

  const handleChange = (e) => {
    const { name, value} = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Base_URL+'/api/civil-admin/footer-section/', {
          headers: {
            Authorization: 'Bearer ' + userToken
          }
        });
        setSection(response.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post(Base_URL+'/api/civil-admin/footer-item/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + userToken
        },
      })
      .then((response) => {
        if (response.data.type === 'success') {
          toast.success(response.data.msg);
          navigate('/admin/civil/footer-item', {replace: true});
        } else {
          toast.error(response.data.msg);
        }
      }).catch((error)=>{
        toast.error("Network error")
      })
    } catch (error) {
        toast.error("Footer item creation failed")
    } 
    
  };

  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Add Footer Item
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
          name="name" 
          required
          placeholder="Item name..."
          value={formData.name}
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Description
          </span>
        </label>
        <textarea
          type="text"
          name="description" 
          required
          placeholder="Description..."
          value={formData.description}
          onChange={handleChange}
          className="h-32 px-4 py-2 w-full  bg-slate-950  border rounded border-neutral-500 "
          ></textarea>
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Link ( ex: /civil/path)
          </span>
        </label>
        <input
          type="text"
          name="link" 
          required
          onChange={handleChange}
          value={formData.link}
          title="follow this way : /civil/path"
          placeholder="follow this way : /civil/path"
          className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Order
          </span>
        </label>
        <input
          type="number"
          name="order" 
          required
          onChange={handleChange}
          value={formData.order}
          placeholder="Item order..."
          className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Section
          </span>
        </label>
        <select id="type" name='footerSection' 
          required
          onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300  bg-slate-950  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value=''>Select one </option>
            {section.map((item, i)=>(
              <option key={i} value={item.id}>{item.title} </option>
              ))
            }
        </select>
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

export default AddFooterItem;
