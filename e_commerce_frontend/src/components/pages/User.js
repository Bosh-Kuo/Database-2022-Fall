import React from "react";
import { useState, useEffect } from "react";

const User = () => {
  const [user] = useState([]);
  const [comments] = useState([]);
  const [products] = useState([]);

  return (
    <div style={{ marginLeft: "80px", marginRight: "80px" }}>
      <h2>My Profile</h2>

      <div class="profile" style={{ display: "flow" }}>
        <span style={{ display: "flex" }}>
          <p>Full Name : </p>
          <p>{user.name}</p>
        </span>

        <span style={{ display: "flex" }}>
          <p>Email Address :</p>
          <p>{user.email}</p>
        </span>
      </div>

      <hr />

      <h2> Comment</h2>

      <div class="comment">
        {comments.map((comment) => (
          <p>
            {comments.name}: {comments.comment}
          </p>
        ))}
      </div>

      <hr />

      <h2>Product</h2>
      <div className="product">
        {products.map((product) => (
          <div style={{ display: "flex" }}>
            <div>
              {products.image}
            </div>
            <div style={{ marginLeft: "40px",border:'2px'  }}>
              <p>Title: {products.title}</p>
              <p>Price: {products.price}</p>
              <p>Description: {products.Description}</p>
              <button type="button">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default User;
