import { useGetBook } from "../features/book/useGetBook";
import { useViews } from "../contexts/ViewsContext";
import { CLASSIC_LIMIT } from "../utils/config";

import styles from "./Main.module.css";

export default function Main({ children }) {
  const { bookToShow } = useGetBook();
  const { currentView } = useViews();
  let image;
  if (currentView === "book")
    image = bookToShow?.year < CLASSIC_LIMIT ? "classic" : "modern";
  else image = currentView;

  return (
    <div
      className={styles.mainView}
      style={{
        backgroundImage: ` linear-gradient(
            var(--color-back-filter),
            var(--color-back-filter)
          ),
          url(/img/${image}-back.jpg)`,
      }}
    >
      {children}
    </div>
  );
}
