import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function Register() {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const password2 = useRef();

  const handleClick = async (event) => {
    event.preventDefault();
    if (password.current.value !== password2.current.value) {
      password.current.setCustomValidity("Passwords are not the same");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log("Error" + error.message);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">LinkUp</h3>
          <span className="loginDesc">Discover, Connect, Share!</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              required
              placeholder="Username"
              ref={username}
              className="loginInput"
              type="text"
            />
            <input
              required
              placeholder="Email"
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              required
              type="password"
              placeholder="Password"
              className="loginInput"
              ref={password}
              minLength={6}
            />
            <input
              required
              type="password"
              placeholder="Password Again"
              className="loginInput"
              ref={password2}
            />

            <button className="loginButton" type="submit">
              Sign Up
            </button>

            <button
              className="loginRegisterButton"
              onClick={() => navigate("/login")}
            >
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
