import "./navbar.css";
import logo from "../../assets/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Navbar() {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navbarLeft">
        <Link to="/">
          <span className="logo">
            <img src={logo} alt="Logo" className="logo-img" />
          </span>
        </Link>
      </div>
      <div className="navbarCenter">
        <div className="navbarlinks">
          <Link to="/" className="navbar-link">
            <span className="navbar-link">Home</span>
          </Link>
          <Link to="/explore" className="navbar-link">
            <span className="navbar-link">Explore</span>
          </Link>
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbar-icons">
          <div className="navbar-icon">
            <LogoutIcon />
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? publicFolder + user.profilePicture
                : publicFolder + "person/noAvatar.png"
            }
            alt=""
            className="navbar-profile-img"
          />
        </Link>
      </div>
    </div>
  );
}
