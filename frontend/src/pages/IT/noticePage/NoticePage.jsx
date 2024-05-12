import React from "react";
import axios from "axios";  
import { useEffect, useState } from 'react';
import SectionTitle from "../../../Component/IT/sectionTitle/SectionTitle";

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Base_URL } from "../../../Constant";
import Pagination from "../../../Component/Pagination";
import toast from "react-hot-toast";


const NoticePage = () => {
  const [notice, setNotice] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = notice.length;

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  }; 

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = notice.slice(startIndex, endIndex);

  useEffect(() => {
      axios.get(Base_URL+'/api/it/all-active-notice/')
      .then(response => {
          setNotice(response.data);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  }, []);

  function getFileNameFromURL(url) {
    let parts = url.split('/');
    return parts[parts.length - 1];
  }
  function DownloadFile(url) {
    const fileName = getFileNameFromURL(url);
    //Create XMLHTTP Request.
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "blob";
    req.onload = function () {
        //Convert the Byte Data to BLOB object.
        const blob = new Blob([req.response], { type: "application/octetstream" });
        //Check the Browser type and download the File.
        const isIE = false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveBlob(blob, fileName);
        }
        else {
            const url = window.URL || window.webkitURL;
            const link = url.createObjectURL(blob);
            const a = document.createElement("a");
            a.setAttribute("download", fileName);
            a.setAttribute("href", link);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };
    req.send();
  };

  return (
    <section className=" pb-20 bg-slate-50">
      <div className="container mx-auto">
        <SectionTitle textColor="text-blue-950" title="Notice" />

        {/* Notice Table */}
        <div className="overflow-x-auto">
          <table className="table table-sm table-fixed table-zebra-zebra font-poppins text-center w-[100%] md:w-[80%] lg-[70%] mx-auto border border-black">
            {/* head */}
            <thead>
              <tr className="text-lg font-noto bg-blue-950 text-white ">
                <th>SL</th>
                <th>Notice Title</th>
                <th>Upload Date</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody className="even:bg-slate-300 hover:odd:bg-slate-100 text-black font-semibold">
              {itemsToShow.map((item,i) => (
                <tr className="text-base " key={i+1}>
                  <td>
                    <span className="bg-blue-950 text-white w-8 h-8  px-2 py-1 rounded">
                      {i+1}
                    </span>
                  </td>
                  <td>{item.noticeTitle}</td>
                  <td>{item.created_at.slice(0,10)}</td>
                  <td>
                    {/* onClick={()=>DownloadFile(item.file)} */}
                    <a href={item?.file ? item.file : toast.error("file not found")}   className="btn bg-blue-950 text-white hover:bg-white hover:text-blue-950 hover:border-blue-950 btn-sm text-xs capitalize" >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
              
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

export default NoticePage;
