import React, { useState } from "react";
// import Navbar from "../../components/nav/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_PRIMARY_BASE_URL } from "../../apiConstants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CommonLayout from "../../layouts/CommonLayout";
const ResetPassword = () => {
  const [Islaoding, setIslaoding] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const email = localStorage.getItem("Email");
  const onSubmit = (data) => {
    setIslaoding(true);
    const newPasswordData = {
      email: email,
      password1: data.password1,
      password2: data.password2,
    };
    axios
      .post(
        `${API_PRIMARY_BASE_URL}auth/forgetPasswordChange/`,
        newPasswordData,
        {}
      )
      .then((res) => {
        setIslaoding(false);
        if (res.data.type === "success") {
          // toast.success(res.data.msg);
          reset();
          navigate("/login", { replace: true });
          localStorage.removeItem("Email");
        } else {
          if (res.data.type === "error") {
            toast.error(res.data.msg);
            navigate("/reset-password", { replace: true });
          }
        }
      })
      .catch(() => alert("Failed to submit"));
  };
  return (
    <CommonLayout>
      <div className="w-full h-[200px] bg-forgetBg bg-cover ">
        <h1 className="text-center p-20 text-4xl font-bold   text-white uppercase">
          Confirmation Password
        </h1>
      </div>

      <div className="container">
        <div className="flex justify-center items-center pb-5 bg-white rounded-xl mt-[5%]  ">
          {/*form start */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <label
                className="block  tracking-wide text-[#523970] text-sm font-bold mb-2 "
                htmlFor="grid-first-name"
              >
                New Password
              </label>
              <input
                className="block w-full border-[#523970] text-[#523970] border  rounded-md py-2 px-2 leading-tight focus:outline-none focus:bg-white placeholder:text-sm placeholder:text-[#523970]"
                type="text"
                {...register("password1", { required: true })}
                placeholder="Enter your new password"
              />
            </div>
            <div className="w-full mt-2">
              <label
                className="block  tracking-wide text-[#523970] text-sm font-bold mb-2 "
                htmlFor="grid-first-name"
              >
                Confirm New Password
              </label>
              <input
                className="block w-full border-[#523970] text-[#523970] border  rounded-md py-2 px-2 leading-tight focus:outline-none focus:bg-white placeholder:text-sm placeholder:text-[#523970]"
                type="text"
                {...register("password2", { required: true })}
                placeholder="Confirm Your New Password"
              />
            </div>

            <div type="submit" className="text-center">
            {Islaoding === false &&
              <button className="w-full my-3 py-2 rounded-lg text-white bg-[#523970]">
                Submit
              </button>}
              {Islaoding === true &&
              <button className="w-full my-3 py-2 rounded-lg text-white bg-[#523970]">
                Loading.....
              </button>}
            </div>
          </form>
          {/*form end */}
        </div>
      </div>
    </CommonLayout>
  );
};

export default ResetPassword;
