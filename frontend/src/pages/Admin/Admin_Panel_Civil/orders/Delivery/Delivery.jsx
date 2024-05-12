import { useState, useEffect } from 'react';
import { FaUndoAlt, } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Pagination from './../../../../../Component/Pagination';
import { Base_URL } from './../../../../../Constant';

const Delivery = () => {
    const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const [deliveryOrder, setDeliveryOrder] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = deliveryOrder.length;
  
    const onPageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = deliveryOrder.slice(startIndex, endIndex);


    const handleUpdate = (e, id) => {
      navigate(`/admin/civil/update-delivery-order/${id}/`);
    };

    const fetchData = async () => {
      try {
        await axios.get(Base_URL+'/api/civil-admin/delivery-orders/',{
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + userToken
          }
      })
        .then((response) =>{
          setDeliveryOrder(response.data)
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
        <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
          Delivery Orders
          </h1>{" "}
        </div>
        <div className="flex justify-between items-center mt-10 ml-1 uppercase text-lg tracking-wide">
          <div className="flex items-center justify-center gap-5">
          <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  className="py-2 px-4 text-white bg-slate-950 border-[0.3px] border-slate-400  shadow outline-none"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Orders..."
                />
              </Form.Group>
            </Form>
          </div>
          <div>
            <p className="flex items-center justify-center gap-2">
              <Button className="bg-slate-950 mt-5 text-slate-100 hover:bg-gray-600 border-[0.3px] border-slate-400" onClick={fetchData}><FaUndoAlt></FaUndoAlt>Refresh</Button>
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table  border-[0.3px] border-slate-500  mt-10 h-[full]  bg-slate-900  rounded-sm">
            {/* head */}
            <thead className="text-white  bg-slate-950">
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
                return search.toLowerCase() === '' ? item : item?.ProductCivil?.proName.toLowerCase().includes(search) || item.status.toLowerCase().includes(search);   
              }).map((t) =>
              <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.ProductCivil?.proName}</td>
                  <td>{t.total_price}</td>
                  <td>{t.total_online_paid}</td>
                  <td>{t.total_offline_paid}</td>
                  <td>{t.user.username}</td> 
                  <td>{t.user.email}</td>
                  <td>{t?.OrderPdfCivil?.map((data,i)=>{
                    return <a className='p-1 border' href={Base_URL+data?.file} target="_blank" rel="noopener noreferrer" key={i}>view</a>
                  })}
                  </td>
                  <td>{t?.OtherPdfCivil.length === 0 && "N/A"} {t?.OtherPdfCivil?.map((data,i)=>{
                    return <a href={Base_URL+data?.file} target="_blank" rel="noopener noreferrer" key={i}>view</a>
                  })}</td>
                  <td>Delivery</td>
                  <td>
                  {(t.status === 'del') && t?.DeliveryFile?.length === 0 && "N/A"} {t?.DeliveryFile?.map((data,i)=>{
                    return <a className="p-1 border-[0.3px]" href={Base_URL+data?.file} target="_blank" rel="noopener noreferrer" key={i}>view Project</a>
                  })}
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

export default Delivery;