
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {FaUndoAlt,} from "react-icons/fa";
import { Button,Form } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Base_URL } from './../../../../../Constant';
import Pagination from './../../../../../Component/Pagination';
import { AdminUnAuth } from "../../../../../Auth_Middleware/UnAuth";

const Working = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
  const [workingOrder, setWorkingOrder] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate()
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = workingOrder.length;
    
  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };
    
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = workingOrder.slice(startIndex, endIndex);
  
  
  // cancel
  const cancelOrder = (e, id) => {
    if(window.confirm('Do you want to cancel this order? \nBe sure, You will not get it back')){
      e.preventDefault();
      axios.patch(Base_URL+'/api/admin-it/cancel-pending-order/' + id + '/',{}, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken
        }
      })
        .then((response)=>{
          if (response.data.type === 'success'){
            toast.success("Sucessfully Deleted ")
            fetchData()
            navigate('/admin/it/cancelled-orders')
          }else{
            toast.error(response.data.msg)
          }
        }).catch((e)=>{
          AdminUnAuth(e)
        })
    }
  };

  // complete
  const CompleteOrder = (e, id) => {
    if(window.confirm('Do you want to change order status, Complete ? \nYou can not cancel the order later')){
      e.preventDefault();
      axios.patch(Base_URL+'/api/admin-it/complete-order/' + id + '/',{}, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken
        }
      })
        .then((response)=>{
          if (response.data.type === 'success'){
            toast.success("Order is Done Completely ")
            fetchData()
            navigate('/admin/it/complete-orders')
          }else{
            toast.error(response.data.msg)
          }
        }).catch((e)=>{
          AdminUnAuth(e)
        })
    }
  };
  
      const fetchData = async () => {
        try {
          await axios.get(Base_URL+'/api/admin-it/working-orders/',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userToken
            }
        })
          .then((response) =>{
            setWorkingOrder(response.data)
          }).catch((error) =>{
            toast.error("Order fetching failed!");
          })          
        } catch (error) {
          toast.error("Network error occured!")
        }
      };
      useEffect(() => {
        fetchData();
      }, []);
  
      return (
          <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
            Working Orders
            </h1>{" "}
          </div>
          <div className="flex justify-between items-center mt-10 ml-1 uppercase text-lg tracking-wide">
            <div className="flex items-center justify-center gap-5">
            <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    className="py-2 px-4 text-white bg-blue-950 border-[0.3px] border-slate-400  shadow outline-none"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Orders..."
                  />
                </Form.Group>
              </Form>
            </div>
            <div>
              <p className="flex items-center justify-center gap-2">
                <Button className="bg-blue-950 mt-5 text-slate-100 hover:bg-gray-600 border-[0.3px] border-slate-400" onClick={fetchData}><FaUndoAlt></FaUndoAlt>Refresh</Button>
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table  border-[0.3px] border-slate-500  mt-10 h-[full]  bg-blue-900  rounded-sm">
              {/* head */}
              <thead className="text-white  bg-blue-950">
              <tr>
                <th>ID</th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Product</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Total Price</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Online Paid</span>
                </th>
                <th className="">
                  <span className=" border-l-2  border-slate-200  pl-2 ">Offline Paid</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Customer</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">email</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Order PDF</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Other PDF</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Status</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">
                  Action
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="overflow-scroll">
            {itemsToShow.filter((item) =>{
                return search.toLowerCase() === '' ? item : item.ProductIT.proName.toLowerCase().includes(search) || item.status.toLowerCase().includes(search);   
              }).map((t) =>
              <tr key={t.id}  >
                  <td>{t.id}</td>
                  <td>{t.ProductIT.proName}</td>
                  <td>{t.total_price}</td>
                  <td>{t.total_online_paid}</td>
                  <td>{t.total_offline_paid}</td>
                  <td>{t.user.username}</td>
                  <td>{t.user.email}</td>
                  <td>{t?.OrderPdfIT?.map((data,i)=>{
                    return <a className='p-1 border' href={Base_URL+data?.file} target="_blank" rel="noopener noreferrer" key={i}>view</a>
                  })}
                  </td>
                  <td>{t?.OtherPdfIT.length === 0 && "N/A"} {t?.OtherPdfIT?.map((data,i)=>{
                    return <a href={Base_URL+data?.file} target="_blank" rel="noopener noreferrer" key={i}>view</a>
                  })}</td>
                  <td>Working</td>
                  <td>
                  {t.status === 'wor' && <>
                      {<button className="mr-1 p-1 bg-green-700 rounded-md" onClick={(e)=>CompleteOrder(e,t.id)}>
                          {/* <FaEdit /> */}
                          Complete
                      </button>}
                      <button className="bg-red-600 p-1 hover:bg-red-700 text-slate-50 mr-1 font-semibold rounded-md" onClick={(e)=>cancelOrder(e,t.id)}>
                          {/* <FaEdit /> */}
                          Cancel
                      </button>
                  </>}
                  </td>
              </tr>
            )}
            </tbody>
            </table>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                onPageChange={onPageChange}            
            />
          </div>
        </div>
      );
  };
  
  export default Working;