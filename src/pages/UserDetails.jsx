import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
  
    const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
    const localUser = localUsers.find((u) => String(u.id) === id);
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
  }, [id]);

  if (!user) return <p>User not found or loading...</p>;

  return (
    <div style={{ padding: "16px" }}>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone ?? "N/A"}</p>
      <p>Website: {user.website ?? "N/A"}</p>
      <p>
        Address: {user.address?.street ?? "N/A"}, {user.address?.city ?? "N/A"},{" "}
        {user.address?.zipcode ?? "N/A"}
      </p>
      <p>Company: {user.company?.name ?? "N/A"}</p>
      <Link to="/">← Back to Users</Link>
    </div>
  );
}
