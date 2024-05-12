import React from "react";
import { Base_URL } from "../../../Constant";
import { Link } from "react-router-dom";

const TechnologyCard = ({ technology, to}) => {
  return (
    <Link to={"/it"+technology.path} className={`bg-white text-white hover:scale-110 duration-300 px-4 py-8 rounded-lg shadow-md flex flex-col items-center border-gradient`}
    >
      <div className="text-5xl text-blue-950 mb-4"> <img className="w-28" src={Base_URL+technology.icon} alt="img" /> </div>
      <div className="text-lg font-medium text-blue-950 font-noto">{technology?.name}</div>
    </Link>
  );
};

export default TechnologyCard;
