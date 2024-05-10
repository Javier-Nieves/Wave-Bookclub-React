import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext.jsx";
import { useViews } from "../contexts/ViewsContext.jsx";
import Button from "../ui/Button";
import Message from "../ui/Message.jsx";
import Loader from "../ui/Loader.jsx";

import styles from "./Pages.module.css";

function Login() {
  const { login, loadingLogin, isLoggedIn } = useAuth();
  const { message, showMessage } = useViews();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    if (name && pass) await login(name, pass);
    // setTimeout(() => {
    //   console.log("login?", isLoggedIn);
    //   !isLoggedIn &&
    //     !message &&
    //     showMessage("Username and password don't match", "bad");
    // }, 2500);
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
      <NavLink to="/" className={styles.backLink}>
        ⬅ Return
      </NavLink>
      <h1 className={styles.loginTitle}>Login</h1>
      {loadingLogin && <Loader name="loginLoading" />}
      <Message centered={true} />
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
        <Button type="brightBtn" disabled={loadingLogin}>
          {loadingLogin ? "Wait please..." : "Enter"}
        </Button>
      </form>
    </main>
  );
}

export default Login;
