import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, Outlet } from "react-router-dom";
import Layout from "../layout/layout";
import Home from "pages/Home/Home";
import Post from "pages/Post/PostDetail";
import Advertising from "pages/Advertising/Advertising";
import Login from "pages/Login/Login";
import Signup from "pages/Sinup/Sinup";
import PrivateRoute from "./PrivateRoute";



const AppRoute = () => {
  

  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Layout />}>
          <Route path="/Login" element={<Login />} />
          <Route path="/Sinup" element={<Signup />} />
          <Route path='/:id' element={<PrivateRoute />}>
            <Route path="/:id" element={<Post />}  />
          </Route>
          <Route path='/Advertising' element={<PrivateRoute/>}>
           <Route path="/Advertising" element={<Advertising />}  />
          </Route>
          <Route  path='/' element={<PrivateRoute />}>
             <Route index element={<Home />}  />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoute;
