import React,{useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {MyContext} from './context/context';
import Admin from "./components/Admin";

function App() {

  const [loggedIn,setLoggedIn]=useState(false);
  const [userDetails,setUserDetails]=useState('')

  return (
    <MyContext.Provider value={{loggedIn,setLoggedIn,userDetails,setUserDetails}}>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </Router>
    </MyContext.Provider>
  );
}

export default App;
