import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLoader } from "../Utils/Redux/loadingSlice";
import { useDispatch, useSelector } from 'react-redux'
import { darkMode } from "../Utils/Redux/darkModeSlice";

function Login() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (inputData) => {
    if (!inputData.email || !inputData.password) {
      toast.error("All fields are required!");
    }

      dispatch(setLoader(30))
      const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/user/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      }).catch((e)=>console.log(e));
      dispatch(setLoader(70))
      const parsedRes = await res.json();
      const jwt = parsedRes.token;
      if (!jwt) {
        toast.error(parsedRes.error);
      } else {
        localStorage.setItem("token",jwt)
        navigate('/')
      }
      dispatch(setLoader(100))

  };

  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch(setLoader(40))
      setTimeout(()=>navigate('/'),800)
      dispatch(setLoader(100))
    }
  })

  return (
    <div className="flex justify-center flex-col bg-inherit py-11  w-[90%] md:w-[70%]  shadow-[0_0_40px_5px_rgba(192,132,252,0.7)]  rounded-lg sm:rounded-md ">
      <div className="flex main_logo justify-center items-center">
        <p className={`${useSelector(darkMode)?"text-white":"text-black"} text-4xl font-bold`}>Shortify <span className={`text-black bg-purple-400 px-2 py-[2px] rounded-[4px]`}>hub</span></p>
      </div>

      <div className="flex justify-center my-2 sm:my-4">
        <p className={`${useSelector(darkMode)?"text-white":"text-black"} text-lg font-semibold font-sans sm:text-2xl`}>Login to your account</p>
      </div>

      <div className="form">
        <form
          className="flex p-7 gap-9 flex-col items-center"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="flex flex-col items-center gap-1 w-[100%]">
            <input
              className={`font-medium ${useSelector(darkMode)?"text-white":"text-black"} sm:text-lg h-[4vh] font-sans pl-2 focus:outline-none focus:ring-0 w-[90%] sm:w-[70%] bg-inherit border border-purple-400 shadow shadow-purple-300 p-5 rounded-sm `}
              placeholder="Your Email Address"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="w-[100%] flex flex-col items-center">
            <input
              className={`font-medium ${useSelector(darkMode)?"text-white":"text-black"} sm:text-lg h-[4vh] font-sans pl-2 focus:outline-none focus:ring-0 w-[90%] sm:w-[70%] bg-inherit border border-purple-400 shadow shadow-purple-300 p-5 rounded-sm`}
              type="password"
              placeholder="Your Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-600  ">{errors.password.message}</p>
            )}
          </div>
          <button
            className="bg-purple-400 sm:text-lg md:text-xl hover:bg-purple-500 px-5 font-[700] font-sans sm:w-[20%] rounded-md py-2"
            type="submit"
          >
            Login
          </button>
          <div className=" ">
            <Link to="/signup" className={`${useSelector(darkMode)?"text-white":"text-black"} font-semibold`}>
              Don&#39;t have an account yet?{" "}
              <span className="text-purple-400 font-bold  cursor-pointer hover:underline">
                Sign Up
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
