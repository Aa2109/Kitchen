import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  IconButton,
  Modal,
} from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateIcon from "@mui/icons-material/Create";
import { Delete } from "@mui/icons-material";
import { CreateIngredientsForm } from "./CreateIngredientsForm";
import {
  getIngredientsOfRestaurant,
  updateStockOfIngredient,
} from "../../State/Ingredients/Action";
import { useDispatch, useSelector } from "react-redux";

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

export const IngredientsTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const { restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const orders = [1, 1, 1, 1, 1, 1, 1, 1];

  useEffect(() => {
    dispatch(
      getIngredientsOfRestaurant({ id: restaurant.userRestaurants[0]?.id, jwt })
    );
  }, []);

  const handleUpdateStockIngredient = (id) => {
    dispatch(updateStockOfIngredient({ id, jwt }));
  };
  return (
    <div>
      <Box>
        <Card className="mt-1">
          <CardHeader
            action={
              <IconButton onClick={handleOpen} aria-label="settings">
                <CreateIcon />
              </IconButton>
            }
            title={"Ingredients"}
            sx={{ pt: 2, alignItems: "center" }}
          />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>id</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>name</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Category</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Availabilty</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredients.ingredients.map((item) => (
                  <TableRow
                    key={item.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.category.name}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => handleUpdateStockIngredient(item.id)}
                      >
                        {item.inStoke ? "In Stock" : "Out Of Stock"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CreateIngredientsForm onClose={handleClose} />
          </Box>
        </Modal>
      </Box>
    </div>
  );
};
