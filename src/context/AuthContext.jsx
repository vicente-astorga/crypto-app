import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

const UserContext = createContext();
const UserActionsContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
    return setDoc(doc(db, "users", email), {
      watchList: [],
    });
  };
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <UserContext.Provider value={{ user }}>
      <UserActionsContext.Provider value={{signUp, signIn, logout}}>
        {children}
      </UserActionsContext.Provider>
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be within UserContext.Provider!");
  }
  return context;
};

export const useUserActionsContext = () => {
  const context = useContext(UserActionsContext);
  if (context === undefined) {
    throw new Error("useUserActionsContext must be within UserActionsContext.Provider!");
  }
  return context;
};
