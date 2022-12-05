import { THEME_MODE } from "../constants/themeConstants";

export const rawSetTheme = (theme) =>  async (dispatch) => {

    const root = window.document.documentElement;
    const isDark = theme === 'dark'

    //adding theme to root element
    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(theme)

    localStorage.setItem('color-theme', theme)

    dispatch({ 
        type: THEME_MODE,
        payload: theme,
      });
}
