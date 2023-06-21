import AuthReducer from "./AuthReducer";
import { createContext, useReducer } from "react";

const initState = {
  user: {
    _id: "6491b9e3cd431b4b960be1e1",
    username: "marwinkohl",
    email: "marwinkohl@gmail.com",
    password: "$2b$10$v5tJd.Wa2nbcXr9hBYlrPOti0xc.wGbbo.jFh8yxE.fMtf.sXiSbe",
    coverPicture: "",
    followers: Array,
    followings: Array,
    isAdmin: false,
    createdAt: "2023-06-20T14:38:28.005+00:00",
    updatedAt: "2023-06-20T14:38:28.005+00:00",
    __v: 0,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initState);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
