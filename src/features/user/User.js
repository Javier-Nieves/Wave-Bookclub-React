import { useAuth } from "../Contexts/AuthContext";
import Button from "./Button";

import styles from "./User.module.css";

function User() {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <div className={styles.enterContainer}>
      {isLoggedIn && (
        <>
          <div className={styles.nameText}>{user} Bookclub</div>
          <Button type="enter-btn" onClick={logout}>
            Logout
          </Button>
        </>
      )}
    </div>
  );
}

export default User;
