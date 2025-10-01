import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <div className="app">
      <nav style={navStyle}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <h1>Internship Challenge - User Management</h1>
        </Link>
      </nav>

      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </main>
    </div>
  );
}

const navStyle = {
  background: "#0b5fff",
  color: "white",
  padding: "12px 16px",
  marginBottom: 16,
};

export default App;
