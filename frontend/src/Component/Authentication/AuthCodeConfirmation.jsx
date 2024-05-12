import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";
import { UnAuth } from '../../Auth_Middleware/UnAuth';
import { Base_URL } from './../../Constant';


const SignIn = ({path}) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [DTC_Email, setDTC_Email] = useState('');
    const [DTC_CODE, setDTC_CODE] = useState('');
    
    
    const [counter, setCounter] = useState(300);
  const [min, setMin] = useState(counter / 60);
  const [sec, setSec] = useState(counter % 60);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    counter > 0 && setMin(parseInt(counter / 60));
    counter > 0 && setSec(counter % 60);
    return () => clearInterval(timer);
  }, [counter, min]);

  // get email
  const DTCemail = localStorage.getItem("DTCEmail");


  useEffect(() => {
    setDTC_Email(DTCemail)
  }, [DTCemail])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const authCode = {
      email: DTCemail,
      code: DTC_CODE,
    };
    axios
      .post(Base_URL+'/api/auth/code-verify/', authCode, {})
      .then((res) => {
        setIsLoading(false);
        if (res.data.type === "success") {
          toast.success("Login Now");
          // reset();
          navigate(path+"/login", { replace: true });
        } else {
          if (res.data.type === "error") {
            toast.error(res.data.msg);
            setMin(0)
            setSec(0)
            setCounter(0)
            // navigate(path+"/forget-auth-code", { replace: true });
          }
        }
      })
      .catch(() => {
        toast.error("Failed to submit")
        setIsLoading(false);
      });
  };

  const handleResend = (email) => {
    const authCode = {
      email: email,
    };
    axios
      .post(Base_URL+'/api/auth/code-generate/', authCode, {})
      .then((res) => {
        if (res.data.type === "success") {
          toast.success("Please check your mail");
          // reset();
          // navigate(path+"/login", { replace: true });
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
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={DTC_Email}
                                    // onChange={(e) => setDTC_Email(e.target.value)}
                                    required
                                    readOnly
                                    className="block w-full rounded-md border-[0.5px] bg-blue-100 border-blue-950 py-1.5 text-black shadow-sm pl-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 sm:text-sm sm:leading-6 focus:outline-none "
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                                    Code
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    placeholder="Code"
                                    value={DTC_CODE}
                                    onChange={(e) => setDTC_CODE(e.target.value)}
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
                                { isLoading ? <span >Loading...</span> : <span> Confirm </span>}
                            </button>
                        </div>
                        <small className="block mt-1 text-xs text-red-700">never share your OTP code with anyone else.</small>
                    </form>
                    
                    <div className='my-4'>
                      {counter <= 0 && (
                        <button
                          className="w-full my-1 py-2 rounded-lg text-white bg-[#394370] text-sm"
                          onClick={() => handleResend(DTC_Email, setCounter(300))}
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                </div>
                <div>
          {counter > 0 && (
            <div mt={3}>
              <p
                fontWeight={500}
                align="center"
                className=" my-3 py-2 rounded-lg  text-blue-950"
              >
                {" "}
                Resend OTP in{" "}
                <span className=' text-green-700 font-bold' >
                  {" "}
                  {min >= 1 ? "0" + min : "00"}:{sec >= 10 ? sec : "0" + sec}
                </span>{" "}
              </p>
            </div>
          )}
        </div>
            </div>
        </div>
    );
};

export default SignIn;