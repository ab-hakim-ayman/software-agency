
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaUndoAlt} from "react-icons/fa";
import { FaFlickr } from 'react-icons/fa';
import axios from 'axios';
import { Base_URL } from '../../../../Constant';
import { Button, Form } from 'react-bootstrap';
import Pagination from "../../../../Component/Pagination";
  
  const UserList = () => {
    const [userToken] = useState(localStorage.getItem('DTCAdminToken'));
      const [userList, setUserList] = useState([]);
      const [search, setSearch] = useState('');
      const navigate = useNavigate()
  
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
      const totalItems = userList.length;
    
      const onPageChange = (newPage) => {
        setCurrentPage(newPage);
      };
    
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const itemsToShow = userList.slice(startIndex, endIndex);

      const handleUpdate = (e, id) => {
        navigate(`/admin/it/update-template/${id}/`);
      };
  
      const fetchData = async () => {
        try {
          await axios.get(Base_URL+'/api/admin-it/user-list/',{
            headers: {
              Authorization: 'Bearer ' + userToken
            }
          })
          .then((response)=>{
            setUserList(response.data);
          })
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
            Users
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
                  placeholder="Search bottom banner..."
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
                    <span className=" border-l-2  border-slate-200  pl-2">Photo</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">First Name</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">Last Name</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">Username</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">
                    Phone
                    </span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">
                    Email
                    </span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">
                   Country
                    </span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">Gender</span>
                  </th>
                  <th>
                    <span className=" border-l-2  border-slate-200  pl-2">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-scroll">
              {itemsToShow?.map((t) =>
                <tr key={t.id}>
                    <td>{t.id}</td>
                    <td><img src={t?.profile_picture} alt="" height="30px" width="30px"/></td>
                    <td>{t.first_name}</td>
                    <td>{t.last_name}</td>
                    <td>{t.username}</td>
                    <td>{t.phoneNumber}</td>
                    <td>{t.email}</td>
                    <td>{t.countryName}</td>
                    <td>{t.gender}</td>
                    <td>
                        <Button className="mr-2">
                            <FaFlickr />
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
  
  export default UserList;