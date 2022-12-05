import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import coinListReducer from "./reducers/coinReducer";
import themeReducer from "./reducers/themeReducer";
import authReducer from "./reducers/authReducer";
import favoriteReducer from "./reducers/favoriteReducer";

import { verifyAuth } from "./actions/authActions";

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  coinsList: coinListReducer,
  favorite: favoriteReducer,
});

export default function mainStore(persistedState) {
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk)
  );
  store.dispatch(verifyAuth());
  return store;
}

//

// const initialState = {};

// const middleware = [thunk];

// const store = configureStore(
//   {
//     reducer: rootReducer,
//   },
//   initialState,
//   composeWithDevTools(applyMiddleware(middleware))
// );
// export default store;

// export default function mainStore(persistedState) {
//   const store = configureStore(
//     {
//       reducer: rootReducer,
//     },
//     initialState,
//     composeWithDevTools(applyMiddleware(middleware))
//   );
//   console.dir(store)
//   store.dispatch(verifyAuth());
//   return store;
// }
