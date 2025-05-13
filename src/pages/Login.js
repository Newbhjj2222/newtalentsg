// Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./style.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // ushobora gutanga username mu buryo buhendutse
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Kubika username muri localStorage (wenda wayihaye mu ifishi)
      localStorage.setItem("username", username || email.split("@")[0]);

      setMessage("Winjiye neza!");
      // Redirect cyangwa genda kuri dashboard
      // navigate("/dashboard");
    } catch (error) {
      setMessage("Injira ntibishobotse: " + error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="form-title">Sign In</h1>
      <form onSubmit={handleLogin}>
        {message && <div className="messageDiv">{message}</div>}
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input
            type="text"
            placeholder="Username (optional)"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn" type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
