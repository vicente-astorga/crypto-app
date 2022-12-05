import React from "react";
import { ReactComponent as Tail } from '../assets/tail-spin.svg';

const LogoAnimationLoader = ({message}) => {
  return (
    <div className="fixed top-0 w-full h-screen flex flex-col justify-center items-center backdrop-blur-md z-50">
        <Tail/>
        <p className="color-text-primary pt-4">{message}</p>
    </div>
  );
};

export default LogoAnimationLoader;
