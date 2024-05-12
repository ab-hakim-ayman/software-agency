import React from "react";
import { useState, useEffect } from "react";
import BannerImage from "../../../assets/IT/images/BannerImage.jpg";
import { Link } from "react-router-dom";

const HeroSection = ({BannerData}) => {
  const [banner, setBanner] = useState([]);
  const [userToken] = useState(localStorage.getItem('DTCUserToken'));

  useEffect(() => {
    setBanner(BannerData?.length > 0 ?BannerData : [])
  }, [BannerData]);

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  };
  console.log(BannerData)
  console.log(banner)
  return (
    <>
    <section  className=" py-24 text-gray-200 px-2" style={{backgroundImage: `url(${banner?.[banner?.length-1 ||0]?.img || BannerImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    height: "95vh"}}>
      <div style={overlayStyle}></div>
      <div className="container relative mx-auto ">
        <div className="grid grid-cols-2 place-items-center">
          <div className="hidden lg:block"></div>
          <div className="col-span-2 lg:col-span-1">
            <h5 className="font-bold text-xl text-accent mb-4">Welcome</h5>
            <h1 className="font-bold capitalize text-2xl sm:text-4xl md:text-5xl leading-tight mb-6">
              {banner?.[banner.length-1]?.title || "Hi, there"}
            </h1>
            <p className="font-poppins sm:text-lg mb-6 text-justify">
              {banner?.[banner.length-1]?.description || "Don't miss anything, order now"}
            </p>
            {userToken &&<div className="text-end lg:text-start">
              <Link to="/it/order-page" className="bg-white hover:bg-slate-100 text-blue-950 font-bold py-2 px-8 md:my-12">Order Now</Link>
            </div>}
          </div>
        </div>
      </div>
    </section>
    </>   
  );
};

export default HeroSection;
