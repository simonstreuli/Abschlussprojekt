import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import { Remove } from "@material-ui/icons";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

export default function Profile() {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const { username } = useParams();
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user._id)
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (currentUser && user._id) {
      const isFollowing = currentUser.followings.includes(user._id);
      setFollowed(isFollowing);
    }
  }, [currentUser, user._id]);

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
  console.log(user._id);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user._id) {
          const friendList = await axios.get("/users/friends/" + user._id);
          setFriends(friendList.data);
          console.log("yes");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  console.log(
    "User profil id: " + user._id + " Current user id" + currentUser._id
  );
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      console.log("Error");
    }
    setFollowed(!followed);
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`/users/${user._id}`, {
        desc: user.desc,
        city: user.city,
        from: user.from,
        relationship: user.relationship,
        userId: currentUser._id,
      });
      console.log("Benutzerinformationen erfolgreich aktualisiert.");
    } catch (error) {
      console.error(
        "Fehler beim Aktualisieren der Benutzerinformationen:",
        error
      );
    }
    setEditMode(false);
  };
  console.log(followed);

  return (
    <>
      <Navbar />
      <div className="profileContainer">
        <div className="profileMain">
          <div className="editBtnContainer">
            {user.username === currentUser.username && (
              <EditIcon className="editBtn" onClick={handleEditMode} />
            )}
          </div>

          {user.username !== currentUser.username && (
            <button className="followBtn" onClick={handleClick}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove /> : <AddIcon />}
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
              {editMode && user.username === currentUser.username ? (
                <>
                  <input
                    type="text"
                    className="description"
                    name="desc"
                    value={user.desc}
                    onChange={handleInputChange}
                  />
                  <div className="locationContainer">
                    <LocationOnIcon className="locationIcon" />
                    <input
                      type="text"
                      className="userDetails"
                      name="city"
                      value={user.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="countryContainer">
                    <PublicIcon className="countryIcon" />
                    <input
                      type="text"
                      className="userDetails"
                      name="from"
                      value={user.from}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relationshipContainer">
                    <PeopleAltIcon className="relationshipIcon" />
                    <input
                      type="text"
                      className="userDetails"
                      name="relationship"
                      value={user.relationship}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                    className="saveChangesBtn"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <div className="followersContainer">
                    <p className="userDetails">
                      Followers: {user.followers?.length + 1}
                    </p>
                  </div>

                  <p className="description">{user.desc}</p>
                  <br />
                  <div className="locationContainer">
                    <LocationOnIcon className="locationIcon" />
                    <p className="userDetails">{user.city}</p>
                  </div>
                  <div className="countryContainer">
                    <PublicIcon className="countryIcon" />
                    <p className="userDetails"> {user.from}</p>
                  </div>
                  <div className="relationshipContainer">
                    <PeopleAltIcon className="relationshipIcon" />
                    <p className="userDetails">{user.relationship}</p>
                  </div>
                </>
              )}
            </div>
          </div>
          {friends.length > 0 && <h2 id="friendstitle">Friends</h2>}
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
