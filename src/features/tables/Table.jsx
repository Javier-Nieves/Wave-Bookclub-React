import { useEffect } from "react";

import { useViews } from "../../contexts/ViewsContext";
import { useBooks } from "../../contexts/BooksContext";
import Switch from "../../ui/Switch";
import ReadingTableTemplate from "./ReadingTableTemplate";
import HistoryTableTemplate from "./HistoryTableTemplate";
import SearchTableTemplate from "../search/SearchTableTemplate";

export default function Table({ section = "classic" }) {
  const { changeView, currentView } = useViews();
  const { clearBookToShow, bookToShow } = useBooks();

  useEffect(
    function () {
      currentView !== section && changeView(section);
      bookToShow && clearBookToShow();
    },
    [section, changeView, bookToShow, clearBookToShow, currentView]
  );

  if (section === "history") return <HistoryTableTemplate />;

  if (section === "search") return <SearchTableTemplate />;

  if (section === "classic" || section === "modern")
    return (
      <>
        <Switch section={section} />
        <ReadingTableTemplate section={section} />
      </>
    );
}
