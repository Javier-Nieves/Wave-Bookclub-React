import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext.jsx";
import Button from "../ui/Button";

import styles from "./Pages.module.css";

function Login() {
  const { login, isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    if (name && pass) await login(name, pass);
    navigate("/app");
    return null;
  }

  useEffect(
    function () {
      // preventing the back button to regenerate the same page
      if (isLoggedIn) navigate("/app", { replace: true });
    },
    [isLoggedIn, navigate]
  );

  return (
    <main className={styles.homepage}>
      <h1 className={styles.loginTitle}>Login</h1>
      <form className={styles.enterForm} onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Club Name"
          required
          className={styles.enterInput}
          onChange={(e) => setName(e.target.value.toLowerCase())}
          value={name}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.enterInput}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={{ marginBottom: "25px" }}
        />
        <Button type="enter-btn">Enter</Button>
      </form>
    </main>
  );
}

export default Login;
