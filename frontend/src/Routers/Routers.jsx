import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CustomerRoute from "./CustomerRoute";
import AdminRoute from "./AdminRoute";
import { useSelector } from "react-redux";

const Routers = () => {

  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
//   const role = auth?.user?.role;
// console.log("Role: ",role);

  // useEffect(() => {
  //   if (auth.user) {
  //     if (auth.user.role === 'RESTAURANT_OWNER') {
  //       navigate('/admin/restaurant');
  //     } else if (auth.user.role === 'CUSTOMER') {
  //       navigate('/');
  //     }
  //   }
  // }, [auth.user, navigate]);

  return (
    <div>
      <Routes>
        <Route path="/admin/restaurant/*" element={<AdminRoute />} />
        <Route path="/*" element={<CustomerRoute />} />
      </Routes>
    </div>
  );
};

export default Routers;
