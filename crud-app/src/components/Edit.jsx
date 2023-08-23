import React, { useState } from "react";
import './Edit.css';
import axios from 'axios';

export const Edit = (props) => {
  const user = props.user;

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
    isActive: user.isActive,
  });

  const handleChange=(e)=>{
    const { name, value, type, checked } = e.target;
    setUserData(prev=>({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
    })
    )
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res=await axios.put('http://localhost:3001/update',{userData:userData,userId:user._id});
      if(res.status===200){
        alert(res.data.message);
      }
    }
    catch(e){
      alert(e.response.data.message);
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit user</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="password">password:</label>
          <input
            type="text"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>isActive:</label>
          <label>
            Active:
            <input
              type="checkbox"
              name="isActive"
              checked={userData.isActive}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, isActive: !prev.isActive }))}
            />
          </label>
          <label>
            Inactive:
            <input
              type="checkbox"
              name="isActive"
              checked={!userData.isActive}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
            />
          </label>
        </div>
        <button type="submit">Save Changes</button>
        <button type='button'onClick={props.closeEdit} className="close">Close Edit</button>
      </form>
    </div>
  );
};
