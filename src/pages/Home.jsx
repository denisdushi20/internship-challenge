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

  const allUsers = [...reduxUsers, ...fetchedUsers];
  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

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
                      <Link to={`/users/${user.id}`} className="table-link">
                        {user.name}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/users/${user.id}`} className="table-link">
                        {user.email}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/users/${user.id}`} className="table-link">
                        {user.company?.name ?? "N/A"}
                      </Link>
                    </td>
                    <td>
                      <button
                        className="button"
                        onClick={() => setEditingUser(user)}
                      >
                        Edit
                      </button>
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
