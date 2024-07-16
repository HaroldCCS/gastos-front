import React, { createContext, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebasea/firebase_credentials";

const AuthContext = createContext<any>(null);


export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [curentUser, setCurrentUser] = React.useState<any>(null);
  const [userLoggedIn, setUserLoggedIn] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser)
    return unsubscribe;
  }, []);

  async function initializeUser(user: any) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value = {
    curentUser,
    userLoggedIn,
    loading
  }

  return (
    <AuthContext.Provider value= { value } >
    {!loading && children}
    </AuthContext.Provider>
  )
}
