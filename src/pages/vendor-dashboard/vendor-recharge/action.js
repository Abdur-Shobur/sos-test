export const initialState = {
    data: {
      amount: null,
      getwaya: "aamarpay",
    },
    apiRes: {
      amount: null,
    },
  };
  
  export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "SELECT_PAYMENT_METHOD":
        return {
          ...state,
          data: {
            ...state.data,
            payment_type: action.payload,
          },
        };
      case "INPUT":
        return {
          ...state,
          data: {
            ...state.data,
            [action.payload.name]: action.payload.value,
          },
          apiRes: {
            ...state.apiRes,
            [action.payload.name]: null,
          },
        };
      case "VALIDATION_ERROR":
        return {
          ...state,
          apiRes: {
            ...state.apiRes,
            ...action.payload,
          },
        };
      default:
        return state;
    }
  };
  