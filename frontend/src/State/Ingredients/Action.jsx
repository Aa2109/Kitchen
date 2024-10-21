
import { api } from "../../Config/Api";
import {
  CREATE_INGREDIENT_CATEGORY_FAILURE,
  CREATE_INGREDIENT_CATEGORY_REQUEST,
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  CREATE_INGREDIENT_REQUEST,
  CREATE_INGREDIENT_SUCCESS,
  GET_INGREDIENTS,
  GET_INGREDIENT_CATEGORY_FAILURE,
  GET_INGREDIENT_CATEGORY_REQUEST,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  UPDATE_STOCK,
} from "./ActionTypes";

export const getIngredientsOfRestaurant = ({ id, jwt }) => {
  return async (dispatch) => {
    // dispatch({type:GET_IN});
    try {
      const response = await api.get(`api/admin/ingredient/restaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Ingredites restaurant: ", response.data);
      dispatch({ type: GET_INGREDIENTS, payload: response.data });
    } catch (err) {
      console.log("catch errorr: ", err);
      // dispatch({type:, payload:err});
    }
  };
};

export const createIngredient = ({ data, jwt }) => {
  // console.log("data: ",data," \n jwt: ",jwt);

  return async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_REQUEST });
    try {
      const response = await api.post(
        `api/admin/ingredient/create/item`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Creted ingredients: ", response.data);
      dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
    } catch (err) {
      console.log("catch errorr: ", err);
      dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: err });
    }
  };
};

export const createIngredientCategory = ({ data, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
    try {
      const response = await api.post(
        `api/admin/ingredient/create/category`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Creted category ingredients: ", response.data);
      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      console.log("catch errorr: ", err);
      dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: err });
    }
  };
};

export const getIngredientCategory = ({ id, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST });
    try {
      const response = await api.get(
        `api/admin/ingredient/restaurant/${id}/category`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Category ingredients: ", response.data);
      dispatch({
        type: GET_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      console.log("catch errorr: ", err);
      dispatch({ type: GET_INGREDIENT_CATEGORY_FAILURE, payload: err });
    }
  };
};

export const updateStockOfIngredient = ({ id, jwt }) => {
   console.log("id: ",id," \n jwt: ",jwt);
  return async (dispatch) => {
    // dispatch({type:GET_INGREDIENT_CATEGORY_REQUEST});
    try {
      const { data } = await api.put(
        `api/admin/ingredient/update/stock/${id}`,{},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("updated Category ingredients: ", data);
      dispatch({ type: UPDATE_STOCK, payload: data });
    } catch (err) {
      console.log("catch errorr: ", err);
      // dispatch({type:GET_INGREDIENT_CATEGORY_FAILURE, payload:err});
    }
  };
};
