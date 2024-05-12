import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Base_URL } from './../../../../Constant';
import { toast } from 'react-hot-toast';



const UpdateBottomBanner = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      link: '',
    });


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
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          await axios.get(Base_URL+`/api/admin-it/bottom-banner/${id}/`, {
            headers: {
              Authorization: 'Bearer ' + userToken
            }
          })
          .then((response) =>{
            console.log(response.data)
            setFormData({
              ...formData,
              title: response.data.title,
              description: response.data.description,
              link: response.data.link,
            })
          }).catch((error) =>{
            toast.error(error);
          })          
        } catch (error) {
          toast.error("Network error occured!")
        }
      };
    
      fetchData();
    }, []);  
    console.log(formData)
    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        axios.patch(Base_URL+'/api/admin-it/bottom-banner/'+ id + '/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + userToken
          }
        })
        .then((response) =>{
          if (response.data.type === 'success'){
            toast.success(response.data.msg)
            navigate('/admin/it/bottom-banner')
          } else {
            toast.error(response.data.msg)
          }
        }).catch((error) =>{
          toast.error("Banner update failed!")
        })
      } catch (error) {
        toast.error("Network error occured!")
      }  
    };

    return (
        <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Update Bottom Banner
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
                  name="img" accept="image/*"
                  onChange={handleChange} className="" />
                </label>
              </div>
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
              Title
              </span>
            </label>
            <input
              type="text"
              className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="title" 
              value={formData.title}
              onChange={handleChange}
            />
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
            Description</span>
            </label>
            <textarea
              className="h-32 px-4 py-2 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="description" 
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
            Link</span>
            </label>
            <input
              type="text"
              className="h-12 pl-4 w-full  bg-blue-950  border rounded border-neutral-500 "
              name="link" 
              value={formData.link}
              onChange={handleChange}
            />
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

export default UpdateBottomBanner;