import React from 'react'
import {Route, Routes} from "react-router-dom";
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Dashboard from './Pages/Dashboard';
import axios from "axios";
import UserContextProvider from './UserContext';
import HomePage from './Pages/HomePage';
import ProductsPage from './Pages/ProductsPage';
import ProfilePage from './Pages/ProfilePage';
import Layout from './Components/Layout';
import AddProductsPage from './Pages/AddProductsPage';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


axios.defaults.baseURL = 'https://inventory-management-application-api.onrender.com'
axios.defaults.withCredentials = true
const token = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

const App = () => {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route  path='/' element={<LandingPage/>} />
          <Route path='/login' element={<LoginPage/>}  />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/dashboard' element={<Layout/>} >
              <Route index element={<HomePage/>} />
              <Route path='/dashboard/products' element={<ProductsPage/>} />
              <Route path='/dashboard/addproducts' element={<AddProductsPage/>} />
              <Route path='/dashboard/profile' element={<ProfilePage/>} />
          </Route>
        </Routes>
      </UserContextProvider>
      <ToastContainer/>
    </>
    
    
  )
} 

export default App