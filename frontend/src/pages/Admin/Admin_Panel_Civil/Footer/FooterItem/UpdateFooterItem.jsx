import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Base_URL } from './../../../../../Constant';

const UpdateFooterItem = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const navigate = useNavigate();
    const { id } = useParams();
    const [section, setSection] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        link: '',
        order: '',
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
        axios.get(Base_URL+`/api/civil-admin/footer-item/${id}/`, {
          headers: {
            Authorization: 'Bearer ' + userToken
          }
        })
        .then((response) => {
            const data = response.data
            setFormData({...formData, link:data.link,  name : data.name , order: data.order, description: data.description});
          })
          .catch((e) => {
            console.error(e);
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
        axios.patch(Base_URL+'/api/civil-admin/footer-item/'+ id + '/', formData, {
          headers: {
            Authorization: 'Bearer ' + userToken
          }
        })
        .then((response) => {
          if (response.data.type === 'success') {
            navigate('/admin/civil/footer-item')
            toast.success(response.data.msg);
          } else {
            toast.error(response.data.msg);
          }
        }).catch((error) => {
          toast.error("Network error")
        })
      } catch (error) {
        toast.error("Footer Item updation failed")
      }  
      // console.log('Form Data:', formData);
    };

    return (
        <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Update Product Category
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
          name="name" 
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
          placeholder='Description'
          value={formData.description}
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
        ></textarea>
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Link (Ex: /civil/path)
          </span>
        </label>
        <input
          type="text"
          name="link" 
          value={formData.link}
          placeholder="follow this way : /civil/path"
          onChange={handleChange}
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
          type="text"
          name="order" 
          value={formData.order}
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
        />
      </div>
      {/* <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Section
          </span>
        </label>
        <select id="type" name='footerSection' defaultValue={formData.footerSection} required
          onClick={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300  bg-slate-950  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value=''>Select one </option>
            {section.map((item, i)=>(
              <option key={i} value={item.title}>{item.title} </option>
              ))
            }
        </select>
      </div> */}
      <div className="flex items-center justify-center">
        <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600">
          Update 
        </button>
      </div>
      </form>
        </div>        
      </div>
    );
};

export default UpdateFooterItem;