
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
import { Base_URL } from './../../../../Constant';
import { toast } from 'react-hot-toast';
import { AdminUnAuth } from "../../../../Auth_Middleware/UnAuth";

  const ProductCategory = () => {
    const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
      const [category, setCategory] = useState([]);
      const navigate = useNavigate()
  
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
      const totalItems = category.length;
    
      const onPageChange = (newPage) => {
        setCurrentPage(newPage);
      };
    
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const itemsToShow = category.slice(startIndex, endIndex);
  
      const handleDelete = async (e, id, activeValue) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            await axios.patch(Base_URL+'/api/admin-it/product-category/' + id + '/', {active:activeValue?true:false},{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + userToken
                }
            })
            .then ((response) =>{
              toast.success(activeValue?"Sucessfully Active":"Sucessfully Deactive")
              fetchData();
            }).catch((e)=>{
              AdminUnAuth(e)
            })
        }
      };
  
      const handleUpdate = (e, id) => {
        navigate(`/admin/it/update-product-category/${id}/`);
      };

      const fetchData = async () => {
        try {
          await axios.get(Base_URL+'/api/admin-it/product-category/', {
            headers: {
              Authorization: 'Bearer ' + userToken
            }
          }).then((response)=>{
            setCategory(response.data);
          })
          .catch((e)=>{
            AdminUnAuth(e)
          });
        } catch (err) {
          console.error(err);
        }
      };

      useEffect(() => {      
        fetchData();
      }, []);
      return (
          <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
            Product Category
            </h1>{" "}
            <Link to="/admin/it/add-product-category">
              <button className="bg-blue-950 mt-5 text-slate-100 hover:bg-gray-600 border-[0.3px] border-slate-400 font-bold uppercase py-2 px-4 rounded inline-flex items-center space-x-2">
                <GrAdd className="bg-slate-100"></GrAdd>
                <span>Create</span>
              </button>
            </Link>
          </div>
          <div className="flex justify-between items-center mt-10 ml-1 uppercase text-lg tracking-wide">
            <div className="flex items-center justify-center gap-5">
              
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
                    <span className=" border-l-2  border-slate-200  pl-2">Name</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">
                    Status
                    </span>
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
                    <td>{t.category}</td>
                    <td>{t.active ? 'Active' : 'Disable'}</td>
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
  
  export default ProductCategory;