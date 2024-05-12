import { Link, Outlet } from "react-router-dom";
import { FaAddressCard, FaAngleDown, FaAngleUp, FaAngular, FaApple, FaArtstation, FaBars, FaBaseballBall, FaBriefcase, FaCheck, FaCog, FaCompactDisc, FaDollarSign, FaExternalLinkAlt,
    FaGem, FaGlobe, FaLink, FaLock, FaMedrt, FaPodcast, FaQrcode, FaRebel, FaRegClone, FaShoppingCart, FaUndoAlt, FaVimeoSquare, FaWindowRestore, FaYarn, } from "react-icons/fa";
import { useEffect, useState } from "react";
import { SiJirasoftware } from "react-icons/si";
import { useNavigate} from 'react-router-dom';


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
    const [footerIsOpen, setFooterIsOpen] = useState(false);

    return (
        <div>
            {/* head */}
            <div className="h-12 bg-blue-950 fixed z-[3000] shadow-sm shadow-slate-50 flex w-full items-center justify-around   ">
                <div className="flex flex-around gap-x-12 md:gap-x-24 ">
                    {/* mobile responsive sign */}
                    <label htmlFor="my-drawer-2" className="drawer-button text-slate-100 p-0 cursor-pointer lg:hidden " >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="block hover:bg-slate-400 w-12 px-2  h-8 stroke-current text-center">
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

                {DTCAdminname &&  <div className="font-semibold text-white capitalize "> {DTCAdminname} </div>}
            </div>

            {/* body */}
            <div className="drawer lg:drawer-open relative divide-x-2 bg-blue-950">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center bg-blue-950">

                    <Outlet ></Outlet>

                </div>
                <div className="drawer-side z-[40000]">

                    <ul className="menu p-4 w-64 h-[100vh] grid grid-cols-1 overflow-y-scroll bg-blue-950 text-white">

                        {/* Sidebar content here */}

                        <li className="text-2xl font-semibold  flex flex-row gap-0 items-center mt-6 justify-between">
                            <div className=" cursor-text  text-slate-100 hover:text-slate-100"> Admin IT  </div> 
                            <label htmlFor="my-drawer-2" className="text-slate-100 hover:text-slate-100 hover:bg-slate-400 cursor-pointer drawer-button lg:hidden" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="block w-6 h-6 stroke-current text-center"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                {/* <img className="w-4 h-4" src={dashboard} alt="" /> */}
                                <FaQrcode></FaQrcode>
                                <Link className=" w-full rounded-none m-0" to="/admin/it">
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
                                        to="/admin/it/all-orders"
                                    >
                                        All
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaUndoAlt />
                                    <Link className=" w-full rounded-none m-0" to="/admin/it/pending-orders">
                                        Pending
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaGem className="rounded-full"></FaGem>
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/it/payment-orders"
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
                                        to="/admin/it/working-orders"
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
                                        to="/admin/it/complete-orders"
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
                                        to="/admin/it/delivery-orders"
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
                                        to="/admin/it/cancelled-orders"
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
                                <Link className=" w-full rounded-none m-0" to="/admin/it/transaction">
                                    Transaction
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/user-list">
                                    Users
                                </Link>
                            </div>
                        </li>
                        {/* <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/header">
                                    Header
                                </Link>
                            </div>
                        </li> */}
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/brand-item">
                                    Brand IT
                                </Link>
                            </div>
                        </li>

                        
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/banner">
                                    Banner
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/bottom-banner">
                                    BottomBanner
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/readmore">
                                    Readmore
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/payment-method">
                                    Payment Method
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/account">
                                    Account
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaAddressCard></FaAddressCard>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/templates">
                                    Templates
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                {/* <img className="w-4 h-4" src={products} alt="" /> */}
                                <FaRegClone></FaRegClone>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/product-category">
                                    Product-Category
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                {/* <img className="w-4 h-4" src={products} alt="" /> */}
                                <FaRegClone></FaRegClone>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/products">
                                    Products
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaBriefcase></FaBriefcase>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/services">
                                    Services
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaLock></FaLock>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/security">
                                    Security
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaLock></FaLock>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/notice">
                                    Notice
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaLock></FaLock>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/contact">
                                    Contact
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaLock></FaLock>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/news-letter">
                                    News-Letter
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaLock></FaLock>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/global-location">
                                    Global Location
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaAngular></FaAngular>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/company">
                                    Company
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaAngular></FaAngular>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/technology-category">
                                    Technology Category
                                </Link>
                            </div>
                        </li>
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaAngular></FaAngular>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/technology">
                                    Technology
                                </Link>
                            </div>
                        </li>

                        <li className="mt-3" onClick={() => setFooterIsOpen((prev) => !prev)}>
                            <div className="flex flex-row hover:bg-white">
                                <FaVimeoSquare></FaVimeoSquare>

                                <button className="flex items-center gap-2 justify-center" >
                                    Footer
                                    {/* Order dropdown */}

                                    {footerIsOpen ?  (<FaAngleUp />): (<FaAngleDown />)}
                                </button>
                            </div>
                        </li>
                        {footerIsOpen && (
                        <>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaMedrt />
                                    <Link className=" w-full rounded-none m-0" to="/admin/it/pages">
                                        Pages
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaLink></FaLink>
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/it/footer-section"
                                    >
                                        Section
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaLink></FaLink>
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/it/footer-item"
                                    >
                                        Section item
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaLink></FaLink>
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/it/head-office"
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
                                        to="/admin/it/social-icon"
                                    >
                                        Social Links
                                    </Link>
                                </div>
                            </li>
                            <li className="mt-3 ml-7">
                                <div className="flex flex-row hover:bg-white">
                                    <FaWindowRestore></FaWindowRestore>
                                    <Link
                                        className=" w-full rounded-none m-0"
                                        to="/admin/it/payment"
                                    >
                                        Payments
                                    </Link>
                                </div>
                            </li>
                        </>
                        )}
                        {/* <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaCog></FaCog>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/settings">
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
{/*                             
                        <li className="mt-3">
                            <div className="flex flex-row hover:bg-white">
                                <FaArtstation></FaArtstation>
                                <Link className=" w-full rounded-none m-0" to="/admin/it/design">
                                    Design
                                </Link>
                            </div>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Main;