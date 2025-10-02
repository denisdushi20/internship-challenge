import React, { useState } from "react";

export default function AddUserForm({ addUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !company) return alert("All fields are required");

     if (!/^[A-Z]/.test(name)) {
      return alert("Name must start with a capital letter");
    }
    if(!/^[A-Z]/.test(company)){
        return alert("Company must start with a capital letter")
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return alert("Invalid email format,email must contain @");
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
    <form onSubmit={handleSubmit} style={{ marginBottom: "16px" }}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button type="submit">Add User</button>
    </form>
  );
}
