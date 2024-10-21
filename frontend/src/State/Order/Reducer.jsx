
import { GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS,
UPDATE_CART_ITEM_QUANTITY_REQUEST,
UPDATE_CART_ITEM_QUANTITY_SUCCESS,
UPDATE_CART_ITEM_QUANTITY_FAILURE,
} from "./ActionTypes";

const initialState = {
  loading:false,
  orders:[],
  error:null,
};

export const orderReducer = (state = initialState, {type, payload})=>{
  switch(type) {
    case GET_USERS_ORDERS_REQUEST:
      return {...state, loading:true, error:null};

    case GET_USERS_ORDERS_SUCCESS:
      return {...state, error:null, loading:false, orders:payload};

    case GET_USERS_ORDERS_FAILURE:
      return {...state, error:payload, loading:false};

    default:
      return state;
  }
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_CART_ITEM_QUANTITY_REQUEST:
      return { ...state, loading: true, error: null };

    case UPDATE_CART_ITEM_QUANTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.map(item =>
          item.id === payload.id ? { ...item, quantity: payload.quantity } : item
        ),
      };

    case UPDATE_CART_ITEM_QUANTITY_FAILURE:
      return { ...state, error: payload, loading: false };

    // Handle other action types
    default:
      return state;
  }
};