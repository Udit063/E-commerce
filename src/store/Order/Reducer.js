const orderInitialState = {
  orders: [],
  loading: false,
  error: null,
  order: null,
};

export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case "CREATE_ORDER_REQUEST":
      return { ...state, loading: true, error: null };

    case "CREATE_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        order: action.payload,
      };

    case "CREATE_ORDER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "GET_ORDER_BY_ID_REQUEST":
      return { ...state, loading: true, error: null };

    case "GET_ORDER_BY_ID_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        order: action.payload,
      };

    case "GET_ORDER_BY_ID_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
