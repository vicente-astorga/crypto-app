import {
  FAVORITE_LIST_REQUEST,
  FAVORITE_LIST_SUCCESS,
  FAVORITE_LIST_FAILURE,
  FAVORITE_ITEM_ADD_FAILURE, 
  FAVORITE_ITEM_ADD_SUCCESS,
  FAVORITE_ITEM_REMOVE_SUCCESS,
  FAVORITE_ITEM_REMOVE_FAILURE,
  FAVORITE_LIST_CLEAN,
  FAVORITE_ITEM_ADD_REQUEST,
  FAVORITE_ITEM_REMOVE_REQUEST
} from "../constants/favoriteConstants";

import { db } from "../firebase";

// import nextId from 'react-id-generator'
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  addDoc,
} from "firebase/firestore";

export const listFavoriteCoins = (user) => async (dispatch) => {
  if (!user.email) return;

  let favoriteData = [];
  const coinPath = doc(db, "users", `${user?.email}`);

  async function getFavoriteCoins() {
    const docSnap = await getDoc(coinPath);
    const watchList = docSnap.data()?.watchList;
    return watchList;
  }
  try {
    dispatch({ type: FAVORITE_LIST_REQUEST });

    favoriteData = await getFavoriteCoins();

    dispatch({ type: FAVORITE_LIST_SUCCESS, payload: favoriteData });
  } catch (error) {
    dispatch({
      type: FAVORITE_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}; 

export const addFavoriteCoin = (coin) => async (dispatch, getState) => {

  const user = getState().auth.user;
  if (user?.email) {
    const coinPath = doc(db, "users", `${user?.email}`);
    try {
      dispatch({ type: FAVORITE_ITEM_ADD_REQUEST });
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        }),
      });
      // console.log("Item: " + coin.id + " successfully added");

      dispatch({
        type: FAVORITE_ITEM_ADD_SUCCESS,
        payload: {
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        },
      });

    } catch (error) {
      alert("Failed To Add: " + coin.id + error);
      dispatch({
        type: FAVORITE_ITEM_ADD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  } else {
    alert("Please sign in to save a coin to your watch list");
  }
};

//

export const deleteFavoriteCoin = (id) => async (dispatch, getState) => {

    const user = getState().auth.user;
    const coins =  getState().favorite.favoriteCoins;
    if (user?.email) {
      const coinPath = doc(db, "users", `${user?.email}`);
      try {
        dispatch({ type: FAVORITE_ITEM_REMOVE_REQUEST });

        const result = coins.filter((item) => item.id !== id);
        await updateDoc(coinPath, {
          watchList: result,
        });

        // console.log("Item: " + id + " successfully removed");

        dispatch({
          type: FAVORITE_ITEM_REMOVE_SUCCESS,
          payload: result,
        });

      } catch (error) {
        alert("Failed To remove: " + id + error);
        dispatch({
          type: FAVORITE_ITEM_REMOVE_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
};


export const cleanFavoriteCoin = () => async (dispatch) => {
  dispatch({
    type: FAVORITE_LIST_CLEAN,
  });
};