import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext.jsx";
import Loader from "../ui/Loader.jsx";
import Button from "../ui/Button";

import styles from "./Pages.module.css";

function Register() {
  const { register, isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    setLoading(true);
    e.preventDefault();
    if (!name || !pass || !passConfirm) return;
    if (pass !== passConfirm) return;
    await register(name, pass, passConfirm);
    navigate("/app");
    setLoading(false);
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
      <NavLink to="/" className={styles.backLink}>
        ⬅ Return
      </NavLink>
      <h1 className={styles.loginTitle}>Create a bookclub</h1>
      {loading && <Loader name="loginLoading" />}
      {/* <Message centered={true} /> */}
      <form className={styles.enterForm} onSubmit={handleRegister}>
        <div className={styles.underlineContainer}>
          <input
            type="text"
            placeholder="Club Name"
            required
            className={styles.enterInput}
            onChange={(e) => setName(e.target.value.toLowerCase())}
            value={name}
          />
          {name.length !== 0 && (name.length < 2 || name.length > 20) && (
            <div className={styles.underline}>
              Username should be 2-20 symbols long
            </div>
          )}
        </div>
        <div className={styles.underlineContainer}>
          <input
            type="password"
            placeholder="Password"
            required
            className={styles.enterInput}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {pass.length !== 0 && (pass.length < 8 || pass.length > 20) && (
            <div className={styles.underline}>
              Password length should be 8-20 symbols
            </div>
          )}
        </div>
        <div
          className={styles.underlineContainer}
          style={{ marginBottom: "25px" }}
        >
          <input
            type="password"
            placeholder="Confirmation"
            required
            className={styles.enterInput}
            value={passConfirm}
            onChange={(e) => setPassConfirm(e.target.value)}
          />
          {pass !== passConfirm && (
            <div className={styles.underline}>
              Password and confirmation are different
            </div>
          )}
        </div>
        <Button type="brightBtn" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </Button>
      </form>
    </main>
  );
}

export default Register;
