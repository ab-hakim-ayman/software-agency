import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { Base_URL } from '../../../../Constant';
import { AdminUnAuth } from '../../../../Auth_Middleware/UnAuth';
import toast from 'react-hot-toast';


const SignIn = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userToken] = useState(localStorage.getItem('DTCAdminToken'));

    useEffect(() => {
        if(userToken){
            navigate('/admin/it', { replace: true });
        }
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(Base_URL+'/api/auth/admin-login/', { username, password });
            const res = response.data;
            if(res.type === "error"){
                setIsLoading(false);
                toast.error(res.msg);
            }else if(res.access){
                toast.success("Admin Login Successfull");
                localStorage.setItem('DTCAdminToken', res.access);
                localStorage.setItem('DTCAdminRefresh', res.refresh);
                localStorage.setItem('DTCAdminname', res.user.username);
                localStorage.setItem('DTCAdminEmail', res.user.email);
                localStorage.setItem('DTCAdminID', res.user.id);
                setIsLoading(false);
                window.location.reload();
                navigate('/admin/it', { replace: true });
            }else{
                setIsLoading(false);
                toast.error("Something wrong");
            }
        }catch (e) {
            setIsLoading(false);
            AdminUnAuth(e);
        }
    };
    return (
        <div className='bg-slate-100 lg:mx-0 text-blue-950 min-h-screen flex'>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight">
                        Sign in to your Admin account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                                Email Address
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm pl-1 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none "
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-black pl-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none "
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-bold border border-blue-950 hover:border-slate-100 text-blue-950 bg-slate-100 leading-6 hover:text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                            >
                                {isLoading? "Loading " : "Sign in"} 
                            </button>
                        </div>
                    </form>

                    
                </div>
            </div>
        </div>
    );
};

export default SignIn;