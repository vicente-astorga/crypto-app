import React from "react";
import CoinList from "../components/CoinList";
import CreditCard from "../components/CreditCard";
import Popular from "../components/Popular";
import { useSelector } from "react-redux";
import Bitcoin from "../components/Bitcoin";

const Home = () => {
  const mode = useSelector((state) => state.auth);
  const { user } = mode;

  return (
    <>
      <div
      className="grid max-w-xl w-full lg:max-w-6xl px-6 gap-6 grid-cols-1 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_3fr)]  "
      >
        <CreditCard user={user} number={`Welcome to Crypto App`} />
        <Bitcoin />
        <Popular />
        <CoinList />
      </div>
    </>
  );
};

export default Home;
