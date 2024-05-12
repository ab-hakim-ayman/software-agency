
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
  import { Base_URL } from './../../../../Constant';
import { AdminUnAuth } from "../../../../Auth_Middleware/UnAuth";
  
  const Notice = () => {
      const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
      const [notice, setNotice] = useState([]);
      const navigate = useNavigate()
  
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
      const totalItems = notice.length;
    
      const onPageChange = (newPage) => {
        setCurrentPage(newPage);
      };
    
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const itemsToShow = notice.slice(startIndex, endIndex);
  
      const handleDelete = (e, id, activeValue) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            axios.patch(Base_URL+'/api/admin-it/notice/' + id + '/', {active:activeValue?true:false},{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + userToken
                }
            })
            .then((response)=>{
              if (response.data.type === 'success'){
                toast.success(activeValue?"Sucessfully Active":"Sucessfully Deactive")
                fetchData()
              }else{
                toast.error(response.data.msg)
              }
            }).catch((e)=>{
              AdminUnAuth(e)
            })
        }
      };
  
      const handleUpdate = (e, id) => {
        navigate(`/admin/it/update-notice/${id}/`);
      };
  
      const fetchData = async () => {
        try {
          await axios.get(Base_URL+'/api/admin-it/notice/',{
            headers:{
                Authorization: 'Bearer '+ userToken
            }
        })
          .then((response) =>{
            setNotice(response.data)
          }).catch((error) =>{
            toast.error("Notice fetching failed!");
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
            Notice
            </h1>{" "}
            <Link to="/admin/it/add-notice">
              <button className="bg-blue-950 mt-5 text-slate-100 hover:bg-gray-600 border-[0.3px] border-slate-400 font-bold uppercase py-2 px-4 rounded inline-flex items-center space-x-2">
                <GrAdd className="bg-slate-100"></GrAdd>
                <span>Create</span>
              </button>
            </Link>
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
                    <span className=" border-l-2  border-slate-200  pl-2">Title</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">Active</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">Upload At</span>
                  </th>
                  <th className="">
                    <span className=" border-l-2  border-slate-200  pl-2 ">Last Updated At</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">File</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">
                    Action
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-scroll">
              {itemsToShow.map((t) =>
                <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.noticeTitle}</td>
                    <td>{t.active ? 'Active' : 'Disable'}</td>
                    <td>{t.created_at.split('T')[0]}</td>
                    <td>{t.last_update_at.split('T')[0]}</td>
                    <td><a href={t.file} target="_blank" rel="noopener noreferrer">
                            View File</a>
                    </td>
                    <td>
                        <Button className="mr-2" variant="danger"
                            onClick={event => handleDelete(event, t.id,t.active?false:true)}>
                                <RiDeleteBin5Line />
                        </Button>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <Button className="mr-2" onClick={(e) => handleUpdate(e, t.id)}>
                            <FaEdit />
                        </Button>
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
  
  export default Notice;