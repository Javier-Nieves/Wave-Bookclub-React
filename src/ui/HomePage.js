import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../Contexts/AuthContext";
import Loader from "../Components/Loader";
import Button from "../Components/Button";

import styles from "./HomePage.module.css";

export default function Homepage() {
  const { isLoggedIn } = useAuth();
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
      <div className={styles.welcomeText}>Hey! You're in the</div>
      <div className={styles.welcomeTitle}>Wave Bookclub</div>
    </>
  );
}

function ButtonContainer() {
  const navigate = useNavigate();
  return (
    <div className={styles.buttonContainer}>
      <div className="flex-column">
        <div className={styles.welcomeTextSmall}>Create your bookclub</div>
        <Button onClick={() => navigate("/register")} type="register-btn">
          Register
        </Button>
      </div>

      <div className="flex-column">
        <div className={styles.welcomeTextSmall}>Login to a Bookclub</div>
        <Button onClick={() => navigate("/login")} type="welcome-btn">
          Enter
        </Button>
      </div>

      {/* <div className="flex-column">
      <div className={styles.welcomeTextSmall}>
        Feel free to check out the original Wave Bookclub (est.2015)
      </div>
      <button className="welcome-btn">Got it!</button>
    </div> */}
    </div>
  );
}
