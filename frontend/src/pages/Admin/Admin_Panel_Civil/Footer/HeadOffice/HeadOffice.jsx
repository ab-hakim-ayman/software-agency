
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
import { Base_URL } from './../../../../../Constant';
import { toast } from 'react-hot-toast';
import Pagination from './../../../../../Component/Pagination';

  
  const HeadOffice = () => {
      const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
      const [headOffice, setHeadOffice] = useState([]);
      const [search, setSearch] = useState('');
      const navigate = useNavigate()
  
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
      const totalItems = headOffice.length;
    
      const onPageChange = (newPage) => {
        setCurrentPage(newPage);
      };
    
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const itemsToShow = headOffice.slice(startIndex, endIndex);
  
      const handleDelete = (e, id) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            axios.delete(Base_URL+'/api/cvil-admin/head-office/' + id + '/',{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + userToken
                }
            })
            .then((response)=>{
              toast.success("Head office deleted successfully")
              fetchData()
            }).catch((error) => {
                toast.error("Network error")
            })
        }
      };
  
      const handleUpdate = (e, id) => {
        navigate(`/admin/civil/update-head-office/${id}/`);
      };
  
      const fetchData = async () => {
        try {
          await axios.get(Base_URL+'/api/civil-admin/head-office/',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userToken
            }
        })
          .then((response) =>{
            setHeadOffice(response.data)
          }).catch((error) =>{
            toast.error("Head Office fetching failed!");
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
            Head Office
            </h1>{" "}
            <Link to="/admin/it/add-head-office">
              <button className="bg-slate-950 mt-5 text-slate-100 hover:bg-gray-600 border-[0.3px] border-slate-400 font-bold uppercase py-2 px-4 rounded inline-flex items-center space-x-2">
                <GrAdd className="bg-slate-100"></GrAdd>
                <span>Create</span>
              </button>
            </Link>
          </div>
          <div className="flex justify-between items-center mt-10 ml-1 uppercase text-lg tracking-wide">
            <div className="flex items-center justify-center gap-5">
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  className="py-2 px-4 text-white bg-slate-950 border-[0.3px] border-slate-400  shadow outline-none"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Global location..."
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
            <table className="table border-0 mt-10 h-[full] bg-slate-900 rounded-sm">
              {/* head */}
              <thead className="text-white  bg-slate-950">
                <tr>
                  <th>ID</th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">USA Address</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">USA Email</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">USA Phone</span>
                  </th>
                  <th className="">
                    <span className=" border-l-2  border-slate-200  pl-2 ">USA Fax</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">UK Address</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">UK Email</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">UK Phone</span>
                  </th>
                  <th className="">
                    <span className=" border-l-2  border-slate-200  pl-2 ">UK Fax</span>
                  </th>
                  <th className="">
                    <span className=" border-l-2  border-slate-200  pl-2 ">Active</span>
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
                return search.toLowerCase() === '' ? item : item.usa_address.toLowerCase().includes(search) || item.uk_address.toLowerCase().includes(search);   
              }).map((t) =>
                <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.usa_address}</td>
                    <td>{t.usa_email}</td>
                    <td>{t.usa_phone}</td>
                    <td>{t.usa_fax}</td>
                    <td>{t.uk_address}</td>
                    <td>{t.uk_email}</td>
                    <td>{t.uk_phone}</td>
                    <td>{t.uk_fax}</td>
                    <td>{t.active ? 'True' : 'False'}</td>
                    <td>
                        <Button className="mr-2" variant="danger"
                            onClick={event => handleDelete(event, t.id)}>
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
  
  export default HeadOffice;