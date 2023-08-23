import React, { useState } from 'react';
import { useNavigate} from "react-router-dom";
import './Signup.css'; 
import 'axios';
import axios from 'axios';

function Signup() {

  const navigate = useNavigate();

  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
       const res=await axios.post('http://localhost:3001/signup',{
        name,email,password
       })
       if(res.status===200){
        alert(res.data.message);
        navigate("/");
       }
    }
    catch(e){
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
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput">Name:</label>
          <input type="text" id="nameInput" name='name' value={name} onChange={(e)=>setName(e.target.value)}required/>
        </div>
        <div className="form-group">
          <label htmlFor="emailInput">Email:</label>
          <input type="text" id='emailInput' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="passInput">Password:</label>
          <input type='password' id='passInput' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
        <div className="form-group">
          <button type='submit'>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
