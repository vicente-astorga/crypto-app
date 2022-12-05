import { createContext, useContext, useState, useEffect, useReducer } from "react";
import { db } from "../firebase";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useUserContext } from "./AuthContext";
import { favoriteInitialState, favoriteReducer } from "../reducers/favoriteReducer";

const FavoriteContext = createContext();

export const FavoriteContextProvider = ({ children }) => {
  const { user } = useUserContext();

  const [favCoins, setFavCoins] = useState([]);
  const coinPath = doc(db, "users", `${user?.email}`);

  const saveFav = async (coin) => {
    if (user?.email) {
      // setSavedCoin(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        }),
      });
    } else {
      alert("Please sign in to save a coin to your watch list");
    }
  };

  const deleteFav = async (id) => {
    try {
      const result = favCoins.filter((item) => item.id !== id);
      await updateDoc(coinPath, {
        watchList: result,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (user?.email) {
      onSnapshot(coinPath, (doc) => {
        setFavCoins(doc.data()?.watchList);
      });
      // setFireIsLoaded(true)
    }
  }, [user?.email]);

  // reducer

  const [favoriteState, favoriteDispatch] = useReducer(favoriteReducer, favoriteInitialState);

  return (
    <FavoriteContext.Provider value={{favoriteState, favoriteDispatch}}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error(
      "useFavoriteContext must be within FavoriteContext.Provider!"
    );
  }
  return context;
};
