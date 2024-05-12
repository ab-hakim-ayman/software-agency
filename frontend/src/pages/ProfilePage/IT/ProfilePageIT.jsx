import React, { useEffect, useState } from 'react';
// import PersonalProfile from './PersonalProfile';
import { Link, Outlet , useNavigate} from 'react-router-dom';
import img2 from '../../../assets/image/avatar.jpg'
import { SlArrowDown,SlArrowUp } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { PiAddressBookThin } from "react-icons/pi";
import { BsTelephone } from "react-icons/bs";
import { MdCastForEducation } from "react-icons/md";
import { UnAuth } from './../../../Auth_Middleware/UnAuth';
import { Base_URL } from './../../../Constant';
import axios from 'axios';
import toast from 'react-hot-toast';


const ProfilePage = () => {
    const navigate = useNavigate()
    const [ProfileOpen, setProfileOpen] = useState(false);
    const [CurrentPath, setCurrentPath] = useState(window.location.pathname);
    const [DTCUserToken, setuserToken] = useState(localStorage.getItem('DTCUserToken'))
    const [Alldatas, setAlldatas] = useState({})

    useEffect(() => {
        setuserToken(localStorage.getItem('DTCUserToken'))
    }, [localStorage.getItem('DTCUserToken')])
    
    function PathSetFunction(){    
        setTimeout(() => {
            setCurrentPath(window.location.pathname)
        }, 200);
    }


    function Userlogout(){

        localStorage.removeItem("DTCUserToken");
        localStorage.removeItem("DTCUserRefresh");
        localStorage.removeItem("DTCUsername");
        localStorage.removeItem("DTCEmail");
        localStorage.removeItem('DTCUserID');
        navigate('/it/login', { replace: true });
        window.location.reload();
    }

    useEffect(() => {
        const fetchData = async () => {
        try {
            await axios.get(Base_URL+'/api/user/self/', {
            headers: {
                Authorization: "Bearer " + DTCUserToken,
            },
            })
            .then(response =>{
                // console.log(response.data);
                setAlldatas(response.data);
            }).catch((e)=>{
                UnAuth(e)
            })
        } catch (e) {
            toast.error('Network error ')
        }
        };
        if(DTCUserToken){
            fetchData();
        }
    }, [DTCUserToken]);

    useEffect(() => {
        if(!localStorage.getItem("DTCUserToken")){
            navigate('/it/login', { replace: true });
        }
        // eslint-disable-next-line
    }, [localStorage.getItem("DTCUserToken")])

    return (
        <div className="flex justify-center relative clear-both z-[1000]">

            {/* Left Side (Navigation Drawer) */}
            <div className="lg:w-1/6 lg:block hidden min-h-screen h-full absolute top-0 left-0">
                <ul className=" bg-blue-950 text-white min-h-screen h-full">
                    {/* Navbar menu content here */}
                    <li className=" flex flex-col justify-center py-5 text-center ">
                        <div>
                            <img className='rounded-full mb-2 mx-auto w-20 h-20' src={Alldatas?.profile_picture ? Base_URL+Alldatas?.profile_picture : img2} alt={Alldatas.username} />
                        </div>
                        <div>{Alldatas.username}</div>
                    </li>


                    <div className='hover:bg-none flex flex-col gap-2 pl-4 pb-96 pt-12'>
                        <Link onClick={PathSetFunction} className={`hover:text-white hover:shadow-sm hover:shadow-slate-100 border-[0.3px] m-0 border-slate-600  hover:bg-slate-900 py-2 pl-4  ${'/it/profile/dashboard' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/it/profile/dashboard"}>Dashboard</Link>

                        <div onClick={()=>setProfileOpen(!ProfileOpen)} className={`hover:text-white hover:shadow-md cursor-pointer border-[0.3px] m-0 border-slate-600  hover:bg-slate-900 py-2 pl-4 flex items-center  ${true === ProfileOpen && ' bg-slate-900 '}`} >Profile {ProfileOpen  === true ? <SlArrowDown className="mx-2" /> : <SlArrowUp className="mx-2" /> } </div>
                        {ProfileOpen && 
                        <>
                        <Link onClick={PathSetFunction} className={`flex items-center hover:text-white hover:shadow-sm hover:shadow-slate-100  hover:bg-slate-900 py-2 pl-8 border-[0.3px] m-0 border-slate-600  ${'/it/profile' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/it/profile"}> <CgProfile className="mr-2" /> Personal Profile</Link>

                        <Link onClick={PathSetFunction} className={`flex items-center hover:text-white hover:shadow-sm hover:shadow-slate-100  hover:bg-slate-900 py-2 pl-8 border-[0.3px] m-0 border-slate-600  ${'/it/profile/address' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/it/profile/address"}> <PiAddressBookThin className="mr-2" /> Address</Link>

                        <Link onClick={PathSetFunction} className={`flex items-center hover:text-white hover:shadow-sm hover:shadow-slate-100  hover:bg-slate-900 py-2 pl-8 border-[0.3px] m-0 border-slate-600  ${'/it/profile/company-and-contact' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/it/profile/company-and-contact"}> <BsTelephone className="mr-2" /> Company And Contact</Link>

                        <Link onClick={PathSetFunction} className={`flex items-center hover:text-white hover:shadow-sm hover:shadow-slate-100  hover:bg-slate-900 py-2 pl-8 border-[0.3px] m-0 border-slate-600  ${'/it/profile/education' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/it/profile/education"}> <MdCastForEducation className="mr-2" /> Education</Link>
                        </>}

                        <Link onClick={PathSetFunction} className={`hover:text-white hover:shadow-sm hover:shadow-slate-100  border-[0.3px] m-0 border-slate-600 hover:bg-slate-900 py-2 pl-4  ${'/it/profile/Order' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/it/profile/Order"}>Order </Link>
                        <Link onClick={PathSetFunction} className={`hover:text-white hover:shadow-sm hover:shadow-slate-100  border-[0.3px] m-0 border-slate-600 hover:bg-slate-900 py-2 pl-4  ${'/it/profile/transaction' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/it/profile/transaction"}>Transaction </Link>
                        <Link onClick={PathSetFunction} className={`hover:text-white hover:shadow-sm hover:shadow-slate-100  border-[0.3px] m-0 border-slate-600 hover:bg-slate-900 py-2 pl-4  ${'/it/profile/setting' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/it/profile/setting"}>Setting </Link>
                        <Link onClick={Userlogout} className="hover:text-white hover:shadow-sm hover:shadow-slate-100  border-[0.3px] m-0 border-slate-600 hover:bg-slate-900 py-2 pl-4"   >Log out </Link>
                    </div>
                </ul>
            </div>


            {/* Right Side */}
            <div className="w-full lg:w-5/6 bg-slate-100 absolute top-0 right-0">
                <div className='flex'>
                    <label htmlFor="my-drawer-3" className="block pt-2 lg:hidden btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                    <p className='py-2 block lg:hidden mx-auto font-bold text-xl  w-1/4'>Profile</p>
                </div>
                <Outlet></Outlet>
            </div>



            {/* Mobile Drawer */}
            <input id="my-drawer-3" type="checkbox" className="lg:hidden drawer-toggle" />
            <div className="drawer drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

                <ul className="menu px-4 w-80 h-full flex flex-col justify-around bg-blue-950  text-white ">
                    {/* Sidebar content here */}

                    <div className=''>
                        <li className=" flex flex-col justify-center py-5 text-center ">
                            <div>
                                <img className='rounded-full mb-2 mx-auto w-20 h-20' src={Base_URL+Alldatas.profile_picture || img2} alt={Alldatas.username} />
                            </div>
                            <div>{Alldatas.username}</div>
                        </li>

                        {/*  */}
                        <div className=' menu flex flex-col justify-center text-center gap-6 mt-5  '>
                        <Link onClick={PathSetFunction} className={`hover:text-white hover:shadow-sm hover:shadow-slate-100 border-[0.3px] m-0 border-slate-600  hover:bg-slate-900 py-2 pl-4  ${'/profile/dashboard' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/profile/dashboard"}>Dashboard</Link>
                        <div onClick={()=>setProfileOpen(!ProfileOpen)} className={`hover:text-white hover:shadow-md cursor-pointer border-[0.3px] m-0 border-slate-600  hover:bg-slate-900 py-2 pl-4 flex items-center  ${true === ProfileOpen && ' bg-slate-900 '}`} >Profile {ProfileOpen  === true ? <SlArrowDown className="mx-2" /> : <SlArrowUp className="mx-2" /> } </div>
                        {ProfileOpen && 
                        <>
                        <Link onClick={PathSetFunction} className={`flex items-center hover:text-white hover:shadow-sm hover:shadow-slate-100  hover:bg-slate-900 py-2 pl-8 border-[0.3px] m-0 border-slate-600  ${'/profile' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/profile"}> <CgProfile className="mr-2" /> Personal Profile</Link>
                        <Link onClick={PathSetFunction} className={`flex items-center hover:text-white hover:shadow-sm hover:shadow-slate-100  hover:bg-slate-900 py-2 pl-8 border-[0.3px] m-0 border-slate-600  ${'/profile/address' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/profile/address"}> <PiAddressBookThin className="mr-2" /> Address</Link>
                        <Link onClick={PathSetFunction} className={`flex items-center hover:text-white hover:shadow-sm hover:shadow-slate-100  hover:bg-slate-900 py-2 pl-8 border-[0.3px] m-0 border-slate-600  ${'/profile/company-and-contact' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/profile/company-and-contact"}> <BsTelephone className="mr-2" /> Company And Contact</Link>
                        <Link onClick={PathSetFunction} className={`flex items-center hover:text-white hover:shadow-sm hover:shadow-slate-100  hover:bg-slate-900 py-2 pl-8 border-[0.3px] m-0 border-slate-600  ${'/profile/education' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/profile/education"}> <MdCastForEducation className="mr-2" /> Education</Link>
                        </>}
                        <Link onClick={PathSetFunction} className={`hover:text-white hover:shadow-sm hover:shadow-slate-100  border-[0.3px] m-0 border-slate-600 hover:bg-slate-900 py-2 pl-4  ${'/profile/Order' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/profile/Order"}>Order </Link>
                        <Link onClick={PathSetFunction} className={`hover:text-white hover:shadow-sm hover:shadow-slate-100  border-[0.3px] m-0 border-slate-600 hover:bg-slate-900 py-2 pl-4  ${'/profile/transaction' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/profile/transaction"}>Transaction </Link>
                        <Link onClick={PathSetFunction} className={`hover:text-white hover:shadow-sm hover:shadow-slate-100  border-[0.3px] m-0 border-slate-600 hover:bg-slate-900 py-2 pl-4  ${'/profile/setting' === CurrentPath && ' bg-slate-900  shadow-sm shadow-slate-100 '}`} to={"/profile/setting"}>Setting </Link>
                        <Link onClick={Userlogout} className="hover:text-white hover:shadow-sm hover:shadow-slate-100  border-[0.3px] m-0 border-slate-600 hover:bg-slate-900 py-2 pl-4"   >Log out </Link>
                        </div>
                    </div>
                </ul>
            </div>
        </div>

    );
};

export default ProfilePage;