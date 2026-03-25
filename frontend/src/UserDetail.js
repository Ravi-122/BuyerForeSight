import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import"./ud.css";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);


if (!user) {
  return (
    <div className="loader-container">
      <img
        src="/logo.png"   
        alt="BuyerForeSight"
        className="logo"
      />
    </div>
  );
}

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={() => window.history.back()}>Back</button>
      <div className="card"><h2>{user.name}</h2>

      <div className="info">
      <p><strong>Email:</strong><span>{user.email}</span></p>
      <p><strong>Phone:</strong> <span>{user.phone}</span></p>
      <p><strong>Company:</strong> <span>{user.company.name}</span></p>
      <p><strong>Address:</strong> <span>{user.address.street}, {user.address.city}, {user.address.zipcode}</span></p>
      <p><strong>Role:</strong> <span>{user.company.bs}</span></p>
      <p><strong>CatchPhrase:</strong> <span>{user.company.catchPhrase}</span></p>
      <p>
       <strong>Website:</strong> 
       <span>
        <a href={`http://${user.website}`} >
        {user.website}
       </a>
       </span>
      </p>

      </div>
      </div>
    </div>
  );
}

export default UserDetail;