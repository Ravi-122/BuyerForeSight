import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="content">
        <h1>User Management System</h1>
        <p>Manage users efficiently with a modern dashboard</p>

        <button onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Home;