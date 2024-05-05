import { useBooks } from "../contexts/BooksContext";
import { Navbar } from "./Navbar";
import Search from "../features/search/Search";
import Upcoming from "./Upcoming";
import Controls from "./Controls";

import styles from "./Main.module.css";

export default function Sidebar() {
  const { currentView } = useBooks();
  return (
    <div className={styles.mainLeftPart}>
      <Navbar />
      <Search />
      {(currentView === "modern" ||
        currentView === "classic" ||
        currentView === "history") && <Upcoming />}
      {currentView === "book" && <Controls />}
    </div>
  );
}
