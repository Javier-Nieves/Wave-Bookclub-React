import { useQueryClient } from "@tanstack/react-query";

import { useUser } from "./useUser.js";
import { useLogout } from "./useLogout.js";
import Button from "../../ui/Button";

import styles from "./User.module.css";

function User() {
  const { isLoggedIn, user } = useUser();
  const { logout } = useLogout();
  const queryClient = useQueryClient();

  function handleLogout() {
    // Clear all queries
    queryClient.clear();
    logout();
    // navigate("/login", { replace: true });
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
