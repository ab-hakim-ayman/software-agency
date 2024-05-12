import { Link, Outlet } from "react-router-dom";

import { useNavigate} from 'react-router-dom';
// import { Link } from "react-router-dom";

import {
    FaAddressCard,
    FaAngleDown,
    FaAngleUp,
    FaAngular,
    FaApple,
    FaArtstation,
    FaBars,
    FaBaseballBall,
    FaBriefcase,
    FaCheck,
    FaCog,
    FaCompactDisc,
    FaDollarSign,
    FaExternalLinkAlt,
    FaGem,
    FaGlobe,
    FaLink,
    FaLock,
    FaMedrt,
    FaPodcast,
    FaQrcode,
    FaRebel,
    FaRegClone,
    FaShoppingCart,
    FaUndoAlt,
    FaVimeoSquare,
    FaWindowRestore,
    FaYarn,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { SiJirasoftware } from "react-icons/si";

// import { AuthContext } from "../Providers/AuthProviders";

const Main = () => {

    const navigate = useNavigate()
    const [DTCUserToken, setuserToken] = useState(localStorage.getItem('DTCAdminToken'))
    const [DTCAdminname, setDTCAdminname] = useState(localStorage.getItem('DTCAdminname'))

    useEffect(() => {
        setuserToken(localStorage.getItem('DTCAdminToken'))
    }, [localStorage.getItem('DTCAdminToken')])

    useEffect(() => {
        setDTCAdminname(localStorage.getItem('DTCAdminname'))
    }, [localStorage.getItem('DTCAdminname')])
    
    useEffect(() => {
        if(!DTCUserToken){
            navigate('/admin/login', { replace: true });
        }
    }, [DTCUserToken])


    function Userlogout(){
        localStorage.removeItem("DTCAdminToken");
        localStorage.removeItem("DTCAdminRefresh");
        localStorage.removeItem("DTCAdminname");
        localStorage.removeItem("DTCAdminEmail");
        localStorage.removeItem('DTCAdminID');
        navigate('/admin/login', { replace: true });
        window.location.reload();
    }
    const [orderIsOpen, setOrderIsOpen] = useState(false);
    const [featureDesingIsOpen, setFeatureDesignIsOpen] = useState(false);
    const [footerIsOpen, setFooterIsOpen] = useState(false);

    return (
        <div>
            {/* head */}
            <div className="h-12 bg-slate-950 text-yellow-300 fixed z-[3000] shadow-sm shadow-yellow-100 flex w-full items-center justify-around  ">
                <div className="flex flex-around gap-x-12 md:gap-x-24 ">
                    {/* mobile responsive sign */}
                    <label htmlFor="my-drawer-2" className="drawer-button text-yellow-300 hover:text-black hover:bg-yellow-400 p-0 cursor-pointer lg:hidden " >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="block w-12 px-2  h-8 stroke-current text-center">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                    <div className="flex items-center gap-2 cursor-pointer">
                        {/* <Link to="/admin">
                            <FaApple size={30} color="#999999" /> 
                        </Link> */}
                        <Link to="/admin/it">
                            <FaBaseballBall size={30} color="#FF5733" />
                        </Link>
                        <Link to="/admin/civil">
                            <SiJirasoftware size={30} color="#0052CC" />
                        </Link>
                    </div>
                </div>

                {DTCAdminname &&  <div className="font-semibold  capitalize "> {DTCAdminname} </div>}
            </div>

            {/* body */}
            <div className="drawer lg:drawer-open relative divide-x-2 ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center bg-slate-950 text-yellow-300 ">


                    <Outlet className="bg-slate-950 text-yellow-300 "></Outlet>


                </div>
                <div className="drawer-side z-[40000]">

                    <ul className="menu p-4 w-64 h-[100vh] grid grid-cols-1 overflow-y-scroll bg-slate-950 text-yellow-300">

                        {/* Sidebar content here */}

                        <li className="text-2xl font-semibold  text-yellow-300 flex flex-row gap-0 items-center mt-6 justify-between">
                            <span className="cursor-text text-yellow-300 hover:text-yellow-300 "> Admin Civil  </span> 
                            <label htmlFor="my-drawer-2" className="hover:text-black hover:bg-yellow-400 cursor-pointer drawer-button lg:hidden" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="block w-6 h-6 stroke-current text-center"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                {/* <img className="w-4 h-4" src={dashboard} alt="" /> */}
                                <FaQrcode></FaQrcode>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil">
                                    Dashboard
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3" 
                            onClick={() => setOrderIsOpen((prev) => !prev)} >
                            <div className="flex flex-row hover:bg-white">
                                <FaShoppingCart></FaShoppingCart>

                                <button
                                    className="flex items-center gap-2 justify-center"
                                >
                                    Orders

                                    {/* Order dropdown */}

                                    {!orderIsOpen ? (<FaAngleDown></FaAngleDown>) : (<FaAngleUp></FaAngleUp>)}
                                </button>
                            </div>
                        </li>
                        {orderIsOpen && (
                        <>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaPodcast />
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/civil/all-orders"
                                    >
                                        All
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaUndoAlt />
                                    <Link className=" w-full rounded-none m-0" to="/admin/civil/pending-orders">
                                        Pending
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaGem className="rounded-full"></FaGem>
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/civil/payment-orders"
                                    >
                                        Payment
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaCompactDisc className="rounded-full"></FaCompactDisc>
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/civil/working-orders"
                                    >
                                        Working
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaRebel className="rounded-full"></FaRebel>
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/civil/complete-orders"
                                    >
                                        Complete
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaYarn className="rounded-full"></FaYarn>
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/civil/delivery-orders"
                                    >
                                        Delivery
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaYarn className="rounded-full"></FaYarn>
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/civil/cancelled-orders"
                                    >
                                        Cancelled
                                    </Link>
                                </div>
                            </li>
                        </>
                        )} 

                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaDollarSign className="border rounded-full"></FaDollarSign>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/transaction">
                                    Transaction
                                </Link>
                            </div>
                        </li>
                        {/* <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/header">
                                    Header
                                </Link>
                            </div>
                        </li> */}
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/brand-item">
                                    Brand Civil
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className="w-full rounded-none m-0" to="/admin/civil/paymentMethod">
                                    Payment Method
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className="w-full rounded-none m-0" to="/admin/civil/account">
                                    Account
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/banner">
                                    Banner
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/featureworkscategory">
                                    Feature Works Category
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/featurework">
                                    Feature Work
                                </Link>
                            </div>
                        </li>
                        

                        <li className="mt-3" 
                            onClick={() => setFeatureDesignIsOpen((prev) => !prev)} >
                            <div className="flex flex-row hover:bg-white">
                                <FaShoppingCart></FaShoppingCart>

                                <button
                                    className="flex items-center gap-2 justify-center"
                                >
                                    Feature

                                    {/* Order dropdown */}

                                    {!orderIsOpen ? (<FaAngleDown></FaAngleDown>) : (<FaAngleUp></FaAngleUp>)}
                                </button>
                            </div>
                        </li>
                        {featureDesingIsOpen && (
                        <>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaArtstation></FaArtstation>
                                    <Link className=" w-full rounded-none m-0" to="/admin/civil/featuredesign">
                                        Feature Design
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaCompactDisc className="rounded-full"></FaCompactDisc>
                                    <Link className=" w-full rounded-none m-0" to="/admin/civil/deatialofFeaturdesign">
                                        Detail Of Feature Design
                                    </Link>
                                </div>
                            </li>
                            
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaRebel className="rounded-full"></FaRebel>
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/civil/imagesOfDetailsDesign"
                                    >
                                        Images Details Design
                                    </Link>
                                </div>
                            </li>
                            
                        </>
                        )} 

                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/readmore">
                                    Read More
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/bottombanner">
                                    Bottom Banner
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className="w-full rounded-none m-0" to="/admin/civil/globalLocation">
                                    Global Location
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/notice">
                                    Notice
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/contact">
                                    Contact
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/user">
                                    User
                                </Link>
                            </div>
                        </li>
                        {/* <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaAddressCard></FaAddressCard>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/templates">
                                    Templates
                                </Link>
                            </div>
                        </li> */}
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                {/* <img className="w-4 h-4" src={products} alt="" /> */}
                                <FaRegClone></FaRegClone>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/productCategory">
                                    Product Category
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                {/* <img className="w-4 h-4" src={products} alt="" /> */}
                                <FaRegClone></FaRegClone>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/products">
                                    Products
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaBriefcase></FaBriefcase>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/services">
                                    Services
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaLock></FaLock>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/security">
                                    Security
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaAngular></FaAngular>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/company">
                                    Company
                                </Link>
                            </div>
                        </li>
                        {/* <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/design">
                                    Design
                                </Link>
                            </div>
                        </li> */}

                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaVimeoSquare></FaVimeoSquare>

                                <button className="flex items-center gap-2 justify-center" onClick={() => setFooterIsOpen((prev) => !prev)}>
                                    Footer
                                    {/* Order dropdown */}

                                    {footerIsOpen ?  (<FaAngleUp />): (<FaAngleDown />)}
                                </button>
                            </div>
                        </li>
                        {footerIsOpen && (
                        <>
                            {/* <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaMedrt />
                                    <Link className=" w-full rounded-none m-0" to="/admin/civil/pages">
                                        Pages
                                    </Link>
                                </div>
                            </li> */}
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaGlobe></FaGlobe>
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/civil/footer-section"
                                    >
                                        Footer Section
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaGlobe></FaGlobe>
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/civil/footer-item"
                                    >
                                        Footer Item
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaGlobe></FaGlobe>
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/civil/head-office"
                                    >
                                        Head Office
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaLink></FaLink>
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/civil/socialLinks"
                                    >
                                        Social Links
                                    </Link>
                                </div>
                            </li>
                        </>
                        )}
                        {/* <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaCog></FaCog>
                                <Link className=" w-full rounded-none m-0" to="/admin/civil/settings">
                                    Setting
                                </Link>
                            </div>
                        </li> */}
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaExternalLinkAlt></FaExternalLinkAlt>
                                <div onClick={Userlogout} className=" w-full rounded-none m-0" >
                                    Log Out
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Main;
