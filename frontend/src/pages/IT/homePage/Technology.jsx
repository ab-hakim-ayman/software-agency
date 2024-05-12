import React from "react";
import SectionTitle from "../../../Component/IT/sectionTitle/SectionTitle";
import TechnologyCard from './../../../Component/IT/cards/TechnologyCard';

const Technology = ({ bg, title, technologies, textColor }) => {
  return (
    <section className={`pb-20 pt-12 px-2 ${bg ? bg : 'bg-blue-950 '}`}>
      <div className="container mx-auto ">
        <SectionTitle textColor={textColor} title={title} />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 sm:gap-5 xl:gap-6">
          {technologies.map((technology, index) => (
            <TechnologyCard key={index} technology={technology} bg={bg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;
