const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FIND_PRODUCTS_REQUEST":
    case "FIND_PRODUCT_BY_ID_REQUEST":
      return { ...state, loading: true, error: null };

    case "FINDPRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };

    case "FIND_PRODUCT_BY_ID_SUCCESS":
      return { ...state, loading: false, error: null, product: action.payload };

    case "FIND_PRODUCTS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "FIND_PRODUCT_BY_ID_FAILURE":
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};
