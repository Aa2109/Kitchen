import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import { React, useState } from "react";
import CartItem from "./CartItem";
import AddressCart from "./AddressCart";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, updateCartItemQuantity } from "../State/Order/Action";
// import * as Yup from 'yup'

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

// const items = [1, 1];

const initialValues = {
  streetAddress: "",
  state: "",
  pinCode: "",
  city: "",
};
// const validationSchema = Yup.object.shape({
//       streetAddress:Yup.string().required("Street Address is required"),
//       state:Yup.string().required("State is required"),
//       pinCode:Yup.required("PinCode is required"),
//       city:Yup.string().required("City is required"),
// })

const Cart = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const createOrderUsingSelectedAddress = () => {};
  const handleOpenAddress = () => setOpen(true);

  const { cart, auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          stateProvince: values.state,
          postalCode: values.pinCode,
          country: "India",
        },
      },
    };
    dispatch(createOrder(data));
    console.log("value: ", values);
  };

  // console.log("cart.cart?.total: ",cart.cart?.total);

  const handleQuantityChange = (itemId, newQuantity) => {
    dispatch(updateCartItemQuantity({ itemId, quantity: newQuantity }));
  };

  // Calculate the total price including delivery fee and taxes
  const total = cart.cartItems.reduce((acc, item) => {
    // Ensure item.totalPrice is a number
    const itemTotalPrice = Number(item.totalPrice) || 0;

    // console.log(`Item Total Price: ${itemTotalPrice}`); // Debugging log

    return acc + itemTotalPrice;
  }, 0);

  const deliveryFee = 20;
  const taxes = 13;
  const grandTotal = total + deliveryFee + taxes;


  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems.map((item) => (
            // <CartItem item ={item} />
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={(newQuantity) =>
                handleQuantityChange(item.id, newQuantity)
              }
            />
          ))}

          <Divider />
          <div className="billDatails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between to-gray-400">
                <p>Item Total</p>
                {/* <p>₹{cart.cart?.total}</p> */}
                <p>{total}</p>
              </div>
              <div className="flex justify-between to-gray-400">
                <p>Deliver Fee</p>
                {/* <p>₹20</p> */}
                <p>₹{deliveryFee}</p>
              </div>
              <div className="flex justify-between to-gray-400">
                <p>GST and Restaurant Charges</p>
                {/* <p>₹13</p> */}
                <p>₹{taxes}</p>
              </div>
              <Divider />
            </div>

            <div className="flex justify-between to-gray-400">
              <p>Total pay</p>
              {/* <p>₹{cart.cart?.total +20+13}</p> */}
              <p>₹{grandTotal}</p>
            </div>
          </div>
        </section>

        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg: pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delvery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {[1, 1, 1, 1, 1].map((item) => (
                <AddressCart
                  handleSelectAddress={createOrderUsingSelectedAddress}
                  item={item}
                  showButton={true}
                />
              ))}
              {/* For add new address */}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocationAltIcon />
                <div className="space-y-3 to-gray-500">
                  <h1 className="font-semibold text-lg text-white">
                    Add new Address
                  </h1>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleOpenAddress}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    //   error={!ErrorMessage("streetAddress")}
                    //   helperText={
                    //     <ErrorMessage>
                    //       {(msg)=><span className='text-red-600'>{msg}</span>}
                    //     </ErrorMessage>
                    //   }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="state"
                    fullWidth
                    variant="outlined"
                    //   error={!ErrorMessage("streetAddress")}
                    //   helperText={
                    //     <ErrorMessage>
                    //       {(msg)=><span className='text-red-600'>{msg}</span>}
                    //     </ErrorMessage>
                    //   }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="city"
                    fullWidth
                    variant="outlined"
                    //   error={!ErrorMessage("streetAddress")}
                    //   helperText={
                    //     <ErrorMessage>
                    //       {(msg)=><span className='text-red-600'>{msg}</span>}
                    //     </ErrorMessage>
                    //   }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="pinCode"
                    label="pinCode"
                    fullWidth
                    variant="outlined"
                    //   error={!ErrorMessage("streetAddress")}
                    //   helperText={
                    //     <ErrorMessage>
                    //       {(msg)=><span className='text-red-600'>{msg}</span>}
                    //     </ErrorMessage>
                    //   }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
