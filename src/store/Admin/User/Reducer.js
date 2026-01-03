//@ts-nocheck
const {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAILURE,
} = require("./ActionType");

const initialState = {
  loading: false,
  users: [],
  error: "",
};

export const adminUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };

    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };

    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== action.payload),
        deletedUser: action.payload,
      };

    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_USER_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_USER_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        updatedUser: action.payload,
      };

    case UPDATE_USER_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
