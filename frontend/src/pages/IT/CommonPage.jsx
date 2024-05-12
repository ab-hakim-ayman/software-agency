import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Base_URL } from "../../Constant";

const SecurityPage = ({ title, description }) => {
  useEffect(() => {
    if (!title || !description) {
      window.history.back();
    }
  }, []);

  return (
    <>
      <div className="p-20 text-xl">
        <h1 className="text-center mb-5 font-bold text-md lg:text-3xl">
          {title}
        </h1>
        <hr />
        <p className="mt-5">{description}</p>
      </div>
    </>
  );
};

export default SecurityPage;
