// import React,{ useEffect, useState } from 'react';
// import { useLocation,useNavigate } from 'react-router-dom';


// const SelfOrderDetails = () => {
//     const location = useLocation();
//     const navigate = useNavigate()
//     const data = location.state;
//     console.log(data)
//     const [AllData, setAllData] = useState([])
//     const [userToken] = useState(localStorage.getItem('DTCUserToken'));
    
//     useEffect(() => {
//       if (!data || data === '' || data === null || Object.values(data).length === 0) {
//         navigate('/it/profile/Order', { replace : true } )
//       }
//     }, [data])
    

//     return (
//         <div className='h-screen'>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     {/* head */}
//                     <thead className='bg-gray-800 h-16  text-white'>
//                         <tr className='h-12 text-center text-md'>
//                             <th>SL</th>
//                             <th>ID</th>
//                             <th>Title</th>
//                             <th>Order Date</th>
//                             <th>Total Budget <br /> </th>
//                             <th>Total online <br /> paid </th>
//                             <th>Total offline <br /> paid </th>
//                             <th>Due payment</th>
//                             <th>Status</th>
//                             <th>Project Delivery</th>
//                             <th >Action </th>
//                         </tr>
//                     </thead>
//                     {/* <tbody className='text-center'>
//                         {
//                             AllData &&
//                             AllData.map((item, index) => {
//                                 return (
//                                     <tr key={index}>
//                                         <td> <span className='px-2 py-2 bg-blue-950 text-white '>{index + 1}</span> </td>
//                                         <td>{item.id}</td>
//                                         <td>{item.ProductIT.proName}</td>
//                                         <td>{item.create_at.slice(0,10)}</td>
//                                         <td>{item?.total_price || 'N/A'} <span>{item?.currency}</span> </td>
//                                         <td>{item?.total_online_paid || 'N/A'} <span>{item?.currency}</span> </td>
//                                         <td>{item?.total_offline_paid || 'N/A'} <span>{item?.currency}</span> </td>
//                                         <td>{item?.total_price - (item?.total_online_paid+ item?.total_offline_paid)} <span>{item?.currency}</span> </td>
//                                         {item?.status === 'pen' && <td className='font-semibold' > Pending </td>}
//                                         {item?.status === 'pay' && <td className='font-semibold'> <button className='btn px-3 border-[0.3px] border-blue-950 hover:border-blue-950'>Payment</button>  </td>}
//                                         {item?.status === 'can' && <td className='font-semibold'> Cancel </td>}
//                                         {item?.status === 'wor' && <td className='font-semibold'> Working </td>}
//                                         {item?.status === 'com' && <td className='font-semibold'> Completed </td>}
//                                         {item?.status === 'del' && <td className='font-semibold'> Delete </td>}
//                                         <td>{item?.delivery_date_from || 'N/A'} <br /> {item?.delivery_date_from|| 'N/A'} </td>
//                                         <td>
//                                             <Link  to={'/api/it/self-order-detail/'} className='me-2 px-2 py-1 bg-gray-800 text-white hover:bg-white hover:text-gray-800 border-[0.3px] border-gray-800 '>View</Link>
//                                         </td>
//                                     </tr>
//                                 )
//                             })
//                         }
                        
//                     </tbody> */}
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default SelfOrderDetails;