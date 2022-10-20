import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Home from "./pages/Home";
import Product from './pages/Product';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import './App.css';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="product" element={<Product />} />
    <Route path="categories" element={<Categories />} />
    <Route path="cart" element={<Cart />} />
  </Routes>
);

export default App;
