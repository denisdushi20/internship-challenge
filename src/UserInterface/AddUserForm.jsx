import React, { useState } from "react";
import "./AddUserForm.css";

export default function AddUserForm({ addUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};


    if (!name) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Z]/.test(name)) {
      newErrors.name = "Name must start with a capital letter";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    } else if (!email.endsWith(".com")) {
      newErrors.email = "Email must end with .com";
    }

   
    if (company && company.trim() !== "" && !/^[A-Z]/.test(company)) {
      newErrors.company = "Company must start with a capital letter";
    }

    if (phone && phone.trim() !== "" && !/^[0-9]{7,15}$/.test(phone)) {
      newErrors.phone = "Phone must contain only numbers (7–15 digits)";
    }

    if (
      website &&
      website.trim() !== "" &&
      !/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(website)
    ) {
      newErrors.website = "Invalid website format (e.g., example.com)";
    }

    if (address && address.trim() !== "" && address.length < 5) {
      newErrors.address = "Address must be at least 5 characters long";
    }

    setErrors(newErrors);

    
    if (Object.keys(newErrors).length > 0) return;

    
    const newUser = {
      id: Date.now(),
      name,
      email,
      company: company ? { name: company } : null,
      phone: phone || null,
      website: website || null,
      address: address || null,
    };

    addUser(newUser);

 
    setName("");
    setEmail("");
    setCompany("");
    setPhone("");
    setWebsite("");
    setAddress("");
    setErrors({});
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <h3>Add New User</h3>

      <div>
        <input
          className="input-field"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      <div>
        <input
          className="input-field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div>
        <input
          className="input-field"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {errors.company && <p className="error-message">{errors.company}</p>}
      </div>

      <div>
        <input
          className="input-field"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}
      </div>

      <div>
        <input
          className="input-field"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        {errors.website && <p className="error-message">{errors.website}</p>}
      </div>

      <div>
        <input
          className="input-field"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && <p className="error-message">{errors.address}</p>}
      </div>

      <button className="submit-btn" type="submit">
        Add User
      </button>
    </form>
  );
}
