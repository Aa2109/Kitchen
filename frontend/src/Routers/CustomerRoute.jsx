import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import RestaurantDetails from '../Restaurant/RestaurantDetails'
import Cart from '../Cart/Cart'
import Profile from '../Profile/Profile'
import Navbar from '../Navbar/Navbar'
import Auth from '../Auth/Auth'
import Paymentsuccess from '../Payment/Paymentsuccess'
import PaymnetFailure from '../Payment/PaymnetFailure'
import Contact from '../Contact/EmailForm'
import SearchComponent from '../Util/SearchComponent'

const CustomerRoute = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/account/:register' element={<Home/>} />
        <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/my-profile/*' element={<Profile/>} />
        <Route path='/search' element={<SearchComponent/>} />
        <Route path='/contact-us/' element={<Contact/>} />
        <Route path='payment/success/:id' element={<Paymentsuccess/>} />
        <Route path='payment/fail/:id' element={<PaymnetFailure/>} />
      </Routes>
      <Auth/>
    </div>
  )
}

export default CustomerRoute