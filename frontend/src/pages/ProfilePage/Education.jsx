import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InputType from '../../Component/CustomTags/InputType';
import { UnAuth } from './../../Auth_Middleware/UnAuth';
import { Base_URL } from './../../Constant';
import { toast } from 'react-hot-toast';

export default function Education() {
  const [education, setEducation] = useState({})
  const [IsLoading, setIsLoading] = useState(false)


  const [userToken] = useState(localStorage.getItem('DTCUserToken'));
  useEffect(() => {
    const fetchData = async () => {
        try {
            await axios.get(Base_URL + '/api/user/self/', {
                headers: {
                  Authorization: "Bearer " + userToken,
                },
            }).then(response => {
                  setEducation(response.data.Education[0]);
            }).catch((e) => {
                UnAuth(e)
            })
        } catch (e) {
            toast.error('Network error When Education data fetching ')
        }
    };
    if (userToken) {
        fetchData();
    }
  }, [userToken]);

  const handleEducationInfo = (e) => {
    setEducation({
      ...education,
      [e.target.name]: e.target.value,
    });
  };

  function checkObjectValuesNotEmpty(obj){
    return Object.values(obj).every(value => value !== null && value !== undefined && value !== '');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    if(checkObjectValuesNotEmpty(education) === true){
      try {
        axios.post(Base_URL + '/api/user/update-education/', education, {
            headers: {
                Authorization: 'Bearer ' + userToken,
            },
        })
        .then((res) => {
            if (res.data.type === "success") {
                toast.success(res.data.msg);
                setIsLoading(false)
            } else {
                toast.error(res.data.msg);
                setIsLoading(false)
            }
        })
        .catch((e) => {
            UnAuth(e);
            setIsLoading(false)
        })
      } catch (error) {
          toast.error('Network Error');
          setIsLoading(false)
      }
    }else{
      toast.error('Please fill all fields');
      setIsLoading(false)
    }
  };
  return (
    <>
<div className='flex justify-center items-center py-8 w-full h-screen'>
  <div className='mx-8 my-8 w-full'>
    <form onSubmit={handleSubmit}>
      <div className='mt-5 border-gray-900/10 pb-5'>
        <h2 className='text-center text-3xl font-bold leading-7 text-gray-900'>
          Educational Qualification
        </h2>
        <div className='mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-6'>
          <div className='sm:col-span-3 my-4'>
            <InputType
              label='Institute Name'
              type='text'
              name='institute'
              value={education?.institute}
              onChange={handleEducationInfo}
            />
          </div>
          <div className="sm:col-span-3 my-4">
            <InputType 
              label="Degree Name" 
              type="text" 
              name="degree_name" 
              value={education?.degree_name}    
              onChange={handleEducationInfo} 
            />                
          </div>
          <div className="sm:col-span-3 my-4">
            <InputType 
              label="Course Name" 
              type="text" 
              name="course_name" 
              value={education?.course_name} 
              onChange={handleEducationInfo} 
            />
          </div>
          <div className="sm:col-span-3 my-4">
            <InputType 
              label="Start From " 
              type="month" 
              name="from_year" 
              value={education?.from_year} 
              onChange={handleEducationInfo} 
            />
          </div>
          <div className="sm:col-span-3 my-4">
            <InputType 
              label="End To" 
              type="month" 
              name="to_year" 
              value={education?.to_year} 
              onChange={handleEducationInfo} 
            />
          </div>
          <div className="sm:col-span-3 my-4">
            <InputType 
              label="Grade" 
              type="text" 
              name="grade" 
              value={education?.grade} 
              onChange={handleEducationInfo} 
            />
          </div>
        </div>
        <div className='flex items-center justify-end gap-x-6'>
          <button
          disabled={IsLoading}
            type='submit'
            className='md:w-[25%] rounded-md mt-3 bg-blue-950 p-3 font-semibold text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-none'
          >
            {IsLoading? "Loading..." : "Update Education"}
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
    </>
  )
}
