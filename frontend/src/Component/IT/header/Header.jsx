import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHome, FaBaseballBall, FaFirstOrder } from "react-icons/fa";
import { FiCodepen } from "react-icons/fi";
import {
  MdNotifications,
  MdOutlineMiscellaneousServices,
  MdOutlineSecurity,
  MdPerson,
} from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { BsCreditCard2Front } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { Base_URL } from "../../../Constant";

const Header = ({ BrandLogo }) => {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("DTCUserToken")
  );
  const [username, setUsername] = useState(localStorage.getItem("DTCUsername"));
  const [showMenu, setShowMenu] = useState(false);
  const [header, setHeader] = useState([]);

  useEffect(() => {
    setUserToken(localStorage.getItem("DTCUserToken"));
    setUsername(localStorage.getItem("DTCUsername"));
  }, [localStorage.getItem("DTCUserToken")]);

  useEffect(() => {
    axios
      .get(Base_URL + "/api/header/header-view/")
      .then((response) => {
        setHeader(response.data["navbar"]);
      })
      .catch((error) => {
        toast.error("Error fetching data:");
      });
  }, []);

  const menuData = [
    { icon: <FaHome />, label: "Home", to: "/it/home" },
    { icon: <FiCodepen />, label: "Technology", to: "/it/technology" },
    {
      icon: <MdOutlineMiscellaneousServices />,
      label: "Our Services",
      to: "/it/services",
    },
    { icon: <MdNotifications />, label: "Notice", to: "/it/notice" },
    { icon: <MdOutlineSecurity />, label: "Security", to: "/it/security" },
    { icon: <FaFirstOrder />, label: "Order", to: "/it/order-page" },
    {
      icon: <RiCustomerService2Line />,
      label: "Contact Us",
      to: "/it/contact",
    },
    { icon: <BsCreditCard2Front />, label: "Company", to: "/it/company" },
  ];

  return (
    <header className="bg-slate-100 sticky top-0 shadow-md font-noto z-[1030]">
      <div className="flex justify-between items-center py-2 px-5">
        <Link to="/it/home">
          {BrandLogo?.ITsite?.img ? (
            <img src={BrandLogo?.ITsite?.img} className="w-12" alt="IT" />
          ) : (
            <FaBaseballBall
              size={40}
              color="#FF5733"
              className=" drop-shadow-lg"
            />
          )}
        </Link>
        <nav className="hidden lg:flex items-center space-x-2">
          {menuData.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className="flex items-center justify-between font-medium hover:bg-blue-950 hover:text-slate-100 duration-300 gap-2 px-3 py-2 text-slate-950 bg-slate-100"
              activeClassName="bg-blue-950 text-slate-100 font-bold"
              exact
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
          {userToken && (
            <NavLink
              key="profile"
              to="/it/profile"
              className="flex items-center justify-center font-medium hover:bg-blue-950 hover:text-slate-100 duration-300 gap-2 px-3 py-2 text-slate-950 bg-slate-100"
              activeClassName="bg-blue-950 text-slate-100 font-bold"
            >
              <span>
                <MdPerson />
              </span>
              <span>{username ? username : "Profile"}</span>
            </NavLink>
          )}
        </nav>
        <HiOutlineMenuAlt3
          onClick={() => setShowMenu(true)}
          size={36}
          className="lg:hidden cursor-pointer hover:opacity-60 duration-300"
        />
        {showMenu && (
          <div className="lg:hidden absolute top-0 right-0 bg-slate-100 w-full h-96 flex flex-col items-center overflow-y-auto">
            <MdClose
              onClick={() => setShowMenu(false)}
              size={36}
              className="absolute top-0 right-0 cursor-pointer hover:opacity-60 duration-300"
            />
            <div className="flex flex-col items-center gap-2 mt-16">
              {menuData.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  className="w-full flex flex-col text-center justify-center items-center font-medium hover:bg-blue-950 hover:text-slate-100 duration-300 py-2 text-slate-950 bg-slate-100"
                  activeClassName="bg-blue-950 text-slate-100 font-bold"
                  exact
                >
                  <span>{item.icon}</span>
                  <span className="ml-2">{item.label}</span>
                </NavLink>
              ))}
              {userToken && (
                <NavLink
                  key="profile"
                  to="/it/profile"
                  className="w-full flex flex-col items-center justify-center text-center font-medium hover:bg-blue-950 hover:text-slate-100 duration-300 py-2 text-slate-950 bg-slate-100"
                  activeClassName="bg-blue-950 text-slate-100 font-bold"
                >
                  <span>
                    <MdPerson />
                  </span>
                  <span className="ml-2">
                    {username ? username : "Profile"}
                  </span>
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
