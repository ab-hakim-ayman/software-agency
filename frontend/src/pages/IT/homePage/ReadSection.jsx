import React from "react";
import { useState, useEffect } from 'react';
import SoftwareCycleImg from "../../../assets/IT/images/software-cycle.png";
import { Link } from "react-router-dom";

const ReadSection = ({readDataData}) => {
  const [readMore, setReadMore] = useState([]);

  useEffect(() => {
    setReadMore(readDataData ? readDataData:[])
  }, [readDataData]);

  return (
    <section className="px-4">
      <div className="container mx-auto">
        {
          readMore.map((item, i) =>{
            return i %2 === 0 ?
            <div key={i} className="grid gap-6 grid-cols-5 2xl:gap-x-20 bg-slate-100 p-5 sm:p-8 rounded-3xl shadow-md hover:shadow-none rounded-tl-[60px] border-[0.5px] border-slate-300 rounded-br-[60px] rounded-tr-none rounded-bl-none mb-8">
            <div className="col-span-5 lg:col-span-3 order-2 lg:order-1">
              <h1 className="text-2xl md:text-4xl font-bold mb-8 text-blue-950 ">
                {item?.title}
              </h1>
              <p className="md:text-lg font-poppins leading-relaxed mb-8 text-justify">
                {item?.description}
              </p>
              <Link to={'/it'+item?.path} className=" bg-blue-950 hover:bg-white text-white hover:text-blue-950 font-bold py-2 px-4 border border-blue-950 rounded">Read more</Link>
            </div>
            <div className="col-span-5 lg:col-span-2 order-1 lg:order-2">
              <img className="w-auto max-h-72" src={item.img || SoftwareCycleImg} alt="Development Cycle" />
            </div>
          </div>
          :
          <div key={i} className="grid gap-6 grid-cols-5 2xl:gap-x-20 bg-slate-100 p-5 sm:p-8 rounded-3xl shadow-md hover:shadow-none rounded-tl-[60px] border-[0.5px] border-slate-300 rounded-br-[60px] rounded-tr-none rounded-bl-none mb-8">
            <div className="col-span-5 lg:col-span-3 order-2 lg:order-2">
              <h1 className="text-2xl md:text-4xl font-bold mb-8 text-blue-950 ">
                {item?.title}
              </h1>
              <p className="md:text-lg font-poppins leading-relaxed mb-8 text-justify">
                {item?.description}
              </p>
              <Link to={'/it'+item?.path} className=" bg-blue-950 hover:bg-white text-white hover:text-blue-950 font-bold py-2 px-4 border border-blue-950 rounded">Read more</Link>
            </div>
            <div className="col-span-5 lg:col-span-2 order-1 lg:order-1">
              <img className="w-auto max-h-72" src={item.img || SoftwareCycleImg} alt="Development Cycle" />
            </div>
          </div>
          }
          )
        }
      </div>
    </section>
  );
};

export default ReadSection;
