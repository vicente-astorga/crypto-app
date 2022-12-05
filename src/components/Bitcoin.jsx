import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import SpinLoader from "../components/SpinLoader";

const Bitcoin = () => {
  const url = `https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&sparkline=true`;
  const { data: coin, error } = useFetch(url);

  return (
    <Link className="w-full" to={`/coin/bitcoin`}>
      {coin || error ? (
        error ? (<div>
          <h1>Error: {error}</h1>
        </div>)
        :
        (<div className=" font-main tracking-wider">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img className="h-12" src={coin.image?.large} alt="/" />
              <div>
                <p className="text-2xl">{coin?.name}</p>
                <p className="text-secondary text-sm">
                  ({coin.symbol?.toUpperCase()} / USD)
                </p>
              </div>
            </div>
            <div>
              {coin.market_data?.current_price ? (
                <p className="text-xl">
                  ${coin.market_data.current_price.usd.toLocaleString()}
                </p>
              ) : null}
              <p className="text-secondary w-full text-right">7 days</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <div className="pt-4">
                <Sparklines data={coin.market_data?.sparkline_7d.price}>
                  <SparklinesLine
                    style={{ strokeWidth: 1, fill: "none",  stroke: "#aaaaaa" }}
                  />
                </Sparklines>
              </div>

            </div>

            
          </div>

        </div>)
      ) : (
        <SpinLoader size={1}/>
      )}
    </Link>
  );
};

export default Bitcoin;
