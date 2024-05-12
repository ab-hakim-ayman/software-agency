import React from "react";
import axios from "axios";  
import { useEffect, useState } from 'react';
import SectionTitle from "../../../Component/IT/sectionTitle/SectionTitle";
import ServiceCard from "../../../Component/IT/cards/ServiceCard";
import { Base_URL } from "../../../Constant";


const ServicePage = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
      axios.get(Base_URL+'/api/it/all-active-services/')
      .then(response => {
          setService(response.data);
          // console.log(response);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <section className=" pb-20 bg-slate-50">
      <div className="container mx-auto">
        <SectionTitle  textColor="text-blue-950" title="Our Services" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 sm:gap-5 xl:gap-8">
          {service.map((item, index) => (
            <ServiceCard key={index} to={index} service={item} />
          ))} 
        </div>
      </div>
    </section>
  );
};

export default ServicePage;
