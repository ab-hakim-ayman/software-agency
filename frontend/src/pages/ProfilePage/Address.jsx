import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import InputType from '../../Component/CustomTags/InputType';
import axios from 'axios';
import { UnAuth } from './../../Auth_Middleware/UnAuth';
import { Base_URL } from './../../Constant';
import { toast } from 'react-hot-toast';

export default function Address() {
  const [IsLoading, setIsLoading] = useState(false)
  const [PresentAddress, setPresentAddress] = useState({
    country:"",
    State:"",
    city : "",
    houseRoad : "",
    zipCode:"",
  });

  const [PermanentAddress, setPermanentAddress] = useState({
    is_same: false,
    country:"",
    State:"",
    city : "",
    houseRoad : "",
    zipCode:"",
  });

  const [userToken] = useState(localStorage.getItem('DTCUserToken'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(Base_URL+'/api/user/self/', {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        })
        .then(response =>{
          setPresentAddress(response.data.PresentAddress[0]);
          setPermanentAddress(response.data.PermanentAddress[0]);
        }).catch((e)=>{
          UnAuth(e);
        })
      } catch (e) {
        toast.error('Network error When user data fetching ')
      }
    };

    if(userToken){
      fetchData();
    }
  }, [userToken]);

  function checkObjectValuesNotEmpty(obj){
    return Object.values(obj).every(value => value !== null && value !== undefined && value !== '');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    if(checkObjectValuesNotEmpty(PresentAddress) === true){
      try {
        axios.post(Base_URL+'/api/user/update-present/', PresentAddress, {
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        })
        .then((res)=>{
          if (res.data.type === "success") {
            setIsLoading(false)
            toast.success(res.data.msg);
        } else {
            // toast.error(res.data.msg);
            setIsLoading(false)
            toast.error("Something wrong! make sure you filled all data");
        }
        })
        .catch((e)=>{
          setIsLoading(false)
          UnAuth(e);
        })
      } catch (error) {
        setIsLoading(false)
        toast.log('Network Error');
      }
    }else{
      setIsLoading(false)
      toast.error("Please fill all data");
    }
    
  };

  const handlePermanentSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    if(checkObjectValuesNotEmpty(PermanentAddress) === true){
      try {
        axios.post(Base_URL+'/api/user/update-permanent/', PermanentAddress, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + userToken,
          },
        })
        .then((res)=>{
          if(res.data.type === "success"){
            setIsLoading(false)
            toast.success(res.data.msg);
          }else{
            setIsLoading(false)
            toast.error(res.data.msg);
          }
        })
        .catch((e)=>{
          setIsLoading(false)
          UnAuth(e);
        })
      } catch (error) {
        setIsLoading(false)
        toast.log('Network Error');
      }}
      else{
        setIsLoading(false)
        toast.error("Please fill all data");
      }
  };

  const handlePresentChange = (e) => {
    setPresentAddress({
      ...PresentAddress,
      [e.target.name]: e.target.value
    });
  };

  const handlePermanentChange = (e) => {
    if(e.target.name === "is_same"){
      setPermanentAddress({
        ...PermanentAddress,
        [e.target.name]: e.target.checked
      });
    }
    else{
      setPermanentAddress({
        ...PermanentAddress,
        [e.target.name]: e.target.value
      });
    }
  };

  return (
    <>
      <div className='flex justify-center items-center pt-8 pb-4 w-full'>
        {/* Present Address */}
        <div className="mx-8 my-8 w-full">
          <form onSubmit={handleSubmit} className="mt-5 border-gray-900/10 pb-5">
            <h2 className="text-center  text-3xl  font-bold leading-7 text-gray-900">Present Address</h2>
            <div className="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-3 my-1">
                <InputType label="House/Road No." type="text" name="houseRoad" value={PresentAddress?.houseRoad} onChange={handlePresentChange} />
              </div>
              <div className="sm:col-span-3 my-1">
                <InputType label="city" type="text" name="city" value={PresentAddress?.city} onChange={handlePresentChange} />
              </div>
              <div className="sm:col-span-3 my-1">
                <InputType label="State" type="text" name="State" value={PresentAddress?.State} onChange={handlePresentChange} />
              </div>
              <div className="sm:col-span-3 my-1">
                <InputType label="Country" type="text" name="country" value={PresentAddress?.country} onChange={handlePresentChange} />
              </div>
              <div className="sm:col-span-3 my-1">
                <InputType label="Zipcode" type="text" name="zipCode" value={PresentAddress?.zipCode} onChange={handlePresentChange} />
              </div>
            </div>
            <div className=" flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="md:w-[25%] rounded-md mt-3 bg-blue-950 p-3 font-semibold text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-none "
              >
                Update Present Address
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='flex justify-center items-center py-4 w-full'>
        {/* Present Address */}
        <div className="mx-8 my-8 w-full">
          <form onSubmit={handlePermanentSubmit} className="mt-5 border-gray-900/10 pb-5">
            <h2 className="text-center  text-3xl  font-bold leading-7 text-gray-900">Permanent Address</h2>
            <div className="mt-5 block">
              <Checkbox checked={PermanentAddress?.is_same} name='is_same' onChange={handlePermanentChange} className='shadow-sm hover:shadow-md border-[0.3px] border-slate-300 px-8 py-2 flex justify-around font-bold'>My Permanent Address is same as my Present Address</Checkbox>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-3 my-1">
                <InputType disabledPermanetADD={PermanentAddress?.is_same} label="House/Road No." type="text" name="houseRoad" value={PermanentAddress?.houseRoad} onChange={handlePermanentChange} />
              </div>
              <div className="sm:col-span-3 my-1">
                <InputType disabledPermanetADD={PermanentAddress?.is_same} label="city" type="text" name="city" value={PermanentAddress?.city} onChange={handlePermanentChange} />
              </div>
              <div className="sm:col-span-3 my-1">
                <InputType disabledPermanetADD={PermanentAddress?.is_same} label="State" type="text" name="State" value={PermanentAddress?.State} onChange={handlePermanentChange} />
              </div>
              <div className="sm:col-span-3 my-1">
                <InputType disabledPermanetADD={PermanentAddress?.is_same} label="Country" type="text" name="country" value={PermanentAddress?.country} onChange={handlePermanentChange} />
              </div>
              <div className="sm:col-span-3 my-1">
                <InputType disabledPermanetADD={PermanentAddress?.is_same} label="Zipcode" type="text" name="zipCode" value={PermanentAddress?.zipCode} onChange={handlePermanentChange} />
              </div>
            </div>
            <div className=" flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="md:w-[25%] rounded-md mt-3 bg-blue-950 p-3 font-semibold text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-none "
              >
                Update Permanent Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}