import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import { Remove } from "@material-ui/icons";

export default function Profile() {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const { username } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const followingsArray = Array.isArray(currentUser.followings)
      ? currentUser.followings
      : [];
    const isFollowing = followingsArray.includes(user?.id);
    setFollowed(isFollowing);
  }, [currentUser, user.id]);

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
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
      } else {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
      }
    } catch (err) {
      console.log("Error");
    }
    setFollowed(!followed);
  };

  return (
    <>
      <Navbar />
      <div className="profileContainer">
        <div className="profileMain">
          {user.username !== currentUser.username && (
            <button className="followBtn" onClick={handleClick}>
              {followed ? "Follow" : "Unfollow"}
              {followed ? <AddIcon /> : <Remove />}
            </button>
          )}

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
