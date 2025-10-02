import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./UserDetails.css";


export default function UserDetails({ users }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = users?.find((u) => String(u.id) === id);
    if (localUser) {
      setUser(localUser);
    } else {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("User not found");
          return res.json();
        })
        .then(setUser)
        .catch(() => setUser(null));
    }
  }, [id, users]);

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
