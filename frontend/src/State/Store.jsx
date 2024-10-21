import { thunk } from "redux-thunk";
import { authReducer } from "./Authentication/Reducer";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import restaurantReducer from "./Restaurant/Reducer";
import { menuItemReducer } from "./Menu/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import { ingredientReducer } from "./Ingredients/Reducer";
import { restaurantsOrderReducer } from "./RestaurantOrders/Reducer";
import searchReducer from "./Search/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  menu:menuItemReducer,
  cart:cartReducer,
  order: orderReducer,
  restaurantOrder:restaurantsOrderReducer,
  ingredients:ingredientReducer,
  search: searchReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
