import React from "react";
import SavedCoin from "../components/SavedCoin";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/authActions";
import SpinLoader from "../components/SpinLoader";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mode = useSelector((state) => state);
  const { user, isAuthenticated, isVerifying, isLoggingIn, isSigningUp } =
    mode.auth;
  const { loadingList } = mode.favorite;

  const handleSignOut = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  if (user) {
  return (
    <div className="font-main mx-auto w-full mb-auto max-w-2xl tracking-wider px-6 my-8">
      {!isVerifying && !isLoggingIn && !isSigningUp && !loadingList ? (
        isAuthenticated ? (
          <div className="px-6 py-6 bg-button rounded-[15px]">
            <div className="flex justify-between items-center mb-1">
              <div>
                <h1 className="text-2xl font-medium">Account</h1>
                <div>
                  <p className="">Welcome, {user?.email}</p>
                </div>
              </div>
              <div>
                <button
                  onClick={handleSignOut}
                  className="border-[1px] font-light border-accent px-4 py-2 rounded-[15px] whitespace-nowrap"
                >
                  Sign Out
                </button>
              </div>
            </div>
            <div className="flex justfiy-between items-center">
              <div className="w-full ">
                <h1 className="text-2xl font-medium my-2">Watch List</h1>
                <SavedCoin />
              </div>
            </div>
          </div>
        ) : (
          <Navigate to="/signin" />
        )
      ) : (
        <SpinLoader size={1}/>
      )}
    </div>
  );
  } else {
    return <Navigate to="/signin" />;
  }
};

export default Account;
