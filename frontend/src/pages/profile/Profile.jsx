import React, { useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";
import { Link, useParams } from "react-router-dom";

export default function Profile() {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?username=${username}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log("Error" + error);
      }
    };
    getFriends();
  }, [user._id]);

  return (
    <>
      <Navbar />
      <div className="profileContainer">
        <div className="profileMain">
          <div className="profileHeader">
            <div className="profilePicture">
              <img
                src={
                  user.profileUserImg
                    ? publicFolder + user.profileUserImg
                    : publicFolder + "person/noAvatar.png"
                }
                alt="Profile"
              />
            </div>
            <div className="profileInfo">
              <h2 className="username">{user.username}</h2>
              <p className="description">Description: {user.desc}</p>
              <p className="userDetails">City: {user.city}</p>
              <p className="userDetails">From: {user.from}</p>
              <p className="userDetails">Relationship: {user.relationship}</p>
            </div>
          </div>
          <h2 id="friendstitle">Friends</h2>

          <div className="friendsContainer">
            <div className="friendsList">
              {friends.map((friend) => (
                <Link to={"/profile/" + friend.username} className="link">
                  <div className="friend" key={friend.id}>
                    <img
                      className="profilePicture"
                      src={
                        user.profilePicture
                          ? publicFolder + friend.profilePicture
                          : publicFolder + "person/noAvatar.png"
                      }
                      alt="Profile"
                    />
                    <p>{friend.username}</p>
                  </div>{" "}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="feedContainer">
        <Feed username={username} />
      </div>
    </>
  );
}
