import React from "react";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import Slider from "./Carousel/Slider";
import PopularItem from "./PopularItem";
import SpinLoader from "./SpinLoader";

const Popular = () => {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=3&sparkline=true";
  const { data, error } = useFetch(url);

  const mode = useSelector((state) => state);
  const { loadingList } = mode.favorite;


  return (
    <div className="font-main tracking-wider w-full">
      <Slider title="Popular Coins" type="x">
        {(data || error) && !loadingList ? (
          data?.error || error ? (
            <div>
              <h1>Error: {error ? error : data.error}</h1>
            </div>
          ) : (
            data.map((coin) => <PopularItem key={coin.id} coin={coin} />)
          ) 
        ) : (
          <SpinLoader size={1} />
        )}
      </Slider>
    </div>
  );
};

export default Popular;
