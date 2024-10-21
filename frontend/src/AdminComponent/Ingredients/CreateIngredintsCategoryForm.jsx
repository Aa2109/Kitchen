import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientCategory } from "../../State/Ingredients/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CreateIngredientsFoodCategoryForm = ({onClose}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const orders = [1, 1, 1, 1, 1, 1, 1, 1];
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store);

  const [formData, setFormData] = useState({
    name: "",
    // restaurantId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      restaurantId: restaurant.userRestaurants[0]?.id,
    };
    dispatch(createIngredientCategory({ data, jwt }))
    .then(() => {
      onClose(); // Close the modal after creation
    });
    console.log(formData);
  };

 

  return (
    <div className="">
      <div className="">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Ingrdient Category
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Ingredient Category"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
          />
          <Button variant="contained" type="submit">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};
