import React, { useEffect, useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { rawSetTheme } from "../actions/themeActions";

const ThemeToggle = ({ width }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme);
  const { theme } = themeMode;

  useEffect(() => {
    dispatch(rawSetTheme(theme));
  }, []);

  return (
    <>
      {theme === "dark" ? (
        <button
          className="font-main tracking-wider bg-button text-md px-4 py-2 rounded-[15px]"
          onClick={() => dispatch(rawSetTheme("light"))}
        >
          <div className="w-fit flex items-center cursor-pointer">
            <HiSun className="text-primary text-lg mr-2"></HiSun> Light Mode
          </div>
        </button>
      ) : (
        <button
          className="font-main tracking-wider bg-button text-md px-4 py-2 rounded-[15px]"
          onClick={() => dispatch(rawSetTheme("dark"))}
        >
          <div className="w-fit flex items-center cursor-pointer">
            <HiMoon className="text-primary text-lg mr-2"></HiMoon> Dark Mode
          </div>
        </button>
      )}
    </>
  );
};

export default ThemeToggle;
