import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "./Carousel/Slider";
import CoinItem from "./CoinItem";
import SpinLoader from "./SpinLoader";

const CoinList = () => {
  const [res, setRes] = useState({
    data: undefined,
    error: undefined,
    loading: false,
  });

  let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true`;

  const mode = useSelector((state) => state);
  const { loadingList } = mode.favorite;

  useEffect(() => {
    fetchQuery();
  }, []);

  async function fetchQuery() {
    setRes((prevRes) => {
      return {
        ...prevRes,
        loading: true,
      };
    });

    try {
      const response = await fetch(url);

      const result = await response.json();
      setRes((prevRes) => {
        return {
          ...prevRes,
          data: result,
          error: undefined,
          loading: false,
        };
      });
    } catch (err) {
      setRes((prevRes) => {
        return {
          ...prevRes,
          error: `${err.message}`,
          loading: false,
        };
      });
    }
  }

  return (
    <div className="font-main tracking-wider w-full">
      <Slider
        className="w-full border-collapse text-center text-primary bg-primary"
        title="Ranked Coins"
        type="y"
      >
        {(res.data || res.error) && !loadingList ? (
          res.data ? (
            res.data.map((coin) => <CoinItem key={coin.id} coin={coin} />)
          ) : (
            //
            <div>Error: {res.error}</div>
          )
        ) : (
          <SpinLoader size={1} />
        )}
      </Slider>
    </div>
  );
};

export default CoinList;
