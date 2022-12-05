import React from "react";
import { Link } from "react-router-dom";

const TrendingItem = ({ coin }) => {
  return (
    <div className="font-main tracking-wider flex flex-col">
      <Link to={`/coin/${coin.item.id}`}>
        <div className=" p-4 flex rounded-[15px] border-[1px] border-accent text-primary ">
          <div className="w-32 flex justify-center items-center">
            <img
              // style={{ mixBlendMode: "" }}
              className="h-20 rounded-full"
              src={coin.item.large}
              alt="coin image"
            />
          </div>

          <div className="w-full h-full flex flex-col justify-evenly items-end ">
            <p className="whitespace-nowrap	">{coin.item.name}</p>
            <p className="text-secondary">{coin.item.symbol}</p>
            <span className="flex items-center">
              <img
                className="w-4 h-4 mr-1"
                src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                alt="/"
              />
              <p>{coin.item.price_btc.toFixed(5)}</p>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TrendingItem;
