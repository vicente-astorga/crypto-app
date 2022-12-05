import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import {
  addFavoriteCoin,
  deleteFavoriteCoin,
} from "../actions/favoriteActions";
import Tail from "../assets/tail-spin.svg";

const PopularItem = ({ coin }) => {
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
      className="flex flex-col h-full"
      style={{
        height: "300px",
        width: "170px",
        flexShrink: 0,
        scrollSnapAlign: "center",
      }}
    >
      <Link
        className={`text-[#F2F2F2] h-full flex flex-col justify-between p-4 rounded-t-[15px]  bg-gradient-to-b from-[#DF8B5B] to-[#DE5989]`}
        to={`/coin/${coin.id}`}
      >
        <div className="w-full flex justify-between ">
          <p>{coin.name}</p>
          <p className="opacity-50 ">{coin.symbol.toUpperCase()}</p>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-full">
            <Sparklines data={coin.sparkline_in_7d.price}>
              <SparklinesLine
                color="#ffffff"
                style={{ strokeWidth: 2, fill: "none" }}
              />
            </Sparklines>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="opacity-50 text-xs">High 24h</span>
            <span className="text-sm">${coin.high_24h.toFixed(2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="opacity-50 text-xs">Low 24h</span>
            <span className="text-sm">${coin.low_24h.toFixed(2)}</span>
          </div>
        </div>
      </Link>

      <div className="h-20 p-4  flex justify-between items-center rounded-b-[15px] bg-tertiary text-tertiary ">
        <div className="flex flex-col">
          <span className="opacity-50 text-xs">Value</span>
          <span>${coin.current_price.toLocaleString()}</span>
        </div>

        <div onClick={handlerTarget}>
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
    </div>
  );
};

export default PopularItem;
