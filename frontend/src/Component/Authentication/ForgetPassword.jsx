import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";
import { Base_URL } from './../../Constant';


const SignIn = ({path}) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [DTC_Email, setDTC_Email] = useState('');
    
  
  // get Code
  const handleResend = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const authCode = {
      email: DTC_Email,
    };
    axios
      .post(Base_URL+'/api/auth/code-generate/', authCode, {})
      .then((res) => {
        if (res.data.type === "success") {
          
          localStorage.setItem("DTCEmail", DTC_Email);
          toast.success("Please check your mail");
          // reset();
          navigate(path+"/auth-code-confirmation", { replace: true });
        } else {
          if (res.data.type === "error") {
            toast.error(res.data.msg);
          }
        }
      })
      .catch(() => alert("Failed to submit"));
  };
  //=====================================

    return (
        <div className='bg-slate-100 lg:mx-0 text-blue-950 min-h-screen flex mb-1'>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight">
                        Code Verify
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleResend}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                                Enter your email
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={DTC_Email}
                                    onChange={(e) => setDTC_Email(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-[0.5px] bg-blue-100 border-blue-950 py-1.5 text-black shadow-sm pl-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 sm:text-sm sm:leading-6 focus:outline-none "
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`${isLoading? "text-white bg-blue-950" : " hover:bg-blue-950 text-blue-950 hover:text-white  bg-slate-100"} flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-bold border border-blue-950 hover:border-slate-100 leading-6 shadow-sm focus-visible:outline-none  `}
                            >
                                { isLoading ? <span >Loading...</span> : <span> Send request </span>}
                            </button>
                        </div>
                        <small className="block text-xs text-red-800">Never share your OTP code with anyone else.</small>
                    </form>
                    
                </div>
                <div>
          
                </div>
            </div>
        </div>
    );
};

export default SignIn;