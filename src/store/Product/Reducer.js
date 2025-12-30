import {
  CREATE_RATING_FAILURE,
  CREATE_RATING_REQUEST,
  CREATE_RATING_SUCCESS,
  CREATE_REVIEW_FAILURE,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
} from "./ActionType";

const initialState = {
  products: [],
  product: null,
  productsByCategory: {},
  loading: false,
  error: null,
  ratingLoading: false,
  ratingError: null,
  reviewLoading: false,
  reviewError: null,
  rating: null,
  review: null,
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

    case CREATE_RATING_REQUEST:
      return {
        ...state,
        ratingLoading: true,
        ratingError: null,
      };

    case CREATE_RATING_SUCCESS:
      return {
        ...state,
        ratingLoading: false,
        rating: action.payload,
        ratingError: null,
      };

    case CREATE_RATING_FAILURE:
      return {
        ...state,
        ratingLoading: false,
        ratingError: action.payload,
      };

    // Review cases
    case CREATE_REVIEW_REQUEST:
      return {
        ...state,
        reviewLoading: true,
        reviewError: null,
      };

    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        reviewLoading: false,
        review: action.payload,
        reviewError: null,
      };

    case CREATE_REVIEW_FAILURE:
      return {
        ...state,
        reviewLoading: false,
        reviewError: action.payload,
      };

    default:
      return state;
  }
};
