
import { useState, useEffect } from 'react';
import { useNavigate ,useLocation  } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Base_URL } from '../../../../../Constant';

export default function UpdateOrder() {
    const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const location = useLocation();
    const navigate = useNavigate();
    const [IsLoading, setIsLoading] = useState(false)
    const [AllOrderdata, setAllOrderdata] = useState('')
    const [formData, setFormData] = useState({
        total_price: '',
        delivery_date_from: '',
        delivery_date_to : ""
    });

    useEffect(() => {
      if(location.state === null){
        window.history.go(-1);
      }else{
        setAllOrderdata(location.state);
        setFormData({
            total_price: location.state?.total_price,
            delivery_date_from: location.state?.delivery_date_from,
            delivery_date_to : location.state?.delivery_date_to
        })
      }
    }, [location.state])
    
    console.log(location.state); 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        };

    
    // console.log(formData)
    const handleSubmit = (e) => {
        setIsLoading(true)
      e.preventDefault();
      if(formData.total_price >0){
      try {
        axios.patch(Base_URL+'/api/civil-admin/update-pending-order/'+ location?.state?.id +'/', formData, {
          headers: {
            Authorization: 'Bearer ' + userToken
          }
        })
        .then((response) =>{
            setIsLoading(false)
          if (response.data.type === 'success'){            
            toast.success(response.data.msg)
            navigate('/admin/civil/payment-orders')
          } else {
            toast.error(response.data.msg)
          }
        }).catch((error) =>{
            setIsLoading(false)
          toast.error("Payment update failed!")
        })
      } catch (error) {
        setIsLoading(false)
        toast.error("Network error occured!")
      }  }
      else{
        setIsLoading(false)
        toast.error("Please provide total price")
      }
    };

  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Update Order Data
        </h1>{" "}
        <div className=" mt-8">
          <form onSubmit={handleSubmit}>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
              Order data
              </span>
            </label>
            <input
              type="text"
              readOnly disabled
              className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
              value={"Order ID: "+AllOrderdata?.id+", Currency: "+AllOrderdata?.currency}
            />
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
                Total Price
              </span>
            </label>
            <input
              type="number" name='total_price' required
              className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
              value={formData?.total_price }
              onChange={handleChange}
            />
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
                Date from
              </span>
            </label>
            <input
              type="date" name='delivery_date_from' required
              className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
              value={formData?.delivery_date_from || ''}
              onChange={handleChange}
            />
            </div>
            <div>
            <label className="label my-2">
              <span className="label-text text-white text-lg font-semibold tracking-wider">
                Date to
              </span>
            </label>
            <input
              type="date" name='delivery_date_to' required
              className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
              value={formData?.delivery_date_to || ''}
              onChange={handleChange}
            />
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
