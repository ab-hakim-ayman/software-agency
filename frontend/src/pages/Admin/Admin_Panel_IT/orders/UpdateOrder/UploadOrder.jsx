
import { useState, useEffect, useRef } from 'react';
import { useNavigate ,useLocation  } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Base_URL } from '../../../../../Constant';
// deliver-order
export default function UploadOrder() {
    const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const location = useLocation();
    const navigate = useNavigate();
    const [IsLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        file: '',
    });

    useEffect(() => {
      if(location.state === null){
        window.history.go(-1);
      }
    }, [location.state])
    
    console.log(location.state); 
    console.log(formData);
    const handleChange = (e) => {
      console.log(e.target.files[0])
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0],
          });
        };

    
    // console.log(formData)
    const handleSubmit = (e) => {
        setIsLoading(true)
      e.preventDefault();
      try {
        axios.post(Base_URL+'/api/admin-it/deliver-order/'+ location?.state?.id +'/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + userToken
          }
        })
        .then((response) =>{
            setIsLoading(false)
          if (response.data.type === 'success'){            
            toast.success(response.data.msg)
            navigate('/admin/it/delivery-orders')
          } else {
            toast.error(response.data.msg)
          }
        }).catch((error) =>{
            setIsLoading(false)
          toast.error("Delivery failed!")
        })
      } catch (error) {
        setIsLoading(false)
        toast.error("Network error occured!")
      } 
    };

  return (
    <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Upload Order File
        </h1>{" "}
        <div className=" mt-8">
          <form onSubmit={handleSubmit}>
            
            <div className=" mt-8">
              <div className="my-2 mt-3">
                <label
                  htmlFor="example1"
                  className="label-text text-white text-lg font-semibold tracking-wider"
                >
                  File
                </label>
                <input
                  id="example1"
                  type="file"
                  name='file' required
                  onChange={handleChange}
                  accept="application/pdf"
                  className="block mt-2  border rounded border-neutral-500 w-full text-sm file:mr-4 file:border-0 file:bg-green-800 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
            <button disabled={IsLoading} type="submit" className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" >
               {IsLoading? "Loading... " : "Update Order"} 
            </button>
          </div>
        </form>
        </div>        
      </div>
  )
}
