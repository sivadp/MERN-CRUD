import React, { useEffect, useState } from "react";
import "./Admin.css";
import { PencilSimple, Trash } from "phosphor-react";
import axios from "axios";
import { Edit } from "./Edit";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(false);
  const [editUserDetails, setEditUserDetails] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/admin");
        setUsers(response.data.usersList);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditUser(true);
    setEditUserDetails(user);
  };

  const handleDelete = async (id) => {
    if(window.confirm(`Are you sure want to delte user with id ${id}`)){
    try {
      await axios.delete(`http://localhost:3001/delete?id=${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (e) {
      console.log(e);
    }
  }
  };

  return (
    <div>
      {editUser ? null : (
        <div>
          <h2>users list</h2>
          <div className="usersLog">
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>isActive</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.isActive ? "Active now" : "not Active"}</td>
                    <td>
                      <button onClick={() => handleEdit(user)}>
                        <PencilSimple size={16} />
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(user._id)}>
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {editUser && (
        <Edit user={editUserDetails} closeEdit={() => setEditUser(false)} />
      )}
    </div>
  );
};

export default Admin;
