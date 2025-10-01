import React, { useState, useEffect } from "react";
import AddUserForm from "../UserInterface/AddUserForm";
import { setUsers, addUser } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";



export default function Home() {
 const users = useSelector((state) => state.users); 
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

   useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => dispatch(setUsers(data)));
  }, [dispatch]);
  
  
  const handleAddUser = (user) => dispatch(addUser(user));

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Users</h2>
      <input
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
        <AddUserForm addUser={handleAddUser} />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.company.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
