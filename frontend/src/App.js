
import './App.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './State/Authentication/Action';
import { findCart } from './State/Cart/Action';
import { Toaster } from 'react-hot-toast';
import Routers from './Routers/Routers';
import { getRestaurantByUser } from './State/Restaurant/Action';

function App() {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth}= useSelector(store=>store)

  useEffect(()=>{
    dispatch(getUser(auth.jwt || jwt))
    dispatch(findCart(jwt))
  },[auth.jwt])

  useEffect(()=>{
    dispatch(getRestaurantByUser(auth.jwt || jwt));
  },[auth.user,jwt])

  return (
    <ThemeProvider theme={darkTheme}>
      <Toaster/>
      <CssBaseline />
    <Routers />
    </ThemeProvider>

   
  );
}

export default App;
