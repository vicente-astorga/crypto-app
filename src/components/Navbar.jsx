import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { TbCircleMinus, TbCircle } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/authActions";
// import { useUserContext } from "../context/AuthContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
    document.body.classList.toggle("mobile-menu-open");
  };
  const closeNav = () => {
    setNav(false);
  };

  const dispatch = useDispatch();
  const mode = useSelector((state) => state.auth);
  const { user } = mode;

  // const navigate = useNavigate();

  const handleSignOut = async () => {
    dispatch(logoutUser());
    handleNav();
  };

  return (
    <div className="sticky top-0 bg-primary font-main flex items-center justify-between h-20 w-full pt-6 mb-6 px-6 z-10">
      {/* brand link */}
      <div onClick={closeNav} className="z-10">
        <Link to="/">
          <h1 className="font-light text-2xl">
            Crypto <span className="font-bold">App</span>
          </h1>
        </Link>
      </div>

      <div className="hidden lg:flex gap-2 items-center">
        <Link to="/" className="px-4 py-2 bg-button rounded-[15px]">
          Home
        </Link>
        {user?.email ? (
          <>
            <Link to="/account" className="px-4 py-2 bg-button rounded-[15px]">
              Account
            </Link>
            <button
              className="bg-button text-btnText px-4  py-2 rounded-[15px]"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="px-4 py-2 bg-button rounded-[15px]">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-button text-btnText px-4 py-2 rounded-[15px]"
            >
              Sign Up
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>

      {/* Menu icon */}
      <div onClick={handleNav} className="block lg:hidden cursor-pointer z-10">
        {nav ? <TbCircleMinus size={25} /> : <TbCircle size={25} />}
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed pt-24 left-0 top-0 h-full w-full flex flex-col items-center justify-between bg-primary transition-opacity
          ${nav ? "lg:hidden" : "opacity-0 pointer-events-none"}
        `}
      >
        <ul className="w-fit px-6 text-center">
          <Link to="/">
            <li
              onClick={handleNav}
              className="bg-button text-md text-center text-md px-4 py-2 my-4 rounded-[15px] w-full mx-auto"
            >
              Home
            </li>
          </Link>
          {user?.email ? (
            <>
              <Link to="/account">
                <li
                  onClick={handleNav}
                  className="bg-button text-md text-center text-md px-4 py-2 my-4 rounded-[15px] w-full mx-auto"
                >
                  Account
                </li>
              </Link>

              <Link to="/">
                <li
                  onClick={handleSignOut}
                  className="bg-button text-md text-center text-md px-4 py-2 my-4 rounded-[15px] w-full mx-auto"
                >
                  Sign Out
                </li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin">
                <li
                  onClick={handleNav}
                  className="bg-button text-md text-center text-md px-4 py-2 my-4 rounded-[15px] w-full mx-auto"
                >
                  Sign In
                </li>
              </Link>
              <Link to="/signup">
                <li
                  onClick={handleNav}
                  className="bg-button text-md text-center text-md px-4 py-2 my-4 rounded-[15px] w-full mx-auto"
                >
                  Sign Up
                </li>
              </Link>
            </>
          )}
          <ThemeToggle className="w-full" />
        </ul>
      </div>
      {/* end Mobile menu */}
    </div>
  );
};

export default Navbar;
