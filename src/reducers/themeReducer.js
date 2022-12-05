import { THEME_MODE } from "../constants/themeConstants";

const initialState = {
  theme: (function () {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedPrefs = window.localStorage.getItem("color-theme");
      if (typeof storedPrefs === "string") {
        return storedPrefs;
      }

      // const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
      // if (userMedia.matches) {
      //   return;
      // }
    }
    return "dark";
  })(),
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case THEME_MODE:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducer;
