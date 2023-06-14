import "./navbar.css";
import logo from '../../assets/logo.png';
import { Person, Chat, Notifications } from "@material-ui/icons";

export default function Navbar() {
  return <div className="navbar">

    <div className="navbarLeft">
      <span className="logo"><img src={logo} alt="Logo" className="logo-img" /></span>
    </div>
    <div className="navbarCenter">
    <div className="navbarlinks">
       <span className="navbar-link">Home</span>
        <span className="navbar-link">Timeline</span>
      </div>
    </div>
    <div className="navbarRight">
      <div className="navbar-icons">
        <div className="navbar-icon">
          <Chat />
          <span className="navbarbadge">1</span>
        </div>
        <div className="navbar-icon">
          <Notifications />
          <span className="navbarbadge">1</span>
        </div>
        <div className="navbar-icon">
          <Person />
          <span className="navbarbadge">1</span>
        </div>
      </div>
      <img src="/assets/person/2.jpeg" alt="" className="navbar-profile-img" />
    </div>
  </div>;
}

