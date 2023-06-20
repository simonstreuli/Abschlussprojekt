import React from "react";
import "./profile.css";
import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";

export default function Profile() {
  const user = {
    username: "John Doe",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    city: "New York",
    from: "Los Angeles",
    relationship: "Single",
  };
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <Navbar />
      <div className="profileContainer">
        <div className="profileMain">
          <div className="profileHeader">
            <div className="profilePicture">
              <img src={publicFolder + "person/1.jpeg"} alt="Profile" />
            </div>
            <div className="profileInfo">
              <h2 className="username">{user.username}</h2>
              <p className="description">{user.description}</p>
              <p className="userDetails">City: {user.city}</p>
              <p className="userDetails">From: {user.from}</p>
              <p className="userDetails">Relationship: {user.relationship}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="feedContainer">
        <Feed />
      </div>
    </>
  );
}
