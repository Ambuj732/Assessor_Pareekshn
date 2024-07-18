import React, { useState } from "react";
import leftBg from "/leftBg.jpg";
import { BsThreeDots } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { VscEye } from "react-icons/vsc";
import { LuSquareAsterisk } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleExclamation } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import login from "../../actions/LoginScreen/login";

function Login() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const loginHandler = async (formData) => {
    try {
      const data = {
        username: formData?.username,
        password: formData?.password,
      };
      setErrors({});

      const response = await login(data);

      const code = response?.data?.code;
      const message = response?.data?.status;
      if (code !== 1000) {
        // toast.error("Username or Password Wrong!");
        console.log("Message :: ", message);
        return;
      }
      localStorage.setItem("user", JSON.stringify(response.data.usercode));
      //       toast.success("You have successfully logged in!");
      navigate("/dashboard");
    } catch (error) {
      const newErrors = {};

      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };
  return (
    <div className="min-h-screen  relative w-full lg:w-1/2 flex justify-center items-center">
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <img
          src={leftBg}
          alt=""
          className="w-full h-full object-fill absolute inset-0"
        />
      </div>
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="bg-[#ffffff] h-fit w-3/4 lg:w-4/5 xl:w-2/3 rounded-3xl p-6 flex flex-col gap-4 relative z-10"
      >
        <h1 className="text-xl font-medium text-[#858585]">
          Assessor <br />
          Login
        </h1>

        <div className="flex flex-col gap-2">
          <div className="relative h-14">
            <div>
              <input
                type="text"
                id="floating_filled"
                className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=""
                {...register("username", {
                  required: true,
                })}
              />
              <div
                htmlFor="floating_filled"
                className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
              >
                <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                <label htmlFor="" className="pl-2">
                  Username/Email
                </label>
              </div>
            </div>
          </div>

          <Link to={"/forget-username"}>
            <p className="text-[#7c7b7b] text-sm hover:cursor-pointer">
              Forget Username?
            </p>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative h-14">
            <div>
              <input
                type="text"
                id="floating_filled"
                className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=""
                {...register("password", {
                  required: true,
                })}
              />
              <VscEye className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#1C4481]" />
              <FaCircleExclamation className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 text-[#1b4581]" />
              <div
                htmlFor="floating_filled"
                className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
              >
                <LuSquareAsterisk className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />

                <label htmlFor="" className="pl-2">
                  Password
                </label>
              </div>
            </div>
          </div>

          <Link to={"/forget-password"}>
            <p className="text-[#7c7b7b] text-sm hover:cursor-pointer">
              Forget Password?
            </p>
          </Link>
        </div>
        <div className="bg-[#1b4581] text-white h-12 p-2 flex justify-center items-center rounded-3xl hover:cursor-pointer">
          <button type="submit" className="h-full w-full">
            Login
          </button>
        </div>
        <div className="text-sm text-center flex justify-center gap-2 font-semibold text-[#3C4345]">
          <p>Not registered yet? </p>
          <Link to={"/signup"}>
            <span className="text-[#0F9FCC] hover:cursor-pointer font-medium">
              Create an account
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
