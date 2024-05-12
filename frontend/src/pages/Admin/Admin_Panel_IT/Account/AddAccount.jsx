import React from 'react';
import { useState , useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Base_URL } from './../../../../Constant';


const AddAccount = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const [method, setMethod] = useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      bank_name: '',
      country: '',
      account_details: '',
      bank_img: '',
      bar_code: '',
      payment_method: ''
    });

    const handleChange = (e) => {
      const { name, value, files } = e.target;
        if (name === 'bank_img' || name === 'bar_code') {
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
          const response = await axios.get(Base_URL+'/api/admin-it/payment-method/', {
            headers: {
              Authorization: 'Bearer ' + userToken
            }
          });
          setMethod(response.data);
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchData();
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      try {
         axios.post(Base_URL+'/api/admin-it/account/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + userToken
          },
        })
        .then((response)=>{
          if (response.data.type === 'success') {
            toast.success(response.data.msg);
            navigate('/admin/it/account', {replace: true});
  
          } else {
            toast.error(response.data.msg);
          }
        }).catch((error)=>{
          toast.error("Account creation failed!")
          // console.log(error)
        })
        
      } catch (error) {
        toast.error("Network Error")
      } 
    };

    return (
        <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Create Account
        </h1>{" "}
        <div className=" mt-8">
          <form onSubmit={handleSubmit}>
            <label className="label">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
                Bank Image
              </span>
            </label>
            <div className="h-52 border-2 border-dotted border-neutral-500 flex space-y-10 flex-col items-center justify-center">
              {/* <input type="file" className="btn btn-lg bg-green-800 border-none rounded" /> */}
              <p className=" text-2xl font-semibold tracking-wide">
                Drag and drop file here or click to upload
              </p>
              <p> {formData?.bank_img?  formData.bank_img.name   : ""} </p>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex h-10 w-64 flex-col items-center justify-center rounded cursor-pointer bg-green-800 dark:hover:bg-bray-800 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className=" tracking-wider">Choose Image</p>
                  </div>
                  <input id="dropzone-file" type="file" 
                  name="bank_img" accept="image/*" required
                  onChange={handleChange} className="" />
                </label>
              </div>
            </div>
            <label className="label">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
                Bar Code
              </span>
            </label>
            <div className="h-52 border-2 border-dotted border-neutral-500 flex space-y-10 flex-col items-center justify-center">
              {/* <input type="file" className="btn btn-lg bg-green-800 border-none rounded" /> */}
              <p className=" text-2xl font-semibold tracking-wide">
                Drag and drop file here or click to upload
              </p>
              <p> {formData?.bar_code?  formData.bar_code.name   : ""} </p>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file1"
                  className="flex h-10 w-64 flex-col items-center justify-center rounded cursor-pointer bg-green-800 dark:hover:bg-bray-800 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className=" tracking-wider">Choose Image</p>
                  </div>
                  <input id="dropzone-file1" type="file" 
                  name="bar_code" accept="image/*" required
                  onChange={handleChange} className="" />
                </label>
              </div>
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
              Bank Name
              </span>
            </label>
            <input
              type="text"
              className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="bank_name" required
              onChange={handleChange}
              placeholder='Bank name...'
            />
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
              Country
              </span>
            </label>
            <input
              type="text"
              className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="country" required
              onChange={handleChange}
              placeholder='Country name...'
            />
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
              Account Details
              </span>
            </label>
            <textarea
              className="h-32 px-4 py-2 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="account_details" required
              onChange={handleChange}
              placeholder='Account details...'
            ></textarea>
            </div>
            <div>
              <label className="label my-2">
                <span className="label-text text-white text-lg font-semibold tracking-wider">
                  Method Name
                </span>
              </label>
              <select id="type" name='payment_method' required
                onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300  bg-blue-950  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value=''>Select one </option>
                  {method.map((item, i)=>(
                    <option key={i} value={item.method_name}>{item.method_name} </option>
                    ))
                  }
              </select>
            </div>
            <div className="flex items-center justify-center">
            <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" type="submit">
              Create
            </button>
          </div>
        </form>
        </div>        
      </div>
    );
};

export default AddAccount;