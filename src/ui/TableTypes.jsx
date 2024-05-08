import { useEffect } from "react";

import Switch from "./Switch";
import ReadingTableTemplate from "../features/reading/ReadingTableTemplate";
import HistoryTableTemplate from "../features/history/HistoryTableTemplate";
import SearchTableTemplate from "../features/search/SearchTableTemplate";
import { useViews } from "../contexts/ViewsContext";
import { useBooks } from "../contexts/BooksContext";

export default function Table({ section = "classic" }) {
  const { changeView, currentView } = useViews();
  const { clearBookToShow, bookToShow, books, upcomingBook } = useBooks();

  useEffect(
    function () {
      currentView !== section && changeView(section);
      bookToShow && clearBookToShow();
    },
    [section, changeView, bookToShow, clearBookToShow, currentView]
  );

  // let oneBook = books.find((item) => item === upcomingBook);
  // oneBook = { ...oneBook, rating: 10, read: true, upcoming: false };
  // let newBooks = books.filter((item) => item?.bookid !== oneBook?.bookid);
  // newBooks = [...newBooks, oneBook];

  // let newBooks = books.map((item) =>
  //   item === upcomingBook
  //     ? { ...item, rating: 10, read: true, upcoming: false }
  //     : item
  // );
  // console.log(newBooks);

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
