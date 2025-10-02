import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddUserForm from "../UserInterface/AddUserForm";

export default function Home() {
  const [users, setUsers] = useState([]); 
  const [localUsers, setLocalUsers] = useState([]); 
  const [search, setSearch] = useState("");


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


  const handleAddUser = (user) => {
    const updatedLocal = [user, ...localUsers];
    setLocalUsers(updatedLocal);
    localStorage.setItem("localUsers", JSON.stringify(updatedLocal));
  };

  const allUsers = [...localUsers, ...users];

  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
 

      <main style={{ padding: "16px" }}>
        <AddUserForm addUser={handleAddUser} />

        <input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "16px", padding: "8px", width: "300px" }}
        />

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#0b5fff", color: "white" }}>
              <th style={thTdStyle}>Name</th>
              <th style={thTdStyle}>Email</th>
              <th style={thTdStyle}>Company</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} style={{ cursor: "pointer" }}>
                <td style={thTdStyle}>
                  <Link to={`/users/${user.id}`} style={{ textDecoration: "none" }}>
                    {user.name}
                  </Link>
                </td>
                <td style={thTdStyle}>{user.email}</td>
                <td style={thTdStyle}>{user.company?.name ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

     
    </div>
  );
}

const headerStyle = {
  background: "#0b5fff",
  color: "white",
  padding: "16px",
  textAlign: "center",
};

const footerStyle = {
  background: "#f1f1f1",
  padding: "12px",
  marginTop: "24px",
  textAlign: "center",
};

const thTdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};
