import "./login.css";

export default function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">LinkUp</h3>
          <span className="loginDesc">
            Discover, Connect, Share!
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input  required placeholder="Email" className="loginInput" />
            <input required type="password" placeholder="Password" className="loginInput" />
            <button className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}