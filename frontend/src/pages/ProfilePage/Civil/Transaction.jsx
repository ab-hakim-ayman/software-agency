import React, { useEffect, useState } from 'react';
import { UnAuth } from '../../../Auth_Middleware/UnAuth';
import { Base_URL } from '../../../Constant';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Modal } from 'antd';

const Order = () => {
    
    const [AllTransavtionData, setAllTransavtionData] = useState([])
    const [open, setOpen] = useState(false)
    const [Image, setImage] = useState('')
    const [userToken] = useState(localStorage.getItem('DTCUserToken'));
    // Fetching user data
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(Base_URL+'/api/civil/get-all-transaction/', {
                    headers: {
                        Authorization: "Bearer " + userToken,
                    },
                })
                .then((res) => {
                    console.log(res)
                    setAllTransavtionData(res.data)
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

    return (
        <div className=' h-screen'>
            <h1 className='text-xl text-center text-yellow-600 py-4 font-semibold'> Civil Transaction List </h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className='bg-yellow-300 h-16  text-black'>
                        <tr className='h-12 text-center text-md'>
                            <th>SL</th>
                            <th>Trans ID</th>
                            <th>Order Number</th>
                            <th>Username</th>
                            <th>Transaction ID</th>
                            <th>Payment Date</th>
                            <th>Email </th>
                            <th>Phone </th>
                            <th>Account Info </th>
                            <th>Deposite Bank </th>
                            <th>Amount </th>
                            <th>Document </th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {/* row 1 */}
                        {
                            AllTransavtionData?.map((item, index) => {
                                return (
                                    <tr key={index} className={`${index%2 === 0 ? "bg-yellow-50": "bg-gray-50"}`}>
                                        <td>{index + 1}</td>
                                        <td>{item?.id}</td>
                                        <td>{item?.order}</td>
                                        <td>{item?.user}</td>
                                        <td>{item?.Transaction_id}</td>
                                        <td>{item?.created_at.slice(0,10)}</td>
                                        <td>{item?.acc_holder_mail}</td>
                                        <td>{item?.acc_holder_phone}</td>
                                        <td>{item?.account_Info}</td>
                                        <td>{item?.bank}</td>
                                        <td>{item?.amount}</td>
                                        <td>
                                            <div onClick={()=>{setImage(Base_URL+item?.pay_receipt_doc);setOpen(true);}} className='bg-yellow-300 text-slate-950 font-semibold cursor-pointer px-3 py-2 border border-slate-950 hover:bg-slate-950 hover:text-yellow-300' >
                                                View
                                            </div>
                                            <Modal
                                                className='bg-white'
                                                title="Document"
                                                centered
                                                open={open}
                                                onCancel={() => setOpen(false)}
                                                width={600}
                                                >
                                                <img className="w-auto h-auto mx-auto" src={Image} alt="document" />
                                            </Modal>
                                        </td>
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