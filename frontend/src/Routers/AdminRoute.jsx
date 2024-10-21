import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateRestaurantForm from "../AdminComponent/CreateRestaurantForm/CreateRestaurantForm";
import Admin from "../AdminComponent/Admin/Admin";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { restaurant } = useSelector((store) => store);

  // console.log("restaurant.userRestaurants : ", restaurant.userRestaurants[0]);
  // console.log("restaurant : ", restaurant);

  // console.log("AdminRest: ",!restaurant?.userRestaurants[0]);
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            (!restaurant?.userRestaurants[0]) ? (
              <CreateRestaurantForm />
            ) : (
              <Admin />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default AdminRoute;
