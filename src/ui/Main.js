import { useBooks } from "../Contexts/BooksContext";
import { CLASSIC_LIMIT } from "../config";

import styles from "./Main.module.css";

export default function Main({ children }) {
  const { currentView, bookToShow } = useBooks();
  let image;
  if (currentView === "book")
    image = bookToShow?.year < CLASSIC_LIMIT ? "classic" : "modern";
  else image = currentView;
  return (
    <div
      className={styles.mainView}
      style={{
        backgroundImage: ` linear-gradient(
        rgba(55, 55, 55, 0.7),
        rgba(55, 55, 55, 0.7)
      ),
      url(/img/${image}-back.jpg)`,
      }}
    >
      {children}
    </div>
  );
}
