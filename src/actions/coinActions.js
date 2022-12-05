import {
  COIN_LIST_REQUEST,
  COIN_LIST_SUCCESS,
  COIN_LIST_FAIL,
} from "../constants/coinConstants";

export const listCoins = (url) => async (dispatch) => {
  const coinData = [];
  //
  dispatch({ type: COIN_LIST_REQUEST });

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((coin) => {
        coinData.push(coin);
      });
      dispatch({ type: COIN_LIST_SUCCESS, payload: coinData });
    })
    .catch((error) => {
      dispatch({
        type: COIN_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};
