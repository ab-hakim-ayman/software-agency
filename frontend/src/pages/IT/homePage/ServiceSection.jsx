import React from "react";
import { useState, useEffect } from 'react';

import SectionTitle from "../../../Component/IT/sectionTitle/SectionTitle";
import ServiceCard from './../../../Component/IT/cards/ServiceCard';


const ServiceSection = ({ServiceData}) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(ServiceData?ServiceData:[])
  }, [ServiceData]);

  return (
    <section className="py-20 bg-white px-2">
      <div className="container mx-auto">
        <SectionTitle textColor="text-blue-950" title="Our Services" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 xl:gap-8 ">
          {services.map((service, index) => (
            <ServiceCard id={index} key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
