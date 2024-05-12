
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
  import { Button, ButtonToolbar } from 'react-bootstrap';
  import { useNavigate } from "react-router-dom";
  import Pagination from "../../../../Component/Pagination";
  import axios from 'axios';
  import { toast } from 'react-hot-toast';
  import { Base_URL } from '../../../../Constant';
import { AdminUnAuth } from "../../../../Auth_Middleware/UnAuth";
  
  const NewsLetter = () => {
    const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const [newsLetter, setNewsLetter] = useState([]);
      const navigate = useNavigate()
  
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
      const totalItems = newsLetter.length;
    
      const onPageChange = (newPage) => {
        setCurrentPage(newPage);
      };
    
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const itemsToShow = newsLetter.slice(startIndex, endIndex);
  
      const fetchData = async () => {
        try {
          await axios.get(Base_URL+'/api/admin-it/news-letter/', {
            headers: {
              Authorization: 'Bearer ' + userToken
            }
          })
          .then((response) =>{
            setNewsLetter(response.data)
          }).catch((e)=>{
            AdminUnAuth(e)
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
            News-Letter
            </h1>{" "}
          </div>
          <div className="flex justify-between items-center mt-10 ml-1 uppercase text-lg tracking-wide">
            <div className="flex items-center justify-center gap-5">
              <p className="flex items-center justify-center gap-2">
                <FaGripLinesVertical />
                Column
              </p>
              <p className="flex items-center justify-center gap-2">
                <FaBars></FaBars>Density
              </p>
              <p className="flex items-center justify-center gap-2">
                <FaDownload></FaDownload> Export
              </p>
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
                    <span className=" border-l-2  border-slate-200  pl-2">Email</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">Active</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">Date</span>
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-scroll">
              {itemsToShow.map((t) =>
                <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.email}</td>
                    <td>{t.active ? 'True' : 'False'}</td>
                    <td>{t.created_at.split('T')[0]}</td>
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
  
  export default NewsLetter;