import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_PRIMARY_BASE_URL } from "../../apiConstants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CommonLayout from "../../layouts/CommonLayout";
const ForgetAuthCode = () => {
  const [Isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  // resend timer state
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
  const email = localStorage.getItem("Email");
  const onSubmit = (data) => {
    setIsloading(true);
    const authCode = {
      email: email,
      code: data.EmailVerifyCode,
    };
    axios
      .post(`${API_PRIMARY_BASE_URL}auth/CodeVerify/`, authCode, {})
      .then((res) => {
        setIsloading(false);
        if (res.data.type === "success") {
          // toast.success(res.data.msg);
          reset();
          navigate("/reset-password", { replace: true });
        } else {
          if (res.data.type === "error") {
            toast.error(res.data.msg);
            navigate("/forget-auth-code", { replace: true });
          }
        }
      })
      .catch(() => alert("Failed to submit"));
  };

  const handleResend = (email) => {
    const authCode = {
      email: email,
    };
    axios
      .post(`${API_PRIMARY_BASE_URL}auth/resetPasswordRequest/`, authCode, {})
      .then((res) => {
        if (res.data.type === "success") {
          // toast.success(res.data.msg);
          toast.success(res.data.msg);
          reset();
          navigate("/forget-auth-code", { replace: true });
        } else {
          if (res.data.type === "error") {
            toast.error(res.data.msg);
            navigate("/forget-auth-code", { replace: true });
          }
        }
      })
      .catch(() => alert("Failed to submit"));
  };

  return (
    <CommonLayout>
      <div className="w-full h-[200px] bg-forgetBg bg-cover ">
        <h1 className="text-center p-20 text-4xl font-bold   text-white uppercase">
          Confirmation Code
        </h1>
      </div>

      <div className="container">
        <div className=" flex justify-center items-center pb-5 bg-white rounded-xl mt-[5%]  ">
          {/*form start */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <label
                className="block  tracking-wide text-[#523970] text-sm font-bold mb-2 "
                htmlFor="grid-first-name"
              >
                Confirmation Code
              </label>
              <input
                className="block w-full border-[#523970] text-[#523970] border  rounded-md py-2 px-2 leading-tight focus:outline-none focus:bg-white placeholder:text-sm placeholder:text-[#523970]"
                type="number"
                {...register("EmailVerifyCode", { required: true })}
                placeholder="Enter your otp code"
              />
              <small
                id="emailHelp"
                className="block mt-1 text-xs text-gray-600"
              >
                never share your OTP code with anyone else.
              </small>
            </div>

            <div className="text-center">
              {Isloading === false && (<button
                type="submit"
                className="w-full mb-1 mt-5 py-2 rounded-lg text-white bg-[#523970]"
              >
                Submit
              </button>)}
              {Isloading === true && (<button
                type="submit"
                className="w-full mb-1 mt-5 py-2 rounded-lg text-white bg-[#523970]"
                disabled
              >
                loading.....
              </button>)}
              {counter <= 0 && (
                <button
                  className="w-full my-1 py-2 rounded-lg text-white bg-[#523970] text-sm"
                  onClick={() => handleResend(email, setCounter(300))}
                >
                  Resend OTP
                </button>
              )}
            </div>
          </form>
          {/*form end */}
        </div>
        <div>
          {counter > 0 && (
            <div mt={3}>
              <p
                fontWeight={500}
                align="center"
                className=" my-3 py-2 rounded-lg  text-[#523970]"
              >
                {" "}
                Resend OTP in{" "}
                <span style={{ color: "green", fontWeight: "bold" }}>
                  {" "}
                  {min >= 1 ? "0" + min : "00"}:{sec >= 10 ? sec : "0" + sec}
                </span>{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    </CommonLayout>
  );
};

export default ForgetAuthCode;
