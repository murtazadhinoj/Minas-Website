const cartReducer = (state, action) => {
  switch (action.type) {

    // ✅ ADD TO CART
    case "ADD_TO_CART": {
      const item = action.payload;

      const existingItem = state.cart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id &&
            cartItem.size === item.size &&
            cartItem.color === item.color
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + item.quantity,
                }
              : cartItem
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, item],
      };
    }

    // ✅ REMOVE ITEM (variant-safe)
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) =>
            !(
              cartItem.id === action.payload.id &&
              cartItem.size === action.payload.size &&
              cartItem.color === action.payload.color
            )
        ),
      };

    // ✅ INCREASE QTY (variant-safe)
    case "INCREASE_QTY":
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.id === action.payload.id &&
          cartItem.size === action.payload.size &&
          cartItem.color === action.payload.color
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      };

    // ✅ DECREASE QTY (variant-safe)
    case "DECREASE_QTY":
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.id === action.payload.id &&
          cartItem.size === action.payload.size &&
          cartItem.color === action.payload.color
            ? {
                ...cartItem,
                quantity: Math.max(1, cartItem.quantity - 1),
              }
            : cartItem
        ),
      };

      case "CLEAR_CART":
  return {
    ...state,
    cart: [],
  };

    default:
      return state;
  }
};

export default cartReducer;
