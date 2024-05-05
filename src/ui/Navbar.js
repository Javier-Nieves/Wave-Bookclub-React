import { NavLink } from "react-router-dom";
import { useBooks } from "../Contexts/BooksContext";

export function Navbar() {
  const { defaultStyle, changeView } = useBooks();
  return (
    <div className="navbar">
      <NavLink
        to={defaultStyle}
        className={`link brand-modern`}
        onClick={() => changeView(defaultStyle)}
      >
        Reading List
      </NavLink>
      <NavLink
        to="history"
        className={`link brand-modern`}
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
