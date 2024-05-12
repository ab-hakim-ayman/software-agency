import React, { useState } from 'react'
import { useParams } from "react-router-dom"
const allData = require('country-currency-list')

export default function CurrencyFilter({setModalOpen, name, projectDocument, setProjectDocument}) {
  const [currency, setcurrency] = useState(allData())

  function currencySelected(e){
    setProjectDocument({
      ...projectDocument,
      [name]: e
    });
    setModalOpen(false);
  }
  


  return (
      <div
        className=" absolute left-[10%] top-[100%] z-50  bg-[#f2f2f2] sm:w-[80%] md:w-[300px] shadow-lg shadow-[]"
        id="PhnCodeSelect"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content p-4">
            <div className="modal-header text-dark flex justify-between pb-2">
              <h5 className="modal-title" id="exampleModalLabel">
                Select currency
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={()=>setModalOpen(false)}
              >
                <span aria-hidden="true" className='text-2xl'>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group has-search d-flex align-items-center border w-full mb-6">
                <span className="fa fa-search form-control-feedback "></span>
                <input
                  // value={name ? name : ""}
                  onChange={(e) => setcurrency(allData(e.target.value))}
                  type="search"
                  className="py-3 pl-4  h-full placeholder form-control Ccode-search border-0 w-full focus:outline-none"
                  placeholder="Currency Search "
                  autoFocus
                />
              </div>
              {
                currency.map((data,i)=>{
                  return i<10 && <div onClick={()=>currencySelected(data.currency)} key={i.toString()} className="list-group list-group-flush p-2 border border-black mb-1"> <span className='mr-2'> {data.currency} </span> {" "} <span className='ml-4'>{data.countryName}</span> </div>  
                  
                })
              }
            </div>
          </div>
        </div>
    </div>
  )
}
