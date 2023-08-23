import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { List } from "phosphor-react";
import "./Home.css";
import { MyContext } from "../context/context";

function Home() {
  const { loggedIn,setLoggedIn,userDetails,setUserDetails } = useContext(MyContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsOpen(false);
  }, []);
  const logout=async()=>{
    try{
    const res=await axios.put('http://localhost:3001/logout',{userDetails});
    if(res.status===200){
      alert(res.data.message);
      setUserDetails('');
    }
    }
    catch(e){
      if(e.response){
        if(e.response.status===500){
          alert(e.response.data.message);
         }
      }
    }
    
    setLoggedIn(false);

  }
  return (
    <div>
      <nav>
        <h1>CRUD app</h1>

        <div className={`menu-icon`} onClick={toggleMenu}>
          <List size={32} color="aliceblue" />
        </div>
        {loggedIn ? (
          <ul className={`nav-links ${isOpen ? "open" : ""} logout`}>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        ) : (
          <ul className={`nav-links ${isOpen ? "open" : ""}`}>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}
export default Home;
