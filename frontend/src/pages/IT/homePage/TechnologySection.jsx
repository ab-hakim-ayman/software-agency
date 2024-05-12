import React from "react";
import Technology from "./Technology";
import { useState, useEffect } from 'react';

import TechnologyCard from "../../../Component/IT/cards/TechnologyCard";
import SectionTitle from "../../../Component/IT/sectionTitle/SectionTitle";

const TechnologySection = ({technologyData}) => {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    setTechnologies(technologyData?technologyData:[])
  }, [technologyData]);


  return (
    <section className="py-20 bg-white px-2">
      <div className="container mx-auto">
        <SectionTitle textColor="text-blue-950" title="Technology" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 xl:gap-8 ">
          {technologies.map((technology, index) => (
            <TechnologyCard to={index} key={index} technology={technology} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
