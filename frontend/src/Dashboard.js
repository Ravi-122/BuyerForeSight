import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"
function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const filteredUsers = users
    .filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let valA = sortField === "company" ? a.company.name : a.name;
      let valB = sortField === "company" ? b.company.name : b.name;

      if (sortOrder === "asc") return valA.localeCompare(valB);
      return valB.localeCompare(valA);
    });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };
  const formatPhone = (mob) => {
  return mob
    .replace(/\x/g, ",")  // replace * with ,
    .replace(/\./g, "-"); // replace . with -
};


  return (
    <div className="container">
      <h1>User Directory</h1>
    <div className="top-bar">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="sort-controls">
    
    {/* Sort Field */}
    <select
      value={sortField}
      onChange={(e) => setSortField(e.target.value)}
    >
      <option value="name">Name</option>
      <option value="company">Company</option>
    </select>

    {/* Sort Order */}
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
    </div>

  </div>

      <table border="1">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th onClick={() => handleSort("company")}>Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {formatPhone(user.phone)}</td>
                
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;