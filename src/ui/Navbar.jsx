import { NavLink } from "react-router-dom";
import { useViews } from "../contexts/ViewsContext";

import styles from "./Navbar.module.css";

export function Navbar() {
  const { defaultStyle, changeView } = useViews();

  return (
    <div className={styles.navbar}>
      <NavLink
        to={defaultStyle}
        className={styles.brandModern}
        onClick={() => changeView(defaultStyle)}
      >
        Reading List
      </NavLink>
      <NavLink
        to="history"
        className={styles.brandModern}
        onClick={() => changeView("history")}
      >
        History
      </NavLink>
    </div>
  );
}
