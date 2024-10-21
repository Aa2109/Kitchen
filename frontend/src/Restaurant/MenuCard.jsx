import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { categorisedIngredients } from "../Util/CategorisedIngredients";
import { useDispatch } from "react-redux";
import { addItemsTocart } from "../State/Cart/Action";

// const demo = [
//   {
//     category: "Nuts & seeds",
//     ingredients: ["Cashewa"],
//   },
//   {
//     category: "Protein",
//     ingredients: ["Ground beef", "Bacon strips"],
//   },
// ];

const MenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();

  // const handleCheckBoxChange = (itemName) => {
  //   if (selectedIngredients.includes(itemName)) {
  //     setSelectedIngredients(
  //       setSelectedIngredients.filter((item) => item !== itemName)
  //     );
  //   } else {
  //     setSelectedIngredients([...selectedIngredients, itemName]);
  //   }

  // };

  const handleCheckBoxChange = (itemName) => {
    setSelectedIngredients((prevSelectedIngredients) => {
      if (prevSelectedIngredients.includes(itemName)) {
        // Remove item from array
        return prevSelectedIngredients.filter(
          (ingredient) => ingredient !== itemName
        );
      } else {
        // Add item to array
        return [...prevSelectedIngredients, itemName];
      }
    });
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();

    const reqData = {
      token: localStorage.getItem("jwt"),

      cartItem: {
        foodId: item.id,
        quantity: 1,
        // totalPrice:item.price,
        ingredients: selectedIngredients,
      },
    };

    dispatch(addItemsTocart(reqData));
    console.log("item details menucard: ", item);
    console.log("req_Data: ", reqData);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src={item.images[0]}
              alt=""
            />
            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">{item.name}</p>
              <p>{item.price}</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className="flex gap-5 flex-wrap">
            {Object.keys(categorisedIngredients(item.ingredients)).map(
              (category) => (
                <div>
                  <p>{category}</p>
                  <FormGroup>
                    {categorisedIngredients(item.ingredients)[category].map(
                      (item) => (
                        <FormControlLabel
                          key={item.id}
                          control={
                            <Checkbox
                              onChange={() => handleCheckBoxChange(item.name)}
                            />
                          }
                          label={item.name}
                        />
                      )
                    )}
                  </FormGroup>
                </div>
              )
            )}
          </div>
          <div className="pt-5">
            <Button variant="contained" disabled={false} type="submit">
              {true ? "Add to Cart" : "Out of stock"}
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;
