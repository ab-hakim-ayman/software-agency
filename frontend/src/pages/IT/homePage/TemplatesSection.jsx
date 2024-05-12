import React from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SectionTitle from './../../../Component/IT/sectionTitle/SectionTitle';


const TemplatesSection = ({HomeTemplateData}) => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    setTemplates(HomeTemplateData?HomeTemplateData:[])
  }, [HomeTemplateData]);

  return (
    <section className="py-20 bg-white px-2">
      <div className="container mx-auto">
        <SectionTitle  textColor="text-blue-950" title="Templates"  />
        <div className="bg-slate-100 grid border-[0.5px] border-slate-300 sm:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-8 overflow-y-scroll max-h-[840px] scrollbar-sm cursor-auto px-4 py-4">
          {templates.map((template, index) => (
            <div key={index} className="bg-blue-950 border border-blue-950 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-none transition-transform" >
              <figure>
                <img
                  src={template.img}
                  alt='Template photo'
                  className="w-full h-64 object-cover object-top"
                />
              </figure>

              <div className="p-2 border border-x-0 border-b-0 border-t-blue-950">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold font-noto mb-2">
                    {template.title}
                  </h3>
                  <p className="font-semibold ">{template.description}</p>
                </div>
                <div className="text-end mt-2 ">
                  <Link
                    to={template.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shadow-md btn btn-sm text-blue-950 bg-white hover:bg-white border-blue-500 hover:border-blue-950  md:btn-md text-xs sm:text-base capitalize font-bold"
                  >
                    Live Preview
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
