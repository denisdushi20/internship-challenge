import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddUserForm from "../UserInterface/AddUserForm";
import "./Home.css";

export default function Home() {
  const [users, setUsers] = useState([]); 
  const [localUsers, setLocalUsers] = useState([]); 
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);


  useEffect(() => {
    const stored = localStorage.getItem("localUsers");
    if (stored) setLocalUsers(JSON.parse(stored));
  }, []);

  const handleAddOrUpdateUser = (user) => {
    let updatedLocal;
    if (editingUser) {
 
      updatedLocal = localUsers.map((u) => (u.id === user.id ? user : u));
      setEditingUser(null);
    } else {
      updatedLocal = [user, ...localUsers];
    }
    setLocalUsers(updatedLocal);
    localStorage.setItem("localUsers", JSON.stringify(updatedLocal));
  };

  const handleDeleteUser = (id) => {
 
    const updatedLocal = localUsers.filter((u) => u.id !== id);
    setLocalUsers(updatedLocal);
    localStorage.setItem("localUsers", JSON.stringify(updatedLocal));

    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const allUsers = [...localUsers, ...users];

  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <main className="main-content">
        <AddUserForm addUser={handleAddOrUpdateUser} editingUser={editingUser} />

        <input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`} className="link">{user.name}</Link>
                </td>
                <td>{user.email}</td>
                <td>{user.company?.name ?? "N/A"}</td>
                <td>
                  <button className="button" onClick={() => setEditingUser(user)}>Edit</button>
                  <button className="button button-delete" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer className="footer">
        &copy; {new Date().getFullYear()} User Management App
      </footer>
    </div>
  );
}
