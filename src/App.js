import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import DashBoard from "./pages/Dashboard";
import Family from "./pages/Family";

import NotFound from "./pages/NotFound";
import './App.css';
export const AuthContext = createContext();


function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [familyID, setFamilyID] = useState("");
  const [infoId, setInfoId] = useState("");
  const [_permission, setPermission] = useState("")
  //don't use points ?
  const [points, setPoints] = useState(0);
  const loginFunction = ()=> setLogin(!login);
  useEffect(()=>{},[])

  const setContext = (accessId, familyId, userName, pts, permission)=>{
    console.log(accessId, familyId, userName)
    setInfoId(accessId)
    setFamilyID(familyId)
    setUserName(userName)
    setPoints(pts)
    setPermission(permission);
  }
  const updatePoints = (total, memberName)=>{
    fetch("/users", {
        method: "put",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: memberName,
            ppts: total
        })
    }) 
    .then(response => response.json())
    .then((data)=> {
        console.log(data)
        setPoints(total);
    })
    .catch((err)=>{
        console.log(err)
    }) 
}


 console.log(familyID)
  
  return (
    <Router>
      {/* Context provider surrounds all pages because it is used in the navbar (displayed on all pages) */}
        <AuthContext.Provider value={{login, loginFunction, userName, familyID, infoId, updatePoints, _permission}}>
          <Routes>
            <Route path="/family" element={<Family/>}/>
            <Route path="/dashboard/*" element={<DashBoard setContext={setContext}/>} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/sign-up" element={<SignUpPage/>}/>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<NotFound/>}/>  
          </Routes>
        </AuthContext.Provider>
    </Router> 
  );
}

export default App;
