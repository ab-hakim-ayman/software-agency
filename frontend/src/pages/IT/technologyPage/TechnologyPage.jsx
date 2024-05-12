import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
// import Technology from "../../homePage/Technology";

import Technology from "../homePage/Technology";
import { Base_URL } from "../../../Constant";



const TechnologyPage = () => {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
      axios.get(Base_URL+'/api/it/all-active-technology/')
      .then(response => {
        setTechnologies(response.data);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <>
    {
      technologies?.map((item,i) =>(
        <Technology
        textColor={i%2===0 ? "text-blue-950" : "text-slate-100"}
        bg={i%2===0? "bg-slate-100" : "bg-blue-950"}
        title={item?.category} 
        technologies={item?.technology_sections} />
      ))
    }
    </>
  );
};

export default TechnologyPage;
