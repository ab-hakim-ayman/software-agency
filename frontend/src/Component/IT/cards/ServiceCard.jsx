import React from "react";
import { Link } from "react-router-dom";
import { Base_URL } from "../../../Constant";

const ServiceCard = ({ id, service , bgColor , textColor }) => { 
  
  return (
    <Link key={id+1} to={service?.path ? "/it"+service.path: "/it/services"}>
      <div className={`${bgColor ?bgColor : " bg-blue-950 "} ${textColor?textColor:" text-white "}   p-4 h-64 rounded-lg shadow-lg flex flex-col justify-center items-center text-center hover:scale-105 duration-300 `}>
        <div className="text-5xl mb-4  "> <img className="w-28 " src={service?.icon?.startsWith("http") ? service.icon : Base_URL+service.icon } alt="img" /> </div>
        <div className="text-lg font-medium font-noto  ">{service.name}</div>
      </div>
    </Link>
  );
};

export default ServiceCard;
