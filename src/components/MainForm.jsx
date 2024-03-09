/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { darkMode } from "../Utils/Redux/darkModeSlice";
import { setUrls, urls } from "../Utils/Redux/urlSlice";
import AllLinks from "./AllLinks";
function MainForm() {
  const [shortUrl, setShortUrl] = useState("");
  const [userInput, setUserInput] = useState("");
  const allurls=useSelector(urls).urls
  const dispatch=useDispatch()
  function isUrlValid(userInput) {
    var res = userInput.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res == null) return false;
    else return true;
  }

  const addNewUrl=(shortId,redirectURL)=>{
    // dispatch(setUrls(urls.concat("Hello")))
    const data={
      shortId:shortId,
      redirectURL:redirectURL,
      visitHistory:[]
    }
    dispatch(setUrls(allurls?.concat(data)))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUrlValid(userInput)) {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ url: userInput }),
      };
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/createUrl`,
        options
      ).then((res) => res.json());
      if (response.id) {
        setShortUrl(`${import.meta.env.VITE_BASE_API_URL}/${response.id}`);
        addNewUrl(response.id,userInput)
      } else {
        toast.error(response.error, { transition: Bounce });
      }
    } else {
      toast.error("Enter valid url", {
        transition: Bounce,
      });
    }
  };

  const handleCopy = () => {
    console.log("Copy");
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard !", { transition: Bounce });
  };

  return (
    <div className={`flex justify-center flex-col py-8 sm:py-16 w-[90%] md:w-[70%]  rounded-md mt-8 ${useSelector(darkMode)?"bg-black shadow-[0_0_23px_4px_rgba(192,132,252,0.7)]  sm:shadow-[0_0_40px_5px_rgba(192,132,252,0.7)]":"bg-white shadow-[0_0_23px_4px_rgba(192,132,252,0.7)] sm:shadow-[10px_6px_24px_#a370d6] "} ease-out duration-500 `} >
      <div className="flex main_logo justify-center items-center">
        <p className={`${useSelector(darkMode)?"text-white":"text-black"} text-4xl font-bold`}>Shortify <span className={`${useSelector(darkMode)?"bg-purple-400":"bg-purple-400"} text-black px-2 py-[2px] rounded-[4px]`}>hub</span></p>
      </div>

      <div className="heading flex justify-center my-8">
        <p className={`${useSelector(darkMode)?"text-white":"text-black"} font-semibold font-sans text-[18px] sm:text-[28px]`}>
          Paste{" "}
          <span className="text-black bg-purple-400 px-2 py-[2px] rounded-md">
            the
          </span>{" "}
          URL to be{" "}
          <span className="text-black bg-purple-400 px-2  py-[2px] rounded-md">
            shortened
          </span>
        </p>
      </div>

      <div className="form" onSubmit={handleSubmit}>
        <form className="flex justify-center" action="">
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter the link here"
            className={` font-medium text-lg font-sans w-[50%] h-[50px] sm:h-[50px] rounded-l-md pl-2 focus:outline-none focus:ring-0 ${useSelector(darkMode)?"":" shadow-[0px_6px_20px_5px_rgba(0,0,0,0.15)]  "}`}
            type="text"
          />
          <button
            className="bg-purple-400 sm:text-lg md:text-xl hover:bg-purple-300 rounded-r-md px-5 font-[700] font-sans"
            type="submit"
          >
            Shorten URL
          </button>
        </form>
      </div>

      <div
        style={{ scale: !shortUrl && "0" }}
        className=" origin-center transition-all duration-300 ShortLink flex justify-center mt-6"
      >
        <div className=" bg-purple-400 w-[90%] xl:w-[70%]  px-3 md:px-5 justify-between  h-[5vh] flex items-center mb-3 ">
          <div className="div flex items-center space-x-1  sm:space-x-3">
            <p className="text-black font-[700] md:text-xl font-sans text-xs sm:text-xl">
              {shortUrl}
            </p>

            <img
              onClick={handleCopy}
              className="cursor-pointer h-[20px]"
              src="/copy-icon.svg"
            />
          </div>
          <div className="utils">
            <a href={shortUrl} target="blank">
              <img
                className=" hover:cursor-pointer h-[20px]"
                src="/external_link.png"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
      <div className="w-[100%] flex justify-center">
        {<AllLinks />}
      </div>
    </div>
  );
}

export default MainForm;
