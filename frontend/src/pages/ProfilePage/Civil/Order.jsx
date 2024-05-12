import React,{ useState,useEffect } from 'react';
import { Base_URL } from '../../../Constant';
import axios from 'axios';
import { UnAuth } from '../../../Auth_Middleware/UnAuth';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const Order = () => {
    const navigate = useNavigate();
    const [AllData, setAllData] = useState([])
    const [userToken] = useState(localStorage.getItem('DTCUserToken'));
    // Fetching user data
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(Base_URL+'/api/civil/self-order-view-all/', {
                    headers: {
                        Authorization: "Bearer " + userToken,
                    },
                })
                .then((res) => {
                    setAllData(res.data)
                }).catch((e) => {
                    UnAuth(e)
                })
            } catch (e) {
                toast.error('Network error!')
            }
        };
        if (userToken) {
            fetchData();
        }
    }, [userToken]);

    console.log(AllData)

    // function ViewDetailsPage(data){
    //     navigate('/civil/profile/self-order-detail', { state: data });
    // }

    function Get_PAyment(data){
        navigate('/civil/profile/make-payment', { state: data });
    }

    

    return (
        <div className='h-screen'>
            <h1 className='text-xl text-center text-yellow-600 py-4 font-semibold'>Civil Order List </h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className='bg-yellow-300 h-16  text-black'>
                        <tr className='h-12 text-center text-md'>
                            <th>SL</th>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Order Date</th>
                            <th>Total Budget <br /> </th>
                            <th>Total online <br /> paid </th>
                            <th>Total offline <br /> paid </th>
                            <th>Due payment</th>
                            <th>Status</th>
                            <th>Project Delivery</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {/* row 1 */}
                        {
                            AllData &&
                            AllData?.map((item, index) => {
                                return (
                                    <tr key={index} className={`${index%2 === 0 ? "bg-yellow-50": "bg-gray-50"}`}>
                                        <td> <span className='px-2 py-2 bg-yellow-300 text-black '>{index + 1}</span> </td>
                                        <td>{item.id}</td>
                                        <td>{item.ProductCivil.proName}</td>
                                        <td>{item.create_at.slice(0,10)}</td>
                                        <td>{item?.total_price || 'N/A'} <span>{item?.currency}</span> </td>
                                        <td>{item?.total_online_paid || 'N/A'} <span>{item?.currency}</span> </td>
                                        <td>{item?.total_offline_paid || 'N/A'} <span>{item?.currency}</span> </td>
                                        <td>{item?.total_price - (item?.total_online_paid+ item?.total_offline_paid)} <span>{item?.currency}</span> </td>
                                        {item?.status === 'pen' && <td className='font-semibold' > <span className='bg-yellow-300 text-black px-2 py-1 rounded-md'> Pending </span>  </td>}
                                        {item?.status === 'pay' && (item?.total_price !== (item?.total_online_paid+ item?.total_offline_paid)) && <td className='font-semibold'> <button onClick={()=>{Get_PAyment({item})}} className='btn px-3 border-[0.3px] hover:border-yellow-300 hover:text-yellow-300 bg-yellow-300 text-black '>Payment</button>  </td>}
                                        {item?.status === 'pay' && (item?.total_price === (item?.total_online_paid+ item?.total_offline_paid)) && <td className='font-semibold'> {item?.total_price>0 ?'Payment Complete' : "Price not Given"}  </td>}
                                        {item?.status === 'can' && <td className='font-semibold'> Cancel </td>}
                                        {item?.status === 'wor' && (item?.total_price !== (item?.total_online_paid+ item?.total_offline_paid)) && <td className='font-semibold'><button onClick={()=>{Get_PAyment({item})}} className='btn px-3 border-[0.3px] hover:border-yellow-300 hover:text-yellow-300 bg-yellow-300 text-black '>Working</button> </td>}
                                        {item?.status === 'wor' && (item?.total_price === (item?.total_online_paid+ item?.total_offline_paid)) && <td className='font-semibold'>Working </td>}
                                        {item?.status === 'com' && (item?.total_price !== (item?.total_online_paid+ item?.total_offline_paid)) && <td className='font-semibold'><button onClick={()=>{Get_PAyment({item})}} className='btn px-3 border-[0.3px] hover:border-yellow-300 hover:text-yellow-300 bg-yellow-300 text-black '>job Complete</button> </td>}
                                        {item?.status === 'com' && (item?.total_price === (item?.total_online_paid+ item?.total_offline_paid)) && <td className='font-semibold'> job Complete </td>}
                                        {item?.status === 'del' && <td className='font-semibold'> {
                                            <a className='p-1 border-[0.3px] border-slate-400' 
                                            href={item?.DeliveryFile?.length>0? Base_URL+item?.DeliveryFile?.[item?.DeliveryFile?.length-1]?.file : ''} 
                                            target="_blank" rel="noopener noreferrer">Delivered</a>
                                        } </td>}
                                        <td>{item?.delivery_date_from || 'N/A'} <br /> {item?.delivery_date_from|| 'N/A'} </td>
                                        {/* <td>
                                            <button onClick={()=>ViewDetailsPage(item)} className='me-2 px-2 py-1 bg-gray-800 text-white hover:bg-white hover:text-gray-800 border-[0.3px] rounded-md border-gray-800 '>View</button>
                                            
                                        </td> */}
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Order;