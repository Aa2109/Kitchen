import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient } from "../../State/Ingredients/Action";

export const CreateIngredientsForm = ({ onClose = () => {} }) => {

  const{restaurant,ingredients} = useSelector((store)=>store);
  const dispatch = useDispatch();
  const jwt=localStorage.getItem("jwt")

  const [formData, setFormData] = useState({

    name: "",
    categoryId: "",
    restaurantId:"",
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log("name ",name);
    // console.log("value ",value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      restaurantId: restaurant.userRestaurants[0]?.id,
    };
    console.log(data);
    dispatch(createIngredient({ data, jwt }))
    .then(() => {
      onClose(); // Close the modal after creation
    });
    
  };

  return (
    <div className="">
      <div className="">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Ingredient
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Ingredint Name"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.name}
              />

          <FormControl fullWidth>
            <InputLabel id="categoryId-label">Ingredient</InputLabel>
            <Select
              labelId="categoryId-label"
              id="categoryId"
              value={formData.categoryId}
              label="categoryId"
              onChange={handleInputChange}
              name="categoryId"
            >
{ingredients.category.map((item)=><MenuItem value={item.id}>{item.name}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">
            Create Ingredient
          </Button>
        </form>
      </div>
    </div>
  );
};
