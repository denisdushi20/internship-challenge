import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);
  return (
 
      <div className="app">
       
        <header style={headerStyle}>
          <h1>Internship Challenge</h1>
          <nav>
            
          </nav>
        </header>
        <main style={{ padding: 16 }}>
          <Routes>
            <Route path="/" element={<Home users={users} setUsers={setUsers} />} />
            <Route path="/users/:id" element={<UserDetails users={users} />} />
          </Routes>
        </main>  
        <footer style={footerStyle}>
          <p>© 2025 Internship Challenge</p>
        </footer>
      </div>

  );
}

const headerStyle = {
  background: "#0b5fff",
  color: "white",
  padding: "15px 0",
  width: "100%",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "bold",
};


const footerStyle = {
  background: "#eee",
  padding: "12px 16px",
  textAlign: "center",
  marginTop: 32,
};

export default App;
