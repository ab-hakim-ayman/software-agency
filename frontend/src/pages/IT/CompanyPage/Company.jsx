import React from 'react';
import axios from "axios";  
import { useEffect, useState } from 'react';
import SectionTitle from '../../../Component/IT/sectionTitle/SectionTitle';
import { Base_URL } from '../../../Constant';
import Pagination from '../../../Component/Pagination';

const Company = () => {
  const [company, setCompany] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // Number of items to display per page (customize this)
  const totalItems = company.length;

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = company.slice(startIndex, endIndex);

  useEffect(() => {
      axios.get(Base_URL+'/api/it/all-active-company/')
      .then(response => {
          setCompany(response.data);
        //   console.log(response);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  }, []);
    return (
        <section className=" pb-20 bg-slate-50">
            <div className="container mx-auto">
                <SectionTitle  textColor="text-blue-950" title="Company" />

                {/* Notice Table */}
                <div className="overflow-x-auto">
                  <table className="table-auto overflow-scroll table-sm table-zebra-zebra font-poppins text-center w-[100%] border border-black">
                    {/* head */}
                    <thead className='text-lg'>
                          <tr className='bg-blue-950 text-white'>
                          <th>
                              <h1>Sr No.</h1>
                          </th>
                          <th>Photo</th>
                          <th>Name</th>
                          <th>Title</th>
                          <th>Mobile No</th>
                          <th>Gmail</th>
                          <th>Home Address </th>
                          </tr>
                    </thead>
                    <tbody className="even:bg-slate-300 hover:odd:bg-slate-100 text-black font-semibold">
                    {
                      company.map((item,i) =>(
                        <tr className='text-center mx-auto'>
                          <td>
                              <h1>{i+1}</h1>
                          </td>
                          <td className=''>
                              <div className="flex items-center justify-center ">
                                  <div className="avatar">
                                      <div className="mask mask-squircle w-12 h-12">
                                          <img src={item.staff_img} alt="Avatar Tailwind CSS Component" className='mx-auto text-center' />
                                      </div>
                                  </div>
                              </div>
                          </td>
                          <td>
                              <div>
                                  <div className="font-bold">{item.full_Name}</div>
                                  {/* <div className="text-sm opacity-50">United States</div> */}
                              </div>
                          </td>
                          <td>
                              {item.staff_title}
                              <br />
                              {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                          </td>
                          <td>{item.mobileNumber}</td>
                          <th>
                              <button className="btn btn-ghost btn-xs">{item.email}</button>
                          </th>

                          <td>{item.home_address}</td>
                        </tr>
                        ))
                    }

                    </tbody>
                  </table>
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    onPageChange={onPageChange}            
                  />
                </div>
            </div>


        </section>
    );
};

export default Company;




