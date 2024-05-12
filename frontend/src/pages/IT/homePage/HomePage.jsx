import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import ServiceSection from "./ServiceSection";
import TechnologySection from "./TechnologySection";
import TemplatesSection from "./TemplatesSection";
import ReadSection from "./ReadSection";
import BottomBanner from "./BottomBanner";
import Reviews from "./Reviews";
import { Base_URL } from "../../../Constant";
import { toast } from "react-hot-toast";
import axios from "axios";
import { UnAuth } from "../../../Auth_Middleware/UnAuth";
// import Header from './../../../Component/IT/header/Header';

const HomePage = () => {
  const [AllData, setAllData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(Base_URL+'/api/it/view-all/')
        .then((res)=>{
          setAllData(res.data)
        })
        .catch((e)=>[
          UnAuth(e)
        ]);
      } catch (error) {
        // Handle error
        toast.error('Network Error' ,error);
      }
    };

    fetchData();

    // console.log(AllData)
  }, []);


  return (
    <>
      <HeroSection  BannerData={AllData?.BannerIT}/>
      <ServiceSection ServiceData={AllData?.OurServices} />
      <TechnologySection technologyData={AllData?.Technology}/>
      <TemplatesSection HomeTemplateData={AllData?.HomeTemplate}/>
      <ReadSection readDataData={AllData?.Readmore}/>
      <Reviews />
      <BottomBanner BottomBannerData={AllData?.BottomBanner}/>
    </>
  );
};

export default HomePage;
