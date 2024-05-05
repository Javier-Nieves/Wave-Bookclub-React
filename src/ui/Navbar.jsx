import { NavLink } from "react-router-dom";
import { useBooks } from "../contexts/BooksContext";

import styles from "./Navbar.module.css";

export function Navbar() {
  const { defaultStyle, changeView } = useBooks();
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

// function NavButton({ children, linkTo }) {
//   const { changeView, defaultStyle } = useBooks();
//   return (
//     <button
//       id="reading-link"
//       className={`link brand-modern`}
//       onClick={() => changeView(linkTo || defaultStyle)}
//     >
//       {children}
//     </button>
//   );
// }
