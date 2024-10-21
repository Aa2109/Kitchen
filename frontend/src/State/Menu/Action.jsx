import { API_URL, api } from "../../Config/Api";
import {
  CREATE_MENU_ITEM_FAILURE,
  CREATE_MENU_ITEM_REQUEST,
  CREATE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
  SEARCH_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEM_REQUEST,
  SEARCH_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
  UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
  UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
} from "./ActionTypes";

export const createMenuItem = ({ menu, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.post(`api/admin/food/create`, menu, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Crested menu: ", data);
      dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
    } catch (err) {
      console.log("catch error: ", err);
      dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: err });
    }
  };
};

export const getMenuItemByRestaurantId = (reqData) => {
  console.log("ReqData: ", reqData.restaurantId);

  return async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
      // Build the query string conditionally
      const queryParams = new URLSearchParams();
      if (reqData.vegetarian !== undefined) queryParams.append('vegetarian', reqData.vegetarian);
      if (reqData.seasonal !== undefined) queryParams.append('seasonal', reqData.seasonal);
      if (reqData.nonVeg !== undefined) queryParams.append('nonVeg', reqData.nonVeg);
      if (reqData.foodCategory) queryParams.append('food_category', reqData.foodCategory);

      const { data } = await api.get(
        `api/food/restaurant/${reqData.restaurantId}?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("menu items by restaurant: ", data);
      dispatch({
        type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
        payload: data,
      });
    } catch (err) {
      console.log("catch error: ", err);
      dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: err });
    }
  };
};

export const searchMenuItem = ({ keyword, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.get(`api/food/search?name=${keyword}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("menu items by restaurant search: ", data);
      dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
    } catch (err) {
      console.log("catch error: ", err);
      dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: err });
    }
  };
};

// export const getAllIngredientsOfhMenuItem = (reqData)=>{
//   return async (dispatch)=>{
//     dispatch({type:SEARCH_MENU_ITEM_REQUEST});
//     try{
//       const{data} = await api.get(`api/food/search?name=${keyword}`, {
//         headers:{
//           Authorization:`Bearer ${jwt}`,
//         },
//       });
//       console.log("menu items by restaurant search: ",data);
//       dispatch({type:SEARCH_MENU_ITEM_SUCCESS, payload:data})
//     } catch(err){
//       console.log("catch error: ", err);
//       dispatch({type:SEARCH_MENU_ITEM_FAILURE, payload:err})
//     }
//   };
// };

export const updateMenuItemsAvailability = ({ foodId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
    try {
      const { data } = await api.put(`api/admin/food//isavilable/${foodId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("update menu item availability: ", data);
      dispatch({
        type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
        payload: foodId,
      });
    } catch (err) {
      console.log("catch error: ", err);
      dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload: err });
    }
  };
};

export const deleteFoodAction = ({ foodId, jwt }) => {
  console.log(jwt);
  
  return async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.delete(`api/admin/food/delete/${foodId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("update menu item availability: ", data);
      dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId });
    } catch (err) {
      console.log("catch error: ", err);
      dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: err });
    }
  };
};
