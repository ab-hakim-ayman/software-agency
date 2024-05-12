import React,{useState,useEffect} from "react";
import SectionTitle from "../../../Component/IT/sectionTitle/SectionTitle";

import USA_img from "../../../assets/IT/images/usa-flag.jpg";
import UK_img from "../../../assets/IT/images/uk-flag.jpg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { toast } from "react-hot-toast";
import  axios  from 'axios';
import { Base_URL } from "../../../Constant";
import { UnAuth } from "../../../Auth_Middleware/UnAuth";



const GlobalLocationsPage = () => {
const [GlobalData, setGlobalData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(Base_URL+'/api/it/global-location-view-all/')
        .then((res)=>{
          setGlobalData(res.data);
        })
        .catch((e)=>{
          UnAuth(e);
        });
      } catch (e) {
        // Handle error
        toast.error("Network Error");
      }
    };

    fetchData();
  }, []);
  return (
    <section className="pt-0 pb-20 bg-slate-100">
      <div className="container mx-auto">
        <SectionTitle textColor="text-blue-950" title="Global Locations" />

        {/* Global Page Table */}
        <div className="overflow-x-auto">
          <table className="table-auto overflow-scroll table-sm table-zebra-zebra font-poppins text-center w-[100%] border border-slate-900">
            {/* head */}
            <thead>
              <tr className="text-lgfont-noto bg-blue-900 text-white">
                <th>NO</th>
                <th>Country</th>
                <th>Office Address</th>
                <th>Email</th>
                <th>Contact No</th>
              </tr>
            </thead>
            <tbody className="even:bg-slate-300 hover:odd:bg-slate-100 text-black text-center">
              {GlobalData.map((office) => (
                <tr className="text-base text-center" key={office?.id}>
                  <td>
                    <span className="bg-gray-800 text-white w-8 h-8 px-2 py1 rounded">
                      {office?.no}
                    </span>
                  </td>
                  <td  className=" min-w-[8px] text-center flex justify-center items-end align-middle">
                    <div className="flex gap-4 shrink-0">
                      <img className="h-4 flex items-center align-middle my-auto" src={office?.country?.toLowerCase()=== "uk" ? UK_img : USA_img } alt={office?.country} />
                      <span className="text-lg font-noto uppercase font-semibold">
                        {office?.country}
                      </span>
                    </div>
                  </td>
                  <td>{office?.email}</td>
                  <td>{office?.office_address}</td>
                  <td>{office?.contact_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


       

      </div>

      <div className="my-12 w-full">
        
        {/* pagination */}
        <div className="flex items-center justify-between border-[0.3px] border-slate-300 bg-white px-4 py-3 sm:px-6 w-full lg:w-[80%] mx-auto">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-blue-950">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-blue-950 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>

        
      </div>
    </section>
  );
};

export default GlobalLocationsPage;
