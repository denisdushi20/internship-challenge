import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then(setUser);
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <p>
        Address: {user.address.street}, {user.address.city}, {user.address.zipcode}
      </p>
      <p>Company: {user.company.name}</p>
    </div>
  );
}
