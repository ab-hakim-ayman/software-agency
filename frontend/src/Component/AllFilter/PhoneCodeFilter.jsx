import React, {   useRef, useState } from 'react';
const allData = require('filter-country-dial-code-flag');

export default function CodeFilter({setModalOpen, name,obj,code_field_value,setState}) {
  const [Code, setCode] = useState(allData())
  const id = useRef(name)

  function CodeSelected(e){
      setState({...obj, [name]: e });

      setTimeout(() => {
        setModalOpen(false);

      }, 300); 
  }
  
  
  
  


  return (
      <div
        className=" absolute left-[10%] top-[100%] z-50  bg-[#f2f2f2] sm:w-[310px] shadow-lg "
        id="PhnCodeSelect"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        key={id}
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content p-4">
            <div className="modal-header text-dark flex justify-between pb-2">
              <h5 className="modal-title text-xl" id="exampleModalLabel">
                Select Code
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={()=>setModalOpen(false)}
              >
                <span aria-hidden="true" className='btn text-md border border-gray-800 hover:border-gray-700'>Cancel </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group has-search d-flex align-items-center border w-full mb-6">
                <span className="fa fa-search form-control-feedback "></span>
                <input
                  onChange={(e) => setCode(allData(e.target.value))}
                  type="search"
                  className="py-3 pl-4  h-full placeholder form-control Ccode-search border-0 w-full focus:outline-none"
                  placeholder="Code Search "
                  autoFocus
                />
              </div>
              {
                Code.map((data,i)=>{
                  return i<10 && <div onClick={()=>CodeSelected(data.dial_code)} key={i.toString()} className=" cursor-pointer list-group list-group-flush p-2 border border-black mb-1"> <span className='mr-2'> {data.flag} </span> {" "} <span className='ml-4'>{data.name}</span>  <span className='float-right'>{data.dial_code}</span></div>  
                  
                })
              }
            </div>
          </div>
        </div>
    </div>
  )
}
