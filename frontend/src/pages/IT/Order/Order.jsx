import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '../../../Component/Order/Card'
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import { Base_URL } from './../../../Constant';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { UnAuth } from './../../../Auth_Middleware/UnAuth';

export default function Order() {
  const [ categories, setCategories ] = useState([]);
  const [ products, setProducts ] = useState([]);
  const [ selectedCategory, setSelectedCategory ] = useState('all');
  const [userToken] = useState(localStorage.getItem('DTCUserToken'));

  const history = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
    try {
        await axios.get(Base_URL+'/api/it/product/', {
        headers: {
            Authorization: "Bearer " + userToken,
        },
        })
        .then(response =>{
            setProducts(response.data);
            const CatArray = response.data.map((data)=> {return data.category_name} )
            const uni_cat =  new Set(CatArray)
            setCategories(Array.from(uni_cat));
        }).catch((e)=>{
            UnAuth(e)
        })
    } catch (e) {
        toast.error('Network error When user data fetching ')
    }
    };

    if(userToken){
        fetchData();
    }else{
      toast.error("you are unable to see order without login")
    }  
  }, [userToken]);

  const handleButtonClick = (e) => {
    const dataToPass = {
      id: e,
    };

    history.push({
      pathname: '/order-form-page',
      state: dataToPass,
    });
  };
  
  return (
    <div>
      <div className='lg:mx-auto w-full lg:w-5/7 mt-10 '>
        <div className="mx-auto w-auto flex flex-row justify-center bg-slate-100 py-4">
          <div className="text-white text-sm lg:text-md lg:flex flex cursor-pointer">
            {/* <Slider {...settings}> */}
                <div onClick={()=>{setSelectedCategory('all')}} className={`${selectedCategory === 'all'? ' bg-slate-50 border-blue-900 text-blue-950 ' : " bg-blue-900 text-white border-blue-950  "} " border p-2 lg:p-3 rounded-sm me-1 lg:me-3 flex gap-0 lg:gap-1 "`}>All</div>
                {Array.isArray(categories) && categories.map((item, i) => {
                  return <div key={i} onClick={()=>setSelectedCategory(item)} className={`${selectedCategory === item? ' bg-slate-50 border-blue-900 text-blue-950 ' : " bg-blue-900 text-white border-blue-950  "} " border p-2 lg:p-3 rounded-sm me-1 lg:me-3 flex gap-0 lg:gap-1 "`}>{item}</div>
                })
                }
            {/* </Slider>     */}
          </div>
        </div>
      </div>
      <div className=" mb-24 bg-[#ffffff]  w-full mx-0 block">
        <div className="flex flex-wrap justify-center p-10">
                
        {Array.isArray(products) ? (
          products.map((item, i) => {
            return selectedCategory === 'all' ?
             (<Card key={i} item={item} onClick={() => handleButtonClick('1')} path="it" />)
             :
             item.category_name === selectedCategory && (<Card key={i} item={item} onClick={() => handleButtonClick('1')} path="it" />)
          })
        ) : (
          <div>No product available</div>
        )}
        </div>
      </div>
    </div>
  )
}
