import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFavoriteCoin } from "../actions/favoriteActions";

const SavedCoin = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.favorite);
  const { favoriteCoins } = mode;

  return (
    <div>
      {favoriteCoins?.length === 0 ? (
        <p>
          You don't have any coins saved. Please save a coin to add it to your
          watch list. <Link to="/">Click here to search coins.</Link>
        </p>
      ) : (
        <table className="w-full border-collapse text-center">
          <tbody className="flex flex-col gap-4">
            {favoriteCoins?.map((coin) => (
              <tr
                key={coin.id}
                className="flex items-center gap-4 justify-between overflow-hidden whitespace-nowrap"
              >
                <td>
                  <div className="text-center w-12"># {coin?.rank}</div>{" "}
                </td>

                <td>
                  <Link to={`/coin/${coin.id}`}>
                    <img src={coin?.image} className="w-8 " alt="/" />
                  </Link>
                </td>
                <td className="hidden sm:block w-20">{coin?.symbol.toUpperCase()}</td>
                <td className="w-40 whitespace-pre-wrap">
                  <Link to={`/coin/${coin.id}`}>{coin?.name}</Link>
                </td>
                <td>
                  <AiOutlineClose
                    onClick={() => dispatch(deleteFavoriteCoin(coin.id))}
                    className="cursor-pointer"
                    size={25}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCoin;
