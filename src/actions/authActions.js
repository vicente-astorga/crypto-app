import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
} from "../constants/authConstants";
import { cleanFavoriteCoin, listFavoriteCoins } from "./favoriteActions";

// SIGNUP
const requestSignup = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};

const receiveSignup = (user) => {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
};

const signupError = () => {
  return {
    type: SIGNUP_FAILURE,
  };
};

// LOGIN
const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE,
  };
};

// LOGOUT
const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE,
  };
};

//VERIFY
const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST,
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS,
  };
};

export const signupUser = (email, password) => (dispatch) => {
  dispatch(requestSignup());
  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
        console.log("user created")
      setDoc(doc(db, "users", email), {
        watchList: [],
      });
      dispatch(receiveSignup(user?.user));
    })
    .catch((error) => {
      //Do something with the error if you want!
      console.log(error)
      dispatch(signupError());
    });
};

export const loginUser = (email, password) => (dispatch) => {
  dispatch(requestLogin());
  signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      dispatch(receiveLogin(user?.user));
    })
    .catch((error) => {
      //Do something with the error if you want!
      dispatch(loginError());
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  signOut(auth)
    .then(() => {
      dispatch(receiveLogout());
      dispatch(cleanFavoriteCoin());
    })
    .catch((error) => {
      //Do something with the error if you want!
      dispatch(logoutError());
    });
};

export const verifyAuth = () => (dispatch) => {
  dispatch(verifyRequest());
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      dispatch(receiveLogin(user));
      // execute fav list geter
      dispatch(listFavoriteCoins(user))
    }
    dispatch(verifySuccess());
  });
};
