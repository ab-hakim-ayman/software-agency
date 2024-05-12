import React from 'react';
import image from '../../assets/Civil/architecture/architecture2.jpg';
import { Link } from 'react-router-dom';
import {UploadOutlined, DownloadOutlined} from '@ant-design/icons';
import toast from 'react-hot-toast';

const Card = ({ path,bgColor, textColor , item}) => {
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

  function donwloadAll(){
    if (item.fileOne) {
      DownloadFile(item.fileOne)  
      toast.success("File on Downloaded")
    }
    setTimeout(() => {
      if (item.fileTwo) {
        DownloadFile(item.fileTwo)
        toast.success("File on Downloaded")
      }
    }, 400);
    setTimeout(() => {
      if (item.fileThree) {
        DownloadFile(item.fileThree)
        toast.success("File on Downloaded")
      }
    }, 700);
  }

  

  return (
    <div>
      <div className="card-container relative min-w-[400px] min-h-[300px] mb-10">
        <div className="max-w-sm rounded overflow-hidden shadow-lg relative border-[0.5px] border-blue-950">
          <div className={` px-4 py-1 w-[100%] text-center ${bgColor?bgColor:" bg-blue-950 "} ${textColor?textColor:" text-white "}`} >
            <div className="font-bold text-xl mb-2">{item.proName}</div>
          </div>
          <img className="w-full h-[250px] cover  " src={item.proImg} alt="Mountain"  />
          <div className={` px-2 py-2 flex justify-between  ${bgColor?bgColor:" bg-blue-950 "}`}>
            <Link to={'/' + path + '/order-page/order-form-page/'+item.id}> <button className="bg-slate-100 hover:bg-slate-200 text-blue-950 font-bold py-2 px-4 rounded mr-2">
            <UploadOutlined className='text-xl font-bold' /> Upload
            </button></Link>
            <button onClick={donwloadAll}
             className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              <DownloadOutlined className="text-xl mr-1" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;