import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // 1. Injiza user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Fata document ya "data"
      const docRef = doc(db, "userdate", "data");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        let found = false;

        // 3. Shaka email ihuye
        for (const key in data) {
          if (data[key].email === email) {
            const fName = data[key].fName || "";
            localStorage.setItem("username", fName);
            found = true;
            break;
          }
        }

        if (!found) {
          setMessage("Email ntiyabonywe muri database.");
        } else {
          setMessage("Winjiye neza!");
          navigate("/home"); // Redirect to home
        }

      } else {
        setMessage("Document 'data' ntiyabonywe.");
      }

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
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            id="password"
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
