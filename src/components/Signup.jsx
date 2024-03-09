import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import {setLoader} from '../Utils/Redux/loadingSlice'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function Signup() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleSignUp= async (inputData)=>{
    try {
      dispatch(setLoader(0))
      const res = await fetch("https://sh-lcjg.onrender.com/user/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const parsedRes = await res.json();
      const jwt = parsedRes.token;
      if (!jwt) {
        toast.error(parsedRes.error);
      } else {
        localStorage.setItem("token",jwt)
        navigate('/')
      }
      dispatch(setLoader(100))
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex justify-center flex-col bg-inherit py-11 sm:py-16  w-[90%] md:w-[70%]  shadow-[0_0_40px_5px_rgba(192,132,252,0.7)] rounded-lg sm:rounded-md  ">
      <div className="flex main_logo justify-center items-center">
        <p className={`text-black text-4xl font-bold`}>Shortify <span className={`text-black bg-purple-400 px-2 py-[2px] rounded-[4px]`}>hub</span></p>
      </div>

      <div className="flex justify-center my-2 sm:my-4">
        <p className="text-white text-ld sm:text-2xl">Create new account</p>
      </div>

      <div className="form">
        <form
          className="flex p-7 gap-9 flex-col items-center"
          onSubmit={handleSubmit(handleSignUp)}
        >
          <div className="flex flex-col items-center gap-1 w-[100%]">
            <input
              className="font-medium text-black sm:text-lg h-[4vh] font-sans pl-2 focus:outline-none focus:ring-0 w-[70%] bg-inherit border border-purple-400 shadow shadow-purple-300 p-5 rounded-sm "
              placeholder="Your Name"
              type="text"
              {...register("name", {
                required: "name is required",
                minLength:{
                  value:3,
                  message:"Minimum length for name is 3"
                }
              })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col items-center gap-1 w-[100%]">
            <input
              className="font-medium text-black sm:text-lg h-[4vh] font-sans pl-2 focus:outline-none focus:ring-0 w-[70%] bg-inherit border border-purple-400 shadow shadow-purple-300 p-5 rounded-sm "
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
              className="font-medium text-black sm:text-lg h-[4vh] font-sans pl-2 focus:outline-none focus:ring-0 w-[70%] bg-inherit border border-purple-400 shadow shadow-purple-300 p-5 rounded-sm"
              type="password"
              placeholder="Your Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Minimum length is 5",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600  ">{errors.password.message}</p>
            )}
          </div>
          <button
            className="bg-purple-400 text-base md:text-lg hover:bg-purple-500 px-5 font-[700] font-sans sm:w-[23%] rounded-md py-2"
            type="submit"
          >
            Sign Up
          </button>
          <div className=" ">
             <p className='text-black font-semibold'> Already have an account?{" "}
             <Link to="/login" className="">
              <span className="text-purple-600 font-extrabold  cursor-pointer hover:underline">
                Log in
              </span>
              </Link>
              </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup