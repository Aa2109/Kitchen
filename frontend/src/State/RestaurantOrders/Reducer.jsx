import { GET_RESTAURANTS_ORDER_FAILURE, GET_RESTAURANTS_ORDER_REQUEST, GET_RESTAURANTS_ORDER_SUCCESS, UPADTE_ORDER_STATUS_FAILURE, UPADTE_ORDER_STATUS_REQUEST, UPADTE_ORDER_STATUS_SUCCESS } from "./ActionTypes";

const initialState = {
  loading:false,
  error:null,
  orders:[],
};

export const restaurantsOrderReducer = (state = initialState, action) => {
  
  switch(action.type){
    case GET_RESTAURANTS_ORDER_REQUEST:
    case UPADTE_ORDER_STATUS_REQUEST:
      return {...state, loading:true, error:null};
      
    case GET_RESTAURANTS_ORDER_SUCCESS:
      return {...state, loading:false, orders:action.payload};

    case UPADTE_ORDER_STATUS_SUCCESS:
      const upadatedOrders = state.orders.map((item)=> item.id === action.payload.id?action.payload:item);
      return {...state, loading:false, orders:upadatedOrders};

      case GET_RESTAURANTS_ORDER_FAILURE:
      case UPADTE_ORDER_STATUS_FAILURE:
        return {...state, loading:false, error:action.error};

      default:
        return state;
  }

}