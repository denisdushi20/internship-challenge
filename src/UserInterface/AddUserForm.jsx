import React, { useState } from "react";
import "./AddUserForm.css";

export default function AddUserForm({ addUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !company) {
      return alert("All fields are required");
    }

    if (!/^[A-Z]/.test(name)) {
      return alert("Name must start with a capital letter");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return alert("Invalid email format");
    }
       if(!/^[A-Z]/.test(company)){
        return alert("Company must start with a capital letter")
    }
    if (!email.includes(".com")) {
      return alert("Email must end with .com");
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      company: { name: company },
    };

    addUser(newUser);

    setName("");
    setEmail("");
    setCompany("");
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <h3>Add New User</h3>
      <input
        className="input-field"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input-field"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input-field"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button className="submit-btn" type="submit">
        Add User
      </button>
    </form>
  );
}
