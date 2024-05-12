import React from 'react';
// import ContackUs from './ContackUs';
// import PersonalProfile from './PersonalProfile';
import { Link, Outlet } from 'react-router-dom';
import img2 from '../../assets/image/image1.jpg'

const ProfilePage = () => {
    return (
        <div className="flex justify-center  ">

            {/* Left Side (Navigation Drawer) */}
            <div className="lg:w-1/5 lg:block hidden ">
                <ul className="  bg-gray-800 text-white min-h-screen">
                    {/* Navbar menu content here */}
                    <li className=" flex flex-col justify-center py-5 text-center ">
                        <div>
                            <Link to={"/"}><img className=' mb-3 mx-auto w-20 h-20' src={img2} alt="" /></Link>
                        </div>
                        <div className="">
                            <p>Name</p>
                        </div>
                        <div>
                            <p>Email@gmail.com</p>
                        </div>
                    </li>
                    <div className=' hover:bg-none flex flex-col gap-10  pl-16 py-3'>
                        <li><Link className='hover:text-white' to={"/profile"}>Profile</Link></li>
                        <li><button className='hover:text-white'><Link to={'/profile/dashboard'}>Dashboard</Link></button></li>
                        <li><Link className='hover:text-white' to={"/profile/Order"} >Order</Link></li>
                        <li><Link className='hover:text-white' to={"/profile/transaction"}>Transaction</Link></li>
                        <li><Link className='hover:text-white' to={"/profile/setting"}>Setting</Link></li>
                        <li><button className='hover:text-white'><Link to={'/logout'}>Log out</Link></button></li>
                    </div>
                </ul>
            </div>


            {/* Right Side */}
            <div className="lg:w-4/5 w-full bg-slate-300 ">
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
                <ul className="menu p-4 w-80 h-full bg-gray-800 text-white  ">
                    {/* Sidebar content here */}
                    <li className="mx-auto  mt-5">
                        <div>
                            <Link to={"/"}><img className=' mb-3 w-20 h-20' src={img2} alt="" /></Link>
                        </div>
                        <div className="">
                            <p>Name *********</p>
                        </div>
                        <div>
                            <p>Email@gmail.com</p>
                        </div>
                    </li>
                    <div className='mx-auto hover:bg-none hover:text-white flex flex-col gap-5 py-10'>
                        <li><Link className='hover:text-white' to="/profile" >Profile</Link></li>
                        <li><button className='hover:text-white'><Link to={'/profile/dashboard'}>Dashboard</Link></button></li>
                        <li><Link className='hover:text-white' to={"/profile/Order"} >Order</Link></li>
                        <li><Link className='hover:text-white' to={"/profile/transaction"}>Transaction</Link></li>
                        <li><Link className='hover:text-white' to={"/profile/setting"}>Setting</Link></li>
                        <li><button className='hover:text-white'><Link to={'/logout'}>Log out</Link></button></li>
                    </div>
                </ul>
            </div>
        </div>

    );
};

export default ProfilePage;