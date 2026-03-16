const productReducer = (state, action) => {

  switch (action.type) {

    // when API call starts
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    // when API fails
    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    // when API succeeds
    case "SET_API_DATA":
      return {
        ...state,
        isLoading: false,
        isError: false,
        products: action.payload,
      };

    // fallback
    default:
      return state;
  }
};

export default productReducer;
