import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import USA from "../../../assets/IT/images/usa-flag.jpg";
import UK from "../../../assets/IT/images/uk-flag.jpg";

import {
  FaDiscord,
  FaEnvelope,
  FaFacebook,
  FaHome,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaPinterest,
  FaPrint,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { toast } from "react-hot-toast";
import { Base_URL } from "./../../../Constant";

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();
  const [sections, setSections] = useState([]);
  const [headOffices, setHeadOffices] = useState([]);
  const [socialIcons, setSocialIcons] = useState([]);
  const [paymentIcons, setPaymentIcons] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios
        .post(Base_URL + "/api/footer/news-letter/", formData)
        .then((res) => {
          if (res?.data?.type === "success") {
            toast.success(res?.data?.msg);
            setIsLoading(false);
          } else {
            toast.error("Somethiong Wrong");
            setIsLoading(false);
          }
        });
    } catch (error) {
      toast.error("Error saving task:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(Base_URL + "/api/footer/footerview/")
      .then((response) => {
        setSections(response.data["footerSections"]);
        setHeadOffices(response.data["footerHeadOffices"]);
        setSocialIcons(response.data["footerSocialIcon"]);
        setPaymentIcons(response.data["paymentIcon"]);
      })
      .catch((error) => {
        toast.error("Error fetching data:", error);
      });
  }, []);
  return (
    <footer className="py-16 bg-blue-950 text-white block clear-both ">
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-6 gap-y-10  place-content-center">
          <div className="sm:col-span-3 md:col-span-1 lg:col-span-2 ml-5">
            <h3 className="text-xl font-noto font-bold mb-5">
              Head office of the company
            </h3>

            {headOffices.map((office, i) => (
              <div key={i} className="grid grid-cols-2 gap-8 ml-5">
                {(office?.usa_address ||
                  office?.usa_email ||
                  office?.usa_phone ||
                  office?.usa_fax) && (
                  <div>
                    <div className="flex gap-4 items-center mb-5">
                      <img className="w-16" src={USA} alt="USA" />
                      <span className="text-2xl font-poppins">USA</span>
                    </div>
                    <div>
                      {office?.usa_address && (
                        <div className="flex items-center gap-2 mb-3">
                          <FaHome size={19} />
                          <span className="font-poppins">
                            {office?.usa_address}
                          </span>
                        </div>
                      )}
                      {office?.usa_email && (
                        <div className="flex items-center gap-2 mb-3">
                          <FaEnvelope size={19} />
                          <span className="font-poppins">
                            {office?.usa_email}
                          </span>
                        </div>
                      )}
                      {office?.usa_phone && (
                        <div className="flex items-center gap-2 mb-3">
                          <FaPhone size={19} />
                          <span className="font-poppins">
                            {office?.usa_phone}
                          </span>
                        </div>
                      )}
                      {office?.usa_fax && (
                        <div className="flex items-center gap-2 mb-3">
                          <FaPrint size={19} />
                          <span className="font-poppins">
                            {office?.usa_fax}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {(office?.uk_address ||
                  office?.uk_email ||
                  office?.uk_phone ||
                  office?.uk_fax) && (
                  <div>
                    <div className="flex gap-4 items-center mb-5">
                      <img className="w-16" src={UK} alt="UK" />
                      <span className="text-2xl font-poppins">UK</span>
                    </div>
                    <div>
                      {office?.uk_address && (
                        <div className="flex items-center gap-2 mb-3">
                          <FaHome size={19} />
                          <span className="font-poppins">
                            {office?.uk_address}
                          </span>
                        </div>
                      )}
                      {office?.uk_email && (
                        <div className="flex items-center gap-2 mb-3">
                          <FaEnvelope size={19} />
                          <span className="font-poppins">
                            {office?.uk_email}
                          </span>
                        </div>
                      )}
                      {office?.uk_phone && (
                        <div className="flex items-center gap-2 mb-3">
                          <FaPhone size={19} />
                          <span className="font-poppins">
                            {office?.uk_phone}
                          </span>
                        </div>
                      )}
                      {office?.uk_fax && (
                        <div className="flex items-center gap-2 mb-3">
                          <FaPrint size={19} />
                          <span className="font-poppins">{office?.uk_fax}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className=" p-4 pl-0">
              <form className="flex" onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-md border-t border-b border-l text-gray-800 bg-white focus:outline-none border-slate-400"
                  required
                  onChange={handleInputChange}
                />
                <button
                  disabled={IsLoading}
                  type="submit"
                  className="hover:bg-white text-white bg-blue-950 hover:text-blue-950 px-4 py-2 rounded-r-md border hover:border-blue-950 border-white focus:outline-none"
                >
                  {" "}
                  {IsLoading ? "Loading..." : "Subscribe"}{" "}
                </button>
              </form>
            </div>
          </div>

          {sections.map((section, i) => (
            <div key={i}>
              <h3 className="text-xl font-noto font-bold mb-4">
                {section.title}
              </h3>

              {section.items.map(
                (item, i) =>
                  item.name.toLowerCase() !== "Global Locations" && (
                    <div key={i} className="flex flex-col gap-1 capitalize">
                      <Link to={item?.link} className="link link-hover">
                        {item.name}
                      </Link>
                    </div>
                  )
              )}

              {section.items.map(
                (item, i) =>
                  item.name.toLowerCase() === "Global Locations" && (
                    <div key={i} className="flex flex-col gap-1 capitalize">
                      <Link to={item?.link} className="link link-hover">
                        {item.name}
                      </Link>
                    </div>
                  )
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-[0.5px] border-x-0 border-b-0 border-t-slate-700 mt-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center mb-4">
            {paymentIcons.map((method, index) => (
              <img
                className="w-20 sm:w-24 mx-2 drop-shadow-md shadow-orange-50 object-contain"
                src={method.icon}
                alt={`Payment Method ${index}`}
                key={index}
              />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {socialIcons.map((social, index) => (
              <Link
                key={index}
                to={social?.link}
                target="_blank"
                className="text-gray-600 hover:text-gray-900 mx-2 "
              >
                <img
                  className="w-16 object-contain"
                  src={social.icon}
                  alt={`Social Media ${index}`}
                  key={index}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-6 border-[0.2px] border-x-0 border-b-0 border-t-slate-700 mt-12 text-center">
        <div className="container mx-auto text-center">
          Copyright @ {year} DTC. All right Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
