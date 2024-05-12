import React from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// import TogetherBannerImg from "../../../assets/IT/images/together-banner.png";

const BottomBanner = ({BottomBannerData}) => {
  const [bottomBanner, setBottomBanner] = useState([]);

  useEffect(() => {
    setBottomBanner(BottomBannerData? BottomBannerData: [])
  }, [BottomBannerData]);

  // const sectionStyle = {
  //   backgroundImage: `url(${TogetherBannerImg})`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   position: "relative",
  // };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  };

  const contentStyle = {
    position: "relative", // Set to relative to ensure stacking context
    zIndex: 1, // Bring the content on top of the overlay
    color: "#ffffff",
  };

  return (
    <>
    {
      bottomBanner?.length > 0 &&
      
      <section style={{backgroundImage: `url(${bottomBanner?.[bottomBanner.length-1]?.img})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",}} className="py-32 ">
          <div style={overlayStyle}></div>
          <div className="container mx-auto text-center" style={contentStyle}>
            <h1 className="text-2xl sm:text-4xl font-bold">{bottomBanner?.[bottomBanner.length-1]?.title}</h1>
            <h5 className="sm:text-lg my-6">{bottomBanner?.[bottomBanner.length-1]?.description}</h5>
            <Link to="/it/order-page" className="bg-white hover:bg-blue-950 hover:text-white text-blue-950 font-bold py-2 px-4 border border-blue-950 hover:border-slate-300 rounded">Order now</Link>
          </div>
        </section>
    }
    </>
  );
};

export default BottomBanner;
