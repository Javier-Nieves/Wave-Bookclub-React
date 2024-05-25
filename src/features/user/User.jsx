import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Button from "../../ui/Button";

import styles from "./User.module.css";

function User() {
  const { isLoggedIn, user, logout } = useAuth();
  const queryClient = useQueryClient();

  function handleLogout() {
    // Clear all queries
    queryClient.clear();
    logout();
  }

  return (
    <div className={styles.enterContainer}>
      {isLoggedIn && (
        <>
          <div className={styles.nameText}>{user.name} Bookclub</div>
          <Button type="greyBtn" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </div>
  );
}

export default User;
