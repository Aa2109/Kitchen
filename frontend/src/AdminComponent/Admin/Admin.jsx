import React, { useEffect } from 'react'
import AdminSideBar from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import RestaurantDashboard from '../Dashboard/RestaurantDashboard'
import RestaurantOrders from '../Orders/RestaurantOrders'
import Menu from '../Menu/Menu'
import FoodCategory from '../FoodCategory/FoodCategory'
import Ingredients from '../Ingredients/Ingredients'
import Events from '../Events/Events'
import Details from './Details'
import CreateMenuForm from '../Menu/CreateMenuForm'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantsCategory } from '../../State/Restaurant/Action'
import { fetchRestaurantsOrder } from '../../State/RestaurantOrders/Action'


const Admin = () => {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant} = useSelector((store)=>store);

  const handleClose = ()=>{

  }
 


  return (
    <div>
      <div className='lg: flex justify-between'>
        <div className=''>
            <AdminSideBar handleClose={handleClose}/>
        </div>
        <div className='lg:w-[80%]'>
            <Routes>
              <Route path='/' element={<RestaurantDashboard/>}/>
              <Route path='/orders' element={<RestaurantOrders/>}/>
              <Route path='/menu' element={<Menu/>}/>
              <Route path='/category' element={<FoodCategory/>}/>
              <Route path='/ingredients' element={<Ingredients/>}/>
              <Route path='/event' element={<Events/>}/>
              <Route path='/details' element={<Details/>}/>
              <Route path='/add-menu' element={<CreateMenuForm/>}/>
            </Routes>
        </div>
      </div>
    </div>
  )
}

export default Admin