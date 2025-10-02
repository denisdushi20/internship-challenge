import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/userSlice";
import "./UserDetails.css";

export default function UserDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const reduxUsers = useSelector((state) => state.users);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    company: "",
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setFetchedUsers)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const localUser = reduxUsers.find((u) => String(u.id) === id);
    const fetchedUser = fetchedUsers.find((u) => String(u.id) === id);
    const foundUser = localUser || fetchedUser || null;

    setUser(foundUser);

    if (foundUser) {
      setFormData({
        name: foundUser.name || "",
        email: foundUser.email || "",
        phone: foundUser.phone || "",
        website: foundUser.website || "",
        address:
          foundUser.address?.street && foundUser.address?.city
            ? `${foundUser.address.street}, ${foundUser.address.city}`
            : foundUser.address || "",
        company: foundUser.company?.name || "",
      });
    }
  }, [id, reduxUsers, fetchedUsers]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
      address:
        typeof formData.address === "string"
          ? { street: formData.address, city: "" }
          : formData.address,
      company: formData.company ? { name: formData.company } : null,
    };

    dispatch(updateUser(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  if (!user) return <p className="loading">User not found or loading...</p>;

  return (
    <div className="user-details-card">
      <h2>User Details</h2>

      {!isEditing ? (
        <>
          <div className="user-info">
            <p><strong style={{ color: "#000" }}>Name:</strong> {user.name}</p>
            <p><strong style={{ color: "#000" }}>Email:</strong> {user.email}</p>
            <p><strong style={{ color: "#000" }}>Phone:</strong> {user.phone ?? "NULL"}</p>
            <p><strong style={{ color: "#000" }}>Website:</strong> {user.website ?? "NULL"}</p>
            <p>
              <strong style={{ color: "#000" }}>Address:</strong>{" "}
              {user.address?.street ?? user.address ?? "N/A"}
            </p>
            <p><strong style={{ color: "#000" }}>Company:</strong> {user.company?.name ?? "NULL"}</p>
          </div>

          <div className="buttons">
            <Link to="/" className="button button-back">← Back</Link>
            <button className="button button-edit" onClick={() => setIsEditing(true)}>Edit Profile</button>
       
          </div>
        </>
      ) : (
        <>
          <form className="edit-form">
            {["name", "email", "phone", "website", "address", "company"].map((field) => (
              <label key={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
                <input
                  className="input-field"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  style={{ color: "#000" }} 
                />
              </label>
            ))}
          </form>

          <div className="buttons">
            <button className="button button-save" onClick={handleSave}>Save Changes</button>
            <button className="button button-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}
