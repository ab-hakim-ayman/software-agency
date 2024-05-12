import React, {useState} from 'react';
import toast from 'react-hot-toast';
import { Base_URL } from '../../Constant';
import { UnAuth } from '../../Auth_Middleware/UnAuth';
import axios from 'axios'

const Setting = () => {
    const [IsLoading, setIsLoading] = useState(false)
    // change-password
    const [pssWord, setpssWord] = useState({
        old_password : '',
        new_password : '',
        confirm_password: ''
    })
    const handleChangData = (e) => {
        setpssWord({
            ...pssWord,
            [e.target.name]: e.target.value
        });
    };

    const [userToken] = useState(localStorage.getItem('DTCUserToken'));
    function handleFormSubmit(e){
        e.preventDefault();
        setIsLoading(true)
        if(!pssWord.old_password || !pssWord.new_password || !pssWord.confirm_password){
            toast.error("Plesae fill up all filed")
            setIsLoading(false)
        }else if(pssWord.new_password !== pssWord.confirm_password){
            toast.error("new_password and confirm_password are not matched")
            setIsLoading(false)
        }else{
            try {
                axios.post(Base_URL + '/api/auth/change-password/', pssWord, {
                    headers: {
                        Authorization: 'Bearer ' + userToken,
                    },
                })
                .then((res) => {
                    setIsLoading(false)
                    if (res.data.type === "success") {
                        toast.success(res.data.msg);
                    } else {
                        toast.error(res.data.msg);
                    }
                })
                .catch((e) => {
                    if (e.response.data.type === "error") {
                        toast.error(e.response.data.msg)
                    } else {
                        UnAuth(e);
                    }
                    setIsLoading(false)
                })
            } catch (error) {
                toast.error(' Network Error');
                setIsLoading(false)
            }
        }
    }

    return (
        <div className='mx-20 my-28 min-h-screen  lg:w-[60%] '>
            <form onSubmit={handleFormSubmit}>
                <div className="col-span-full mb-4">
                    <h1 className='text-lg h-full lg:text-3xl font-bold text-center mb-10'>Change Password</h1>
                    <label htmlFor="old_password" className="block font-medium leading-6 text-gray-900">
                        Old Password
                    </label>
                    <div className="mt-2">
                        <input
                            onChange={handleChangData}
                            value={pssWord.old_password}
                            type="password"
                            name="old_password"
                            id="old_password"
                            placeholder='Old Password'
                            autoComplete="old_password"
                            className="border-[0.5px] border-blue-950 shadow-md focus:shadow-lg block w-full rounded-md  py-1.5 px-2 text-gray-900 placeholder:text-gray-400 sm:sm:leading-6  focus:outline-none"
                        />
                    </div>
                </div>

                <div className="col-span-full mb-4">
                    <label htmlFor="new_password" className="block font-medium leading-6 text-gray-900">
                        New Password
                    </label>
                    <div className="mt-2">
                        <input
                            type="password"
                            onChange={handleChangData}
                            value={pssWord.new_password}
                            name="new_password"
                            id="new_password"
                            autoComplete="new_password"
                            placeholder='New Password'
                            className="border-[0.5px] border-blue-950 shadow-md focus:shadow-lg block w-full rounded-md  py-1.5 px-2 text-gray-900 placeholder:text-gray-400 sm:sm:leading-6  focus:outline-none"
                        />
                    </div>
                </div>

                <div className="col-span-full mb-5">
                    <label htmlFor="confirm_password" className="block font-medium leading-6 text-gray-900">
                        Confirm Password
                    </label>
                    <div className="mt-2">
                        <input
                            type="password"
                            onChange={handleChangData}
                            value={pssWord.confirm_password}
                            name="confirm_password"
                            id="confirm_password"
                            placeholder='Confirm Password'
                            autoComplete="confirm_password"
                            className="border-[0.5px] border-blue-950 shadow-md focus:shadow-lg block w-full rounded-md  py-1.5 px-2 text-gray-900 placeholder:text-gray-400  sm:sm:leading-6  focus:outline-none"
                        />
                    </div>
                </div>


                <div className=" flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        disabled={IsLoading}
                        className="hover:shadow-md rounded-md w-full text-blue-950 bg-white border border-blue-950 hover:bg-blue-950 hover:text-white py-2 font-semibold focus:outline-none"
                    >
                        {IsLoading? "Loading..." : "Update Password"}
                    </button>
                </div>
            </form>


        </div>
    );
};

export default Setting;