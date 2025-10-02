import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddUserForm from "../UserInterface/AddUserForm";
import { addUser, updateUser, deleteUser } from "../store/userSlice";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const reduxUsers = useSelector((state) => state.users); 
  const [fetchedUsers, setFetchedUsers] = useState([]); 
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [sortField, setSortField] = useState(""); 
  const [sortOrder, setSortOrder] = useState("asc"); 

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setFetchedUsers)
      .catch(console.error);
  }, []);

  const handleAddOrUpdateUser = (user) => {
    if (editingUser) {
      if (reduxUsers.find((u) => u.id === user.id)) {
        dispatch(updateUser(user));
      } else {
        setFetchedUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
      }
      setEditingUser(null);
    } else {
      dispatch(addUser(user));
    }
  };

  const handleDeleteUser = (id) => {
    if (reduxUsers.find((u) => u.id === id)) {
      dispatch(deleteUser(id));
    } else {
      setFetchedUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const allUsers = [...reduxUsers, ...fetchedUsers];
  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;

    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === "company") {
      aVal = a.company?.name ?? "";
      bVal = b.company?.name ?? "";
    }

    if (typeof aVal === "string") aVal = aVal.toLowerCase();
    if (typeof bVal === "string") bVal = bVal.toLowerCase();

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const renderArrow = (field) => {
    if (sortField === field) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "△"; 
  };

  return (
    <div className="home-container">
      <main className="main-content">
        <div className="flex-container">
          <div className="form-container">
            <AddUserForm addUser={handleAddOrUpdateUser} />
          </div>

          <div className="table-container">
            <input
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />

            <table className="table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                    Name {renderArrow("name")}
                  </th>
                  <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                    Email {renderArrow("email")}
                  </th>
                  <th onClick={() => handleSort("company")} style={{ cursor: "pointer" }}>
                    Company {renderArrow("company")}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
             <tbody>
  {sortedUsers.map((user) => (
    <tr key={user.id}>
      <td style={{ padding: 0 }}>
        <Link to={`/users/${user.id}`} className="table-link-cell">
          {user.name}
        </Link>
      </td>
      <td style={{ padding: 0 }}>
        <Link to={`/users/${user.id}`} className="table-link-cell">
          {user.email}
        </Link>
      </td>
      <td style={{ padding: 0 }}>
        <Link to={`/users/${user.id}`} className="table-link-cell">
          {user.company?.name ?? "NULL"}
        </Link>
      </td>
      <td>
        <button
          className="button button-delete"
          onClick={() => handleDeleteUser(user.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
