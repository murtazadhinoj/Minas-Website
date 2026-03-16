import React, { createContext, useContext, useReducer, useEffect } from "react";
import cartReducer from "../reducers/cartReducer";

const CartContext = createContext();



// STEP 7.1 — INITIAL STATE
const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

// STEP 7.2 — PROVIDER
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // STEP 7.3 — SAVE CART TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // STEP 7.4 — ACTION DISPATCHERS
  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeItem = (item) => {
  dispatch({ type: "REMOVE_ITEM", payload: item });
};

const increaseQty = (item) => {
  dispatch({ type: "INCREASE_QTY", payload: item });
};

const decreaseQty = (item) => {
  dispatch({ type: "DECREASE_QTY", payload: item });
};

const clearCart = () => {
  dispatch({ type: "CLEAR_CART" });
};

  return (
    <CartContext.Provider
  value={{
    cart: state.cart,
    addToCart,
    removeItem,
    increaseQty,
    decreaseQty,
    clearCart,
  }}
>
      {children}
    </CartContext.Provider>
  );
};

// STEP 7.5 — CUSTOM HOOK
const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
