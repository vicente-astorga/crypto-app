import React from "react";
import useFetch from "../hooks/useFetch";
import TrendingItem from "./TrendingItem";
import SpinLoader from "../components/SpinLoader";

const Trending = () => {
  const url = "https://api.coingecko.com/api/v3/search/trending";
  const { data, error, loading } = useFetch(url);

  return (
    <div className="font-main tracking-wider px-6">
      <h1 className="text-xl font-medium py-4">Trending Coins</h1>
      <div className="flex gap-4 overflow-scroll scrollbar-hidden">
        { (data || error) ? ( 
          error ? (
            <div>Error: {error.message ? error.message : error}</div>
          ) : (
            !data.coins.lenght ? <div>No hay datos</div>
            :
            (data.coins.map((coin, index) => (
              <TrendingItem coin={coin} key={index} /> 
            )))
          )
        ) : (
          <SpinLoader size={1}/>
        )}
      </div>
    </div>
  );
};

export default Trending;
