import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useRegister } from "../features/user/useRegister.js";
import { useUser } from "../features/user/useUser.js";
import Loader from "../ui/Loader.jsx";
import Button from "../ui/Button";

import styles from "./Pages.module.css";

function Register() {
  const { isLoggedIn } = useUser();
  const { register } = useRegister();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    setLoading(true);
    e.preventDefault();
    if (!name || !password || !passwordConfirm) return;
    if (password !== passwordConfirm) return;
    await register({ name, password, passwordConfirm });
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length !== 0 &&
            (password.length < 8 || password.length > 20) && (
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
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {password !== passwordConfirm && (
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
