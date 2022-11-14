import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import DashBoard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import './App.css';

function App() {
  useEffect(()=>{
    console.log("get fetch")
    fetch("/users")
    .then((response) => response.json())
    .then((data) => {
      if(data){
        console.log(data)
      } else{
        console.log("No Data Yet")
      }
    })
    .catch(error => console.log(error))
  },[])
 
  
  return (
    <Router>
      {/* Context provider surrounds all pages because it is used in the navbar (displayed on all pages) */}
        {/* <AuthContext.Provider value={{login, businessName, loginFunction, nameFunction}}> */}
          <Routes>
            <Route path="/dashboard/:username" element={<DashBoard/>} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/sign-up" element={<SignUpPage/>}/>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<NotFound/>}/>  
          </Routes>
        {/* </AuthContext.Provider> */}
    </Router> 
  );
}

export default App;
