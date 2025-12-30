import {
  CREATE_RATING_FAILURE,
  CREATE_RATING_REQUEST,
  CREATE_RATING_SUCCESS,
  CREATE_REVIEW_FAILURE,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCT_REVIEWS_REQUEST,
  GET_PRODUCT_RATINGS_FAILURE,
  GET_PRODUCT_REVIEWS_SUCCESS,
  GET_PRODUCT_RATINGS_SUCCESS,
  GET_PRODUCT_REVIEWS_FAILURE,
  GET_PRODUCT_RATINGS_REQUEST,
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
  ratingsLoading: false,
  ratingsError: null,
  ratings: null,
  reviewsLoading: false,
  reviewsError: null,
  reviews: null,
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

    case GET_PRODUCT_RATINGS_REQUEST:
      return {
        ...state,
        ratingsLoading: true,
        ratingsError: null,
      };

    case GET_PRODUCT_RATINGS_SUCCESS:
      return {
        ...state,
        ratingsLoading: false,
        ratings: action.payload,
        ratingsError: null,
      };

    case GET_PRODUCT_RATINGS_FAILURE:
      return {
        ...state,
        ratingsLoading: false,
        ratingsError: action.payload,
      };

    case GET_PRODUCT_REVIEWS_REQUEST:
      return {
        ...state,
        reviewsLoading: true,
        reviewsError: null,
      };

    case GET_PRODUCT_REVIEWS_SUCCESS:
      return {
        ...state,
        reviewsLoading: false,
        reviews: action.payload,
        reviewsError: null,
      };

    case GET_PRODUCT_REVIEWS_FAILURE:
      return {
        ...state,
        reviewsLoading: false,
        reviewsError: action.payload,
      };

    default:
      return state;
  }
};
