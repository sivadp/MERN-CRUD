// Login.js
import React, { useState,useContext } from 'react';
import { useNavigate} from "react-router-dom";
import './Login.css';
import axios from 'axios';
import {MyContext} from'../context/context';

function Login() {

  const navigate = useNavigate();

  const {setLoggedIn,setUserDetails}=useContext(MyContext);

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post('http://localhost:3001/login',{email,password});
      if(res.status===200){
        setLoggedIn(true);
        setUserDetails(res.data.userDetails);
        alert(res.data.message);
        navigate("/");
      }
    }catch(e){
      if(e.response){
        if(e.response.status===400){
          alert(e.response.data.message);
         }
         else if(e.response.status===500){
          alert(e.response.data.message);
         }
      }
    }
  }

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailInput">Email:</label>
          <input type="text" id='emailInput' name='email' onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="passInput">Password:</label>
          <input type='password' id='passInput' name='password' onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
        <div className="form-group">
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
