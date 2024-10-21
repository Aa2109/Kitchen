import React, { useState } from "react";
import OrderTable from "./OrderTable";
import {
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const RestaurantOrders = () => {
  const [filterValue, setFilterValue] = useState();
  const orderStatus = [
    { label: "Pending", value: "PENDING" },
    { label: "complted", value: "COMPLETED" },
    { label: "All", value: "ALL" },
  ];
  const handleFilter = () => {};
  return (
    <div className="px-2">
      <Card className="p-5">
        <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
          Order Status
        </Typography>
        <FormControl>
          <RadioGroup
            onChange={handleFilter}
            row
            name="category"
            value={filterValue || "all"}
          >
            {orderStatus.map((item) => 
              <FormControlLabel
                key={item.label}
                value={item.value}
                control={<Radio />}
                label={item.label}
                sx={{ color: "gray" }}
              />
            )}
          </RadioGroup>
        </FormControl>
      </Card>
      <OrderTable/>
    </div>
  );
};

export default RestaurantOrders;
