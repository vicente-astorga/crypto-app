import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteCoin,
  deleteFavoriteCoin,
} from "../actions/favoriteActions";
import Tail from "../assets/tail-spin.svg";

// import { useFavoriteContext } from "../context/FavoriteContext";

const CoinItem = ({ coin }) => {
  // const [savedCoin, setSavedCoin] = useState(false);
  const [boolean, setBoolean] = useState(false);

  const dispatch = useDispatch();
  const mode = useSelector((state) => state.favorite);
  const { favoriteCoins, loadingAction } = mode;

  useEffect(() => {
    setBoolean(favoriteCoins.some((el) => el.id === coin.id));
    setTarget(false);
  }, [favoriteCoins]);

  const [target, setTarget] = useState(false);
  const handlerTarget = () => {
    setTarget(true);
  };

  return (
    <div
      className="font-main tracking-wider flex justify-between overflow-hidden"
      style={{
        flexShrink: 0,
        scrollSnapAlign: "center",
      }}
    >
      <Link to={`/coin/${coin.id}`}>
        <div className="flex w-16 h-16 rounded-[15px] bg-button items-center justify-center">
          <img className="w-8 rounded-full" src={coin.image} alt={coin.id} />
        </div>
      </Link>
      {/*  */}
      <div className="flex justify-center items-start w-[7rem] flex-col">
        <div className="flex w-full justify-between">
          <span>{coin.symbol.toUpperCase()}</span>
          <span>
            {coin.price_change_percentage_24h > 0 ? (
              <p className="text-[#9DCF95]">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            ) : (
              <p className="text-[#CC8080]">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            )}
          </span>
        </div>
        <span className="text-secondary text-sm">
          ${coin.current_price.toLocaleString()}
        </span>
      </div>
      {/*  */}
      <div className=" justify-center items-center hidden sm:flex">
        ${coin.market_cap.toLocaleString()}
      </div>
      <div className="flex justify-center items-center">
        <div className="w-20">
          <Sparklines data={coin.sparkline_in_7d.price}>
            <SparklinesLine
              style={{ strokeWidth: 3, fill: "none", stroke: "#aaaaaa" }}
            />
          </Sparklines>
        </div>
      </div>

      <div
        className="flex items-center justify-center w-8"
        onClick={handlerTarget}
      >
        {loadingAction && target ? (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <img className="w-5 h-5" src={Tail} alt="loader" />
          </div>
        ) : boolean ? (
          <AiFillStar
            size={25}
            onClick={() => dispatch(deleteFavoriteCoin(coin.id))}
            className="cursor-pointer"
          />
        ) : (
          <AiOutlineStar
            size={25}
            onClick={() => dispatch(addFavoriteCoin(coin))}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default CoinItem;
