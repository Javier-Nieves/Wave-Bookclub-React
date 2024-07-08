import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/user/useUser.js";
import { useLogin } from "../features/user/useLogin.js";
import Loader from "../ui/Loader";
import Button from "../ui/Button";

import styles from "./Pages.module.css";

export default function Homepage() {
  const { isLoggedIn } = useUser();

  const navigate = useNavigate();
  useEffect(
    function () {
      // preventing logged in user to access this page
      if (isLoggedIn) navigate("/app", { replace: true });
    },
    [isLoggedIn, navigate]
  );

  return (
    <main className={styles.homepage}>
      <Loader name="loadScreenGifSmall" />
      <WelcomeTitle />
      <ButtonContainer />
    </main>
  );
}

function WelcomeTitle() {
  return (
    <>
      <div className={styles.welcomeText}>Hey! You are in the</div>
      <div className={styles.welcomeTitle}>Wave Bookclub</div>
    </>
  );
}

function ButtonContainer() {
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();

  return (
    <div className={styles.buttonContainer}>
      <div className={styles.flexColumn}>
        <div className={styles.welcomeTextSmall}>Create your bookclub</div>
        <Button
          disabled={isLoading}
          onClick={() => navigate("/register")}
          type="registerBtn"
        >
          Register
        </Button>
      </div>

      <div className={styles.flexColumn}>
        <div className={styles.welcomeTextSmall}>Login to a bookclub</div>
        <Button
          disabled={isLoading}
          onClick={() => navigate("/login")}
          type="pictureBtn"
        >
          Enter
        </Button>
      </div>

      <div className="flex-column">
        <div className={styles.welcomeTextSmall}>Fast enter without login</div>
        <Button
          disabled={isLoading}
          onClick={() => login({ name: "test", password: "testingBookClub" })}
          type="testBtn"
        >
          Test
        </Button>
      </div>
    </div>
  );
}
