import {
    COIN_LIST_REQUEST,
    COIN_LIST_SUCCESS,
    COIN_LIST_FAIL
  } from '../constants/coinConstants'
 
const coinListReducer = (state = { coins: [] }, action) => {
  switch (action.type) {
    case COIN_LIST_REQUEST:
      return {
        loading: true,
        coins: [],
      };

    case COIN_LIST_SUCCESS:
      return {
        loading: false,
        coins: action.payload,
      };

    case COIN_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default coinListReducer