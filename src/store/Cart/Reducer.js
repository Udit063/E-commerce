const cartInitialState = {
  cart: null,
  loading: false,
  error: null,
  cartItems: [],
};

export const cartReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART_REQUEST":
      return { ...state, loading: true, error: null };
      
    case "ADD_ITEM_TO_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        cartItems: [...state.cartItems, action.payload.cartItems],
      };

    case "ADD_ITEM_TO_CART_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "GET_CART_REQUEST":
      return { ...state, loading: true };

    case "GET_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        cartItems: action.payload.cartItems,
        cart: action.payload,
      };

    case "GET_CART_FAILURE":
      return { ...state, loading: false, error: action.payload };
    
    case "REMOVE_CART_ITEM_REQUEST":
    case "UPDATE_CART_ITEM_REQUEST":
        return { ...state, loading: true, error: null };

    case "REMOVE_CART_ITEM_SUCCESS":
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.cartItemId
        ),
      };
    
    case "UPDATE_CART_ITEM_SUCCESS":
        return {
            ...state,
            loading: false,
            cartItems: state.cartItems.map(item => 
                item.id === action.payload.id ? action.payload : item
            ),
        };  
    
    case "ReMOVE_CART_ITEM_FAILURE":
    case "UPDATE_CART_ITEM_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
        return state;
  }
};
