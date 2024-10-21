import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurantsOrder,
  updateOrderStatus,
} from "../../State/RestaurantOrders/Action";

const OrderTable = () => {
  const { restaurant, restaurantOrder } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  useEffect(() => {
    dispatch(
      fetchRestaurantsOrder({
        jwt,
        restaurantId: restaurant.userRestaurants[0]?.id,jwt,
      })
    );
  }, [dispatch, jwt, restaurant.userRestaurants]);

  const handleUpdateOrderStatus = (orderStatus) => {
    if (selectedOrderId) {
      dispatch(
        updateOrderStatus({
          orderId: selectedOrderId,
          orderStatus,
          jwt,
        })
      ).then(() => {
        handleClose();
      });
    }
  };

  const orderStatus = [
    { label: "Pending", value: "PENDING" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Out For Delivered", value: "OUT_FOR_DELIVERY" },
    { label: "Delivered", value: "DELIVERED" },
  ];

  return (
    <div>
      <Box>
        <Card className="mt-1">
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <CreateIcon />
              </IconButton>
            }
            title={"All Orders"}
            sx={{ pt: 2, alignItems: "center" }}
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell align="right">image</TableCell>
                  <TableCell align="right">Customer</TableCell>
                  <TableCell align="right">price</TableCell>
                  <TableCell align="right">name</TableCell>
                  <TableCell align="right">ingredients</TableCell>
                  <TableCell align="right">status</TableCell>
                  <TableCell align="right">update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {restaurantOrder.orders.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="right">
                      <AvatarGroup>
                        {item.items.map((orderItem) => (
                          <Avatar key={orderItem.food.id} src={orderItem.food?.images[0]} />
                        ))}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell align="right">
                      {item.customer.fullName}
                    </TableCell>
                    <TableCell align="right">{item.totalAmount}</TableCell>
                    <TableCell align="right">
                      {item.items.map((name) => (
                        <p key={name.food.id}>{name.food.name}</p>
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      {item.items.map((orderItem) => (
                        <div key={orderItem.food.id}>
                          {orderItem.ingredients.map((ing, index) => (
                            <Chip key={index} label={ing} />
                          ))}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell align="right">{item.orderStatus}</TableCell>
                    <TableCell align="right">
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(event) => handleClick(event, item.id)}
                      >
                        Update
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        {orderStatus.map((status) => (
                          <MenuItem
                            key={status.value}
                            onClick={() => handleUpdateOrderStatus(status.value)}
                          >
                            {status.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </div>
  );
};

export default OrderTable;
