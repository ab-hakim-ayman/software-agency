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

const Products = () => {
    const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const [product, setProduct] = useState([]);
    const [editproduct, setEditproduct] = useState([]);
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = product.length;
  
    const onPageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = product.slice(startIndex, endIndex);

    const handleDelete = (e, id, activeValue) => {
      if(window.confirm('Are you sure ?')){
          e.preventDefault();
          axios.patch(Base_URL+'/api/admin-it/product-active-deactive/' + id + '/', {active:activeValue?true:false},{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userToken
            }
          })
          .then((response)=>{
              toast.success(activeValue?"Sucessfully Active":"Sucessfully Deactive")
              fetchData()
          },
          (error)=>{
              alert("Failed to Delete Product");
          })
      }
    };

    const handleUpdate = (e, id) => {
      navigate(`/admin/it/update-product/${id}/`);
    };

    const fetchData = async () => {
      try {
        await axios.get(Base_URL+'/api/admin-it/product/', {
          headers: {
            Authorization: 'Bearer ' + userToken
          }
        })
        .then((response) =>{
          setProduct(response.data)
        }).catch((error) =>{
          toast.error("Product fetching failed!");
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
          Products
          </h1>{" "}
          <Link to="/admin/it/addProducts">
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
                <th>#</th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Image</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Name</span>
                </th>
                <th className="">
                  <span className=" border-l-2  border-slate-200  pl-2 ">Description</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">First File</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Second File</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Third File</span>
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
                  <td><img src={t.proImg} alt="" height="30px" width="30px"/></td>
                  <td>{t.proName}</td>
                  <td>{t.proDescription}</td>
                  <td> {t.fileOne ? <a href={t.fileOne} target="_blank" rel="noopener noreferrer" className="border p-2" >View</a> : "N/A" }</td>
                  <td> {t.fileTwo ? <a href={t.fileTwo} target="_blank" rel="noopener noreferrer" className="border p-2">View</a> : "N/A" }</td>
                  <td> {t.fileThree ? <a href={t.fileThree} target="_blank" rel="noopener noreferrer" className="border p-2" >View</a> : "N/A" }</td>
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

export default Products;