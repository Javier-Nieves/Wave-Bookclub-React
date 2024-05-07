import {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import axios from "axios";

import { SERVER_URL } from "../utils/config";

const AuthContext = createContext();

const initialState = {
  user: {},
  isLoggedIn: false,
  loadingLogin: false,
  error: null,
  jwt: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loadingLogin: true };
    case "login":
      localStorage.setItem("jwt", action.payload.jwt);
      return {
        ...state,
        isLoggedIn: true,
        loadingLogin: false,
        user: action.payload.user,
        jwt: action.payload.jwt,
      };
    case "restoreToken":
      return { ...state, jwt: action.payload };
    case "userIsAuthenticated":
      return {
        ...state,
        user: {
          name: action.payload.data?.currentUser.name,
          id: action.payload.data?.currentUser._id,
        },
        isLoggedIn: true,
        loadingLogin: false,
      };
    case "logout":
      localStorage.removeItem("jwt");
      return { ...state, isLoggedIn: false, user: null, jwt: null };
    case "rejected":
      return { ...state, loadingBooks: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isLoggedIn, loadingLogin, jwt }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // 1) initial login check
  useEffect(
    function () {
      async function checkAuth() {
        dispatch({ type: "loading" });
        try {
          // check LocalStarage for jwt token. In case of page refresh
          const savedJwt = localStorage.getItem("jwt");
          if (savedJwt) dispatch({ type: "restoreToken", payload: savedJwt });

          const res = await axios({
            method: "POST",
            url: `${SERVER_URL}api/v1/users/logged-check`,
            data: { token: jwt },
          });
          if (res.data.status === "success") {
            dispatch({
              type: "userIsAuthenticated",
              payload: res.data,
            });
          }
        } catch (err) {
          dispatch({
            type: "rejected",
            payload: `Error while checking login! ${err.message}`,
          });
        }
      }
      checkAuth();
    },
    [jwt]
  );

  const login = useCallback(
    async function login(name, password) {
      if (user === name) return;
      dispatch({ type: "loading" });
      const data = {
        name,
        password,
      };
      const res = await axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        url: `${SERVER_URL}api/v1/users/login`,
        //   credentials: "include",
        data,
      });
      if (res.data.status === "success") {
        dispatch({
          type: "login",
          payload: { user: res.data.data.user, jwt: res.data.token },
        });
      }
    },
    [user]
  );
  const register = useCallback(
    async function register(name, password, passwordConfirm) {
      if (user === name) return;
      dispatch({ type: "loading" });
      const data = {
        name,
        password,
        passwordConfirm,
      };
      const res = await axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        url: `${SERVER_URL}api/v1/users`,
        data,
      });
      if (res.data.status === "success") {
        dispatch({
          type: "login",
          payload: { user: res.data.data.user, jwt: res.data.token },
        });
      }
    },
    [user]
  );

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, loadingLogin, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context used outside of the Provider");
  return context;
}

export { AuthProvider, useAuth };
