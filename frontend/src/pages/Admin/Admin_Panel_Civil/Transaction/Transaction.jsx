
import {
  FaBars,
  FaDownload,
  FaGripLinesVertical,
  FaUndoAlt,
} from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Button, ButtonToolbar, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Pagination from './../../../../Component/Pagination';
import { Base_URL } from './../../../../Constant';

const Transaction = () => {
    const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const [transaction, setTransaction] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = transaction.length;
  
    const onPageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = transaction.slice(startIndex, endIndex);


    const handleUpdate = (e, id) => {
      navigate(`/admin/civil/update-transaction/${id}/`);
    };

    const fetchData = async () => {
      try {
        await axios.get(Base_URL+'/api/civil-admin/transaction/',{
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + userToken
          }
      })
        .then((response) =>{
          setTransaction(response.data)
        }).catch((error) =>{
          toast.error("Transaction fetching failed!");
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
          Transactions
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
                  placeholder="Search transaction..."
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
                  <span className=" border-l-2  border-slate-200  pl-2">Transaction ID</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Account</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Email</span>
                </th>
                <th className="">
                  <span className=" border-l-2  border-slate-200  pl-2 ">Username</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Order ID</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Amount</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Bank</span>
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
                return search.toLowerCase() === '' ? item : item.Transaction_id.toLowerCase().includes(search) || item.account_Info.toLowerCase().includes(search) || item.bank.toLowerCase().includes(search);   
              }).map((t) =>
              <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.Transaction_id}</td>
                  <td>{t.account_Info}</td>
                  <td>{t.acc_holder_mail}</td>
                  <td>{t.user}</td>
                  <td>{t.order}</td>
                  <td>{t.amount}</td>
                  <td>{t.bank}</td>
                  <td>
                      <a download className="px-2 py-1 border" href={t.pay_receipt_doc} target="_blank" rel="noopener noreferrer"> view</a>
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

export default Transaction;