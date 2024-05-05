import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../Contexts/AuthContext";

import styles from "./HomePage.module.css";
import Button from "../Components/Button";

// const TestUser = {
//   name: "wave",
//   password: "",
// };

function Login() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  // const [name, setName] = useState(TestUser.name);
  // const [pass, setPass] = useState(TestUser.password);

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
        />
        <Button type="enter-btn">Enter</Button>
      </form>
    </main>
  );
}

export default Login;
