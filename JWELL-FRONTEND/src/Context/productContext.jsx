import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/ProductReducer";

const AppContext = createContext({
  isLoading: false,
  isError: false,
  products: [],
});

const API = "http://localhost:8080/api/products";

const AppProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    isError: false,
    products: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });

    try {
      const res = await axios.get(url);
      const products = res.data.products || [];

      dispatch({
        type: "SET_API_DATA",
        payload: products,
      });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state }}>
      {children}
    </AppContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useProductContext };
