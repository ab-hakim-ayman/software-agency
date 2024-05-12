import React from "react";
import axios from 'axios';
import { useEffect, useState, useRef } from "react";
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Base_URL } from './../../../../../Constant';


const UpdateHeadOffice = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    usa_address: '',
    usa_email: '',
    usa_phone: '',
    usa_fax: '',
    uk_address: '',
    uk_email: '',
    uk_phone: '',
    uk_fax: ''
  });

  const countRef = useRef(0);

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
    axios.get(Base_URL+`/api/civil-admin/head-office/${id}/`,{
        headers:{
            Authorization: 'Bearer ' + userToken
        }
    })
    .then((response) => {
        setFormData(response.data)
    })
    .catch((e) => {
      console.error(e);
    });
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.patch(Base_URL+'/api/civil-admin/head-office/'+ id + '/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + userToken
        },
      })
      .then((response) => {
        if (response.data.type === 'success') {
          toast.success(response.data.msg);
          navigate('/admin/civil/head-office');
        }else {
         toast.error(response.data.msg);
        }
      }).catch((error) => {
        toast.error("Network error")
      })
    } catch (error) {
      toast.error("Head Office creation failed")
    }    
  };
  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Update Head Office
      </h1>{" "}
      <form onSubmit={handleSubmit}>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            USA Address
          </span>
        </label>
        <input
          type="text"
          name='usa_address' required
          value={formData.usa_address}
          placeholder="Usa Address..."
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            USA Email
          </span>
        </label>
        <input
          type="email"
          name='usa_email' required
          value={formData.usa_email}
          placeholder="USA Email..."
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            USA Phone
          </span>
        </label>
        <input
          type="number"
          name='usa_phone' required
          value={formData.usa_phone}
          placeholder="USA Phone..."
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            USA Fax
          </span>
        </label>
        <input
          type="text"
          name='usa_fax' required
          value={formData.usa_fax}
          placeholder="USA Fax..."
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            UK Address
          </span>
        </label>
        <input
          type="text"
          name='uk_address' required
          value={formData.uk_address}
          placeholder="UK Address..."
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            UK Email
          </span>
        </label>
        <input
          type="email"
          name='uk_email' required
          value={formData.uk_email}
          placeholder="UK Email..."
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            UK Phone
          </span>
        </label>
        <input
          type="number"
          name='uk_phone' required
          value={formData.uk_phone}
          placeholder="UK Phone..."
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            UK Fax
          </span>
        </label>
        <input
          type="text"
          name='uk_fax' required
          value={formData.uk_fax}
          placeholder="UK fax..."
          onChange={handleChange}
          className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
        />
      </div>
      <div>
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">
            Active
          </span>
        </label>
        <select id="type" name='active' value={formData.active} onChange={handleChange}
           className="mt-1 block w-full py-2 px-3 border border-gray-300  bg-slate-950  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">          
              <option value="true">True</option>
              <option value="false">False</option>
        </select>
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

export default UpdateHeadOffice;
