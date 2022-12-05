import {
  FAVORITE_LIST_REQUEST,
  FAVORITE_LIST_SUCCESS,
  FAVORITE_LIST_FAILURE,
  FAVORITE_ITEM_ADD_FAILURE,
  FAVORITE_ITEM_ADD_SUCCESS,
  FAVORITE_ITEM_REMOVE_SUCCESS,
  FAVORITE_ITEM_REMOVE_FAILURE,
  FAVORITE_LIST_CLEAN,
  FAVORITE_ITEM_REMOVE_REQUEST,
  FAVORITE_ITEM_ADD_REQUEST,
} from "../constants/favoriteConstants";

const initialState = {
  loadingList: false,
  loadingAction: false,
  favoriteCoins: [],
  error: "",
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    // listFavoriteCoinsReducer
    case FAVORITE_LIST_REQUEST:
      return {
        loadingList: true,
        loadingAction: false,
        favoriteCoins: [],
      };
    case FAVORITE_LIST_SUCCESS:
      return {
        loadingList: false,
        loadingAction: false,
        favoriteCoins: action.payload,
      };
    case FAVORITE_LIST_FAILURE:
      return {
        loadingList: false,
        loadingAction: false,
        error: action.payload,
      };

    // addCoinToFavoriteReducer
    case FAVORITE_ITEM_ADD_REQUEST:
      return {
        ...state,
        loadingAction: true,
      };

    case FAVORITE_ITEM_ADD_SUCCESS:
      return {
        loadingList: false,
        loadingAction: false,
        favoriteCoins: [...state.favoriteCoins, action.payload],
      };
    case FAVORITE_ITEM_ADD_FAILURE:
      return {
        loadingList: false,
        loadingAction: false,
        error: action.payload,
      };

    // removeCoinToFavoriteReducer
    case FAVORITE_ITEM_REMOVE_REQUEST:
      return {
        ...state,
        loadingAction: true,
      };

    case FAVORITE_ITEM_REMOVE_SUCCESS:
      return {
        loadingList: false,
        loadingAction: false,
        favoriteCoins: action.payload,
      };
    case FAVORITE_ITEM_REMOVE_FAILURE:
      return {
        loadingList: false,
        loadingAction: false,
        error: action.payload,
      };
    //
    case FAVORITE_LIST_CLEAN:
      return {
        loadingList: false,
        favoriteCoins: [],
      };
    // default
    default:
      return state;
  }
};

export default favoriteReducer;
