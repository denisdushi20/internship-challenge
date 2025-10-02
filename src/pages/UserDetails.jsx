import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./UserDetails.css";

export default function UserDetails() {
  const { id } = useParams();
  const reduxUsers = useSelector((state) => state.users);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setFetchedUsers)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const localUser = reduxUsers.find((u) => String(u.id) === id);
    if (localUser) {
      setUser(localUser);
    } else {
      const fetchedUser = fetchedUsers.find((u) => String(u.id) === id);
      if (fetchedUser) {
        setUser(fetchedUser);
      } else {
        setUser(null);
      }
    }
  }, [id, reduxUsers, fetchedUsers]);

  if (!user) return <p className="loading">User not found or loading...</p>;

  return (
    <div className="user-details-card">
      <h2>{user.name}</h2>

      <div className="user-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone ?? "N/A"}</p>
        <p><strong>Website:</strong> {user.website ?? "N/A"}</p>
        <p>
          <strong>Address:</strong>{" "}
          {user.address?.street ?? "N/A"}, {user.address?.city ?? "N/A"},{" "}
          {user.address?.zipcode ?? "N/A"}
        </p>
        <p><strong>Company:</strong> {user.company?.name ?? "N/A"}</p>
      </div>

      <Link to="/" className="back-btn">← Back to Users</Link>
    </div>
  );
}
