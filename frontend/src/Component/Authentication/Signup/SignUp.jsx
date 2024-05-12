import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Base_URL } from '../../../Constant';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const SignUp = ({path}) => {
    const navigate = useNavigate()
    const [IsLoading, setIsLoading] = useState(false);
    const [IsDisabled, setIsDisabled] = useState(true);
    const [validPassword] = useState(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,25}$"));
    const [UserData, setUserData] = useState({
        username:"",
        email:"",
        countryName:"",
        password:"",
        confirm_password:""

    })
    const [errors, setErrors] = useState({});

    const handleUSerData = (e) => {
        setUserData({
          ...UserData,
          [e.target.name]: e.target.value
        });
    
      };
      

    function DisableCheck(){
        const empty = Object.values(UserData).some((val) => {
            return val === '';
        })
        if(empty){
            setIsDisabled(true)
        }
        else{
            setIsDisabled(false)
        }
    }
    useEffect(() => {
        let Error = "";
        if (!UserData.email) {
            Error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(UserData.email)) {
            Error = 'Invalid email address';
        }
        setErrors({...errors,email:Error})
        setTimeout(() => {
            DisableCheck()
        }, 300);
    }, [UserData.email])

    useEffect(() => {
        let Error = "";
        if (!UserData.username) {
            Error = 'Username is required';
        }
        setErrors({...errors,username:Error})
        setTimeout(() => {
            DisableCheck()
        }, 300);
    }, [UserData.username])

    useEffect(() => {
        let Error = "";
        if (!UserData.password) {
            Error = 'Password is required';
        } else if (UserData.password.length < 8) {
            Error = 'Password should be at least 8 characters long';
        }else if(!validPassword.test(UserData.password)){
            Error = 'Password should include at least 1 Uppercase, 1 Lowercase, and 1 Special character';
        }
        setErrors({...errors,password:Error})
        setTimeout(() => {
            DisableCheck()
        }, 300);
    }, [UserData.password])

    useEffect(() => {
        let Error = "";
        if (!UserData.countryName) {
            Error = 'Country Name is required';   
        }
        setErrors({...errors,countryName:Error})
        setTimeout(() => {
            DisableCheck()
        }, 300);
    }, [UserData.countryName])

    useEffect(() => {
        let Error = "";
        if (!UserData.confirm_password) {
            Error = 'Confirm Password is required';
        } 
        else if(UserData.password !== UserData.confirm_password) {
            Error = 'Passwords are not matched' ;
        }
        setErrors({...errors,confirm_password:Error})
        setTimeout(() => {
            DisableCheck()
        }, 300);
    }, [UserData.confirm_password])


    function checkUser() {
        if(UserData.username){
            axios.get(Base_URL+'/api/auth/username/?search='+UserData.username)
            .then(response => {
                
                if (response.data.length > 0) {
                    setErrors({...errors,username:"User with this username already exist"})
                    setIsLoading(false)
                    return true;
                }
                else{
                    return false;
                }
            }).catch(()=>{
                return false;
            })
        }
    }

    function checkEmail() {
        if(UserData.email){
            axios.get(Base_URL+'/api/auth/username/?search='+UserData.email)
            .then(response => {
                
                if (response.data.length > 0) {
                    setErrors({...errors,email:"User with this Email already exist"})
                    setIsLoading(false)
                    return true;
                }
                else{
                    return false;
                }
            }).catch(()=>{
                return false;
            })
        }
    }
    

    const checkUserAndEmail = async () => {
        try {
          // Perform the asynchronous operations here, such as making API calls
          const userExists = await checkUser();
          const emailExists = await checkEmail();

          return {userExists,emailExists}
            
        } catch (error) {
          // Handle any errors that occur during the asynchronous operations
          throw error;
        }
    };





  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    // Perform validation
    
    checkUserAndEmail()
    
    const empty = Object.values(UserData).some((val) => {
        return val === '';
    })
    if(empty){
        toast.error("Empty value! Plese fillup all field")
        setIsDisabled(false)
    }else{
        const error = Object.values(errors).some((val) => {
            return val === '';
        })
        if(error){
            axios.post(Base_URL+"/api/auth/register/", UserData)
            .then((res) => {
            if (res.data.type === "error") {
              toast.error(res.data.msg);
              setIsLoading(false);
            } else {
              toast.success(
                "Account Registered. A email sent. Please, confirm confirm your email 👋 "
              );
              localStorage.setItem("DTCEmail", UserData.email);
              setTimeout(() => {
                navigate(path+"/auth-code-confirmation", { replace: true });
              }, 1000);
              setIsLoading(false);
            }
          })
          .catch(() => {
            toast.custom((t) => (
              <div
                className={`bg-white px-6 py-4 shadow-md rounded-full ${
                  t.visible ? "animate-enter" : "animate-leave"
                }`}>
                Network Error 👋
              </div>
            ));
            setIsLoading(false);
          });
        }else{
            toast.error("Solve All Errors First")
            setIsLoading(false);
        }
        
    }
  };

    return (
        <div>
            <div className='bg-slate-100 lg:mx-0 text-blue-950 min-h-screen flex mb-1'>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8 ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight ">
                            Sign up a new account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleFormSubmit}>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder='Username'
                                        autoComplete="username"
                                        required
                                        className="block w-full rounded-md border-[0.5px] border-blue-950 py-1.5 pl-2 text-black shadow-sm  sm:text-sm sm:leading-6"
                                        value={UserData.username} onChange={handleUSerData}
                                    />
                                </div>
                            </div>
                            {errors.username && <span className='text-red-400 my-1 pl-1 font-semibold'>{errors.username}</span>}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="Email"
                                        required
                                        className="block w-full rounded-md border-[0.5px] border-blue-950 py-1.5 pl-2 text-black shadow-sm  sm:text-sm sm:leading-6"
                                        value={UserData.email} onChange={handleUSerData}
                                    />
                                </div>
                            </div>
                            {errors.email && <span className='text-red-400 my-1 pl-1 font-semibold'>{errors.email}</span>}
                            <div>
                                <label htmlFor="countryName" className="block text-sm font-medium leading-6 ">
                                    Country
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="countryName"
                                        name="countryName"
                                        type="countryName"
                                        autoComplete="country"
                                        placeholder="Country Name"
                                        required
                                        className="block w-full rounded-md border-[0.5px] border-blue-950 py-1.5 pl-2 text-black shadow-sm  sm:text-sm sm:leading-6"
                                        value={UserData.countryName} onChange={handleUSerData}
                                    />
                                </div>
                            </div>
                            {errors.countryName && <span className='text-red-400 my-1 pl-1 font-semibold'>{errors.countryName}</span>}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                        placeholder="Password"
                                        required
                                        className="block w-full rounded-md border-[0.5px] border-blue-950 py-1.5 pl-2 text-black shadow-sm  sm:text-sm sm:leading-6"
                                        value={UserData.password} onChange={handleUSerData}
                                        minLength={8}

                                    />
                                </div>
                            </div>
                            {errors.password && <span className='text-red-400 my-1 pl-1 font-semibold'>{errors.password}</span>}
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 ">
                                        Confirm Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="confirm_password"
                                        name="confirm_password"
                                        type="password"
                                        autoComplete="current-confirm_password"
                                        placeholder="Confirm Password"
                                        required
                                        className="block w-full rounded-md border-[0.5px] border-blue-950 py-1.5 pl-2 text-black shadow-sm  sm:text-sm sm:leading-6"
                                        value={UserData.confirm_password} onChange={handleUSerData}
                                        minLength={8}
                                    />
                                </div>
                            </div>
                            {errors.confirm_password && <span className='text-red-400 my-1 pl-1 font-semibold'>{errors.confirm_password}</span>}


                            <div>
                                {!IsDisabled && 
                                <button
                                    type="submit"
                                    // disabled={IsLoading}
                                    title={IsDisabled ? "Fill up all field" :"submit"}
                                    className={` ${IsLoading === true ? "bg-blue-950 text-white " : " text-blue-950 bg-white "} "flex w-full justify-center rounded-md text-blue-950 hover:text-white hover:bg-blue-950 border border-blue-950 hover:border-slate-100 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm " `}
                                >
                                   { IsLoading === true ? <span >Loading...</span> : <span>Sign up</span> }
                                </button>
                                }
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already a member?{' '}
                            <Link to={path+"/login"} className="font-semibold leading-6 text-blue-950 hover:text-blue-950">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;