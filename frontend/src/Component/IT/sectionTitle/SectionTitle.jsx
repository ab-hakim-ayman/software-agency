import React from "react";

const SectionTitle = ({ title,textColor }) => {
  return (
    <div className="mb-6 py-5 ">
      <h1 className={` ${textColor?textColor:" text-white "}  text-4xl md:text-4xl xl:text-5xl font-bold text-center pb-10 `}>{title}</h1>
    </div>
  );
};

export default SectionTitle;
