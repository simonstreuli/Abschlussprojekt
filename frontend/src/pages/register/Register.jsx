import "./register.css";

export default function Register() {
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
            <input required placeholder="Username" className="loginInput" />
            <input required placeholder="Email" className="loginInput" />
            <input required type="password" placeholder="Password" className="loginInput" />
            <input required type="password"  placeholder="Password Again" className="loginInput" />
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}