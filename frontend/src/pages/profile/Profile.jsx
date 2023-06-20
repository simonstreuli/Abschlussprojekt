import React from "react";
import "./profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";

export default function Profile() {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      axios
        .get("/users/" + post.userId)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.error(err));
    };
    fetchUser();
  }, [post.userId]);

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
        <Feed username="john" />
      </div>
    </>
  );
}
