export const initialState = {
    payment_method: "aamarpay",
    package_id: "",
  };
  
  export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "SELECT_PAYMENT_METHOD":
        return {
          ...state,
          payment_method: action.payload,
        };
      case "API_DATA":
        return {
          ...state,
          package_id: action?.payload?.id,
        };
      default:
        return state;
    }
  };
  