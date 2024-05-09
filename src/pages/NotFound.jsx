import { NavLink } from "react-router-dom";
import styles from "./Pages.module.css";

function NotFound() {
  return (
    <main className={styles.homepage}>
      <NavLink to="/" className={styles.brandModern}>
        ⬅ Return
      </NavLink>
      <h1 className={styles.loginTitle}>404 No Such page</h1>
    </main>
  );
}

export default NotFound;
