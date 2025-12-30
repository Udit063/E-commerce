import { DELETE_PRODUCT_SUCCESS } from "./ActionType";

const initialState = {
  products: [],
  product: null,
  productsByCategory: {},
  loading: false,
  error: null,
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FIND_PRODUCTS_REQUEST":
    case "FIND_PRODUCT_BY_ID_REQUEST":
    case "GET_PRODUCTS_BY_CATEGORY_REQUEST":
      return { ...state, loading: true, error: null };

    case "FIND_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };

    case "FIND_PRODUCT_BY_ID_SUCCESS":
      return { ...state, loading: false, error: null, product: action.payload };

    case "GET_PRODUCTS_BY_CATEGORY_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        productsByCategory: {
          ...state.productsByCategory,
          [action.payload.categoryName]: action.payload.products,
        },
      };

    case "FIND_PRODUCTS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "FIND_PRODUCT_BY_ID_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "GET_PRODUCTS_BY_CATEGORY_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        deletedProduct: action.payload,
      };

    default:
      return state;
  }
};
