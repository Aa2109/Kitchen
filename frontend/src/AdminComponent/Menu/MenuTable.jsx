import { Avatar, Box, Card, CardActions, CardHeader, Chip, IconButton } from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFoodAction, getMenuItemByRestaurantId } from "../../State/Menu/Action";

const MenuTable = () => {
  const{restaurant,ingredients, menu} = useSelector((store)=>store);
  const dispatch = useDispatch();
  const jwt=localStorage.getItem("jwt")
  const navigate = useNavigate();

  // const orders = [1, 1, 1, 1, 1, 1, 1, 1];
  

  useEffect(()=>{
    dispatch(getMenuItemByRestaurantId({
      restaurantId:restaurant.userRestaurants[0].id,
      jwt:jwt,
    }))
  },[]);

  const handleDeleteFood=(foodId)=>{
    dispatch(deleteFoodAction({foodId,jwt}));
  }
  return (
    <div>
      <Box>
        <Card className="mt-1">
          <CardHeader
            action={
              <IconButton onClick={()=>navigate('/admin/restaurant/add-menu')} aria-label="settings">
                <CreateIcon />
              </IconButton>
            }
            title={"Menu"}
            sx={{ pt: 2, alignItems: "center" }}
          />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>image</TableCell>
                  <TableCell align="right">title</TableCell>
                  <TableCell align="right">ingredients</TableCell>
                  <TableCell align="right">price</TableCell>
                  <TableCell align="right">Availability</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menu.menuItems.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell><Avatar src={item.images[0]}></Avatar></TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{
                      item.ingredients.map((ingredient)=><Chip label={ingredient.name}/>)
                      }</TableCell>
                    <TableCell align="right">₹{item.price}</TableCell>
                    <TableCell align="right">{item.available?"in+stock":"out_of_stock"}</TableCell>
                    <TableCell align="right">
                      {
                        <IconButton color="primary" onClick={()=>handleDeleteFood(item.id)}>
                          <Delete />
                        </IconButton>
                      }
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

export default MenuTable;
