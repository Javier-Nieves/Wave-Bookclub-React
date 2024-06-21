import { useViews } from "../contexts/ViewsContext";
import { Navbar } from "./Navbar";
import { useUser } from "../features/user/useUser";
import Search from "../features/search/Search";
import Upcoming from "./Upcoming";
import Controls from "./Controls";
import TestBlock from "./TestBlock";

import styles from "./Main.module.css";

export default function Sidebar() {
  const { currentView } = useViews();
  const { user } = useUser();
  return (
    <div className={styles.mainLeftPart}>
      <Navbar />
      <Search />
      {(currentView === "modern" ||
        currentView === "classic" ||
        currentView === "history") && <Upcoming />}
      {currentView === "book" && <Controls />}
      {user.name === "test" && <TestBlock />}
    </div>
  );
}
