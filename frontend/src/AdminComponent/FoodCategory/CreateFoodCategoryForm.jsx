import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryaction } from "../../State/Restaurant/Action";

const CreateFoodCategoryForm = ({ onClose }) => {
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    restaurantId: "",
    description:"",
  });

  const handleInputChange = (e) => {
    const { name, value , description} = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [description]: description
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      restaurantId: restaurant.userRestaurants[0]?.id,
      description:formData.description,
    };
    console.log("Name: ",data.name, " id: ", data.restaurantId," description: ", data.description);
    dispatch(createCategoryaction({ reqData: data, jwt: localStorage.getItem("jwt") }))
    .then(() => {
      onClose(); // Close the modal after creation
    });
};

  return (
    <div className="">
      <div className="">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Craete Category
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Category Name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Food Description"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.description}
          />
          <Button variant="contained" type="submit">
            Create Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateFoodCategoryForm;
