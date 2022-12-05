import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import CreditCard from "../components/CreditCard";
import Gradient from "../assets/gradient.png";

const Start = () => {
  const [isOn, setIsOn] = useState(true);

  const handlerStart = () => {
    setIsOn(false);
    document.body.classList.remove("mobile-menu-open");
  };

  useEffect(() => {
    document.body.classList.add("mobile-menu-open");
  }, []);

  return (
    <div
      className={`flex fixed z-20 p-8 left-0 transition-opacity top-0 h-full w-full flex-col items-center justify-between bg-primary font-main ${
        isOn ? "" : "opacity-0 pointer-events-none"
      }`}
      style={{
        backgroundImage: `url(${Gradient})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center right",
        backgroundSize: "contain",
      }}
    >
      <div className="w-full z-10 rotate-[-15deg] mb-32"></div>

      {/* <img src={Gradient} alt="Gradient" /> */}
      <div className="z-10 w-full">
        <h1 className="z-10 w-full font-extralight text-5xl lg:text-8xl tracking-wide">
          <span>Crypto </span>
          <span className="font-bold">App</span>
        </h1>

        <p className="mb-16 text-secondary w-full font-extralight text-md my-5 tracking-widest">
          Collect, Buy, Sell, Exchange and Earn Crypto
        </p>
      </div>

      <button
        className="z-10	bg-button w-full max-w-sm font-light text-xl px-8 py-4 mr-auto rounded-full flex justify-between"
        onClick={handlerStart}
      >
        <span className="tracking-wider">Start</span>
        <BiArrowBack className="h-full rotate-180" />
      </button>
    </div>
  );
};

export default Start;
