import "./login.css";
import { useContext, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const email = useRef();
  const password = useRef();

  const handleClick = (event) => {
    event.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);

  const loginCall = async (userLogin, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("auth/login", userLogin);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      console.log("Error: " + err);
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
          <form onSubmit={handleClick} className="loginBox">
            <input
              required
              type="Email"
              placeholder="Email"
              className="loginInput"
              ref={email}
            />
            <input
              required
              type="password"
              placeholder="Password"
              className="loginInput"
              ref={password}
              minLength={5}
            />
            <button className="loginButton">
              {isFetching ? "loading" : "Login"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
