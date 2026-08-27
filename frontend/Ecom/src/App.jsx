import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../src/Components/Header/Navbar'
import Footer from '../src/Components/Footer/Footer'
import Home from '../src/pages/Home'
import About from '../src/pages/About'
import Football from '../src/pages/Products'
import Register from '../src/pages/Register'
import Login from '../src/pages/Login'
import Cart from '../src/pages/Cart'
import Order from '../src/pages/Order'
import MyOrders from '../src/pages/myOrders'
import Profile from '../src/pages/Profile'
import CategoryFootball from '../src/pages/CategoryFootball'

import ProtectedAdminRoute from '../src/Components/adminRoute/Admin'
import Menu from './Admin/Menu'
import MenuForm from '../src/Admin/Menuform'
import WebsiteSettings from '../src/Admin/WebsiteSettings'
import EditWebSettings from '../src/Admin/webSettingsform'
import FooterSettings from '../src/Admin/Footer'
import EditFooter from '../src/Admin/footerForm'
import Products from '../src/Admin/Products'
import ProductDetail from '../src/pages/productDetail'
import EditProduct from '../src/Admin/productsForm'
import AdminLayout from '../src/Admin/AdminLayout'
import Dashboard from '../src/Admin/Dashboard'
import Customer from '../src/Admin/customerOrder'

import PublicLayout from "./PublicLayout";

import './App.css'

function App() {
  

  return (
    <>
    <Routes>
       {/* ================= PUBLIC WEBSITE ================= */}

       <Route element={<PublicLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/about-us"
          element={<About />}
        />

          <Route
          path="/products"
          element={<Football />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />
        <Route
          path="/order"
          element={<Order />}
        />
        <Route
          path="/categories/football"
          element={<CategoryFootball />}
        />

        
        <Route
          path="/my-orders"
          element={<MyOrders />}
        />

        <Route
          path="profile"
          element={
            <Profile />
          }
        
        />

      </Route>

      <Route
           path="/admin"
          element={
          <ProtectedAdminRoute>
             <AdminLayout />
        </ProtectedAdminRoute>}
       >
        <Route      
         index element={<Dashboard />} />
          <Route
          path="products"
          element={<Products />}
        />

        <Route
          path="products/add"
          element={<EditProduct />}
        />

        <Route
          path="products/edit/:id"
          element={<EditProduct />}
        />

        


        {/* ================= MENU ================= */}

        <Route
          path="menu"
          element={<Menu />}
        />

        <Route
          path="menu/add"
          element={<MenuForm />}
        />

        <Route
          path="menu/edit/:id"
          element={<MenuForm />}
        />


        {/* ================= WEB SETTINGS ================= */}

        <Route
          path="settings"
          element={<WebsiteSettings />}
        />

        <Route
          path="settings/edit"
          element={<EditWebSettings />}
        />

        <Route
          path="settings/edit/:id"
          element={<EditWebSettings />}
        />


        {/* ================= FOOTER ================= */}

        <Route
          path="footer"
          element={<FooterSettings />}
        />

        <Route
          path="footer/edit"
          element={<EditFooter />}
        />

        <Route
          path="footer/edit/:id"
          element={<EditFooter />}
        />

        <Route
          path="customer"
          element={<Customer />}      
        />
       </Route>
      

        
         

       
       
    </Routes>
     
    </>
  );
}

export default App
