import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";
import { UnAuth } from '../../../Auth_Middleware/UnAuth';
import { Base_URL } from '../../../Constant';


const SignIn = ({path}) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [userToken] = useState(localStorage.getItem('DTCUserToken'));

    useEffect(() => {
        if(userToken){
            navigate('/it/home', { replace: true });
        }
    }, [])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(Base_URL+'/api/auth/login/', { username, password });
            const res = response.data;
            if(res.type === "error"){
                setIsLoading(false);
                toast.error(res.msg);
            }else if(res.access){
                toast.success("Login Successfull");
                localStorage.setItem('DTCUserToken', res.access);
                localStorage.setItem('DTCUserRefresh', res.refresh);
                localStorage.setItem('DTCUsername', res.user.username);
                localStorage.setItem('DTCEmail', res.user.email);
                localStorage.setItem('DTCUserID', res.user.id);
                setIsLoading(false);
                window.location.reload();
                navigate('/it/home', { replace: true });
            }else{
                setIsLoading(false);
                toast.error("Something wrong");
            }
            
            
        }catch (e) {
            setIsLoading(false);
            UnAuth(e);
        }
    };
    return (
        <div className='bg-slate-100 lg:mx-0 text-blue-950 min-h-screen flex mb-1'>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                                Email address/ Username
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    placeholder="Username or Email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-[0.5px] border-blue-950 py-1.5 text-black shadow-sm pl-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none "
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link to={path+"/forget-password"} className="font-semibold text-blue-950 hover:text-blue-800">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-[0.5px] border-blue-950 py-1.5 text-black pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none "
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`${isLoading? "text-white bg-blue-950" : " hover:bg-blue-950 text-blue-950 hover:text-white  bg-slate-100"} flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-bold border border-blue-950 hover:border-slate-100 leading-6 shadow-sm focus-visible:outline-none  `}
                            >
                                { isLoading ? <span >Loading...</span> : <span> Sign in </span>}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to={path+"/signup"} className="font-semibold leading-6 text-blue-950 hover:text-blue-900">
                            Create a new account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;