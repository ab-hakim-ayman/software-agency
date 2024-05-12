
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
import axios from "axios";
import { toast } from 'react-hot-toast';
import { Base_URL } from './../../../../Constant';
import Pagination from './../../../../Component/Pagination';

const Banner = () => {
  const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
    const [readmore, setReadmore] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
      const totalItems = readmore.length;
    
      const onPageChange = (newPage) => {
        setCurrentPage(newPage);
      };
    
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const itemsToShow = readmore.slice(startIndex, endIndex);

    const handleDelete = (e, id) => {
      if(window.confirm('Are you sure ?')){
          e.preventDefault();
          axios.delete(Base_URL+'/api/admin-it/readmore/' + id + '/', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userToken
            }
          })
          .then((response)=>{
              toast.success("Sucessfully deleted");
              fetchData();
          }).catch((error)=>{
            toast.error("Failed to delete")
          })
      }
    };

    const handleUpdate = (e, id) => {
      navigate(`/admin/it/update-readmore/${id}/`);
    };

    const fetchData = async () => {
      try {
        await axios.get(Base_URL+'/api/admin-it/readmore/', {
          headers: {
            Authorization: 'Bearer ' + userToken
          }
        })
        .then((response) =>{
          setReadmore(response.data)
        }).catch((error) =>{
          toast.error("Readmore fetching failed!");
        })          
      } catch (error) {
        toast.error("Network error occured!")
      }
    };

    useEffect(() => {   
      fetchData();
    }, []);
  

    // console.log(template);
    return (
        <div className=" bg-blue-950  px-10 w-full h-full mt-12 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
          Readmore
          </h1>{" "}
          <Link to="/admin/it/add-readmore">
            <button className="bg-blue-950 mt-5 text-slate-100 hover:bg-gray-600 border-[0.3px] border-slate-400 font-bold uppercase py-2 px-4 rounded inline-flex items-center space-x-2">
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
                  className="py-2 px-4 text-white bg-blue-950 border-[0.3px] border-slate-400  shadow outline-none"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search readmore..."
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
                <th>#</th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Photo</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Title</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">Description</span>
                </th>
                <th>
                  <span className=" border-l-2  border-slate-200  pl-2">
                  Path
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
            {itemsToShow.filter((item) =>{
                return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search);   
              }).map((t) =>
              <tr key={t.id}>
                  <td>{t.id}</td>
                  <td><img src={t.img} alt="" height="30px" width="30px"/></td>
                  <td>{t.title}</td>
                  <td>{t.description}</td>
                  <td>{t.path}</td>
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

export default Banner;