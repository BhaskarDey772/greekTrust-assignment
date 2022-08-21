import { createContext, useContext, useState } from "react";

import user from "../users.json";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    name: "",
    password: "",
  });
  const localStorageData = useState(JSON.parse(localStorage.getItem("auth")));

  if (auth?.name === "" && auth?.password === "") {
    setAuth(localStorageData[0]);
  }

  const checkValidUser = () => {
    if (!auth?.name || !auth?.password) return false;

    return user.some(
      (u) => u.username === auth.name && u.password === auth.password
    );
  };

  // const checkValidUser = () => {
  //   if (!auth.name || !auth.password) {
  //     return false;
  //   }
  //   let result = false;
  //   user.forEach((item) => {
  //     if (item.username === auth.name && item.password === auth.password) {
  //       result = true;
  //     }
  //   });
  //   return result;
  //   // return true;
  // };

  return (
    <AuthContext.Provider value={{ auth, setAuth, checkValidUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
