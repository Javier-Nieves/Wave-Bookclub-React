import { useEffect } from "react";

import Switch from "./Switch";
import ReadingTableTemplate from "../features/reading/ReadingTableTemplate";
import HistoryTableTemplate from "../features/history/HistoryTableTemplate";
import SearchTableTemplate from "../features/search/SearchTableTemplate";
import { useBooks } from "../contexts/BooksContext";

export function ReadingTable({ period = "classic" }) {
  const { changeView } = useBooks();
  useEffect(
    function () {
      changeView(period);
    },
    [period, changeView]
  );

  return (
    <>
      <Switch period={period} />
      <ReadingTableTemplate period={period} />
    </>
  );
}

export function HistoryTable() {
  const { changeView } = useBooks();
  useEffect(
    function () {
      changeView("history");
    },
    [changeView]
  );
  return (
    <>
      <Switch />
      <HistoryTableTemplate />
    </>
  );
}

export function SearchTable() {
  const { changeView } = useBooks();
  useEffect(
    function () {
      changeView("search");
    },
    [changeView]
  );
  return (
    <>
      <Switch />
      <SearchTableTemplate />
    </>
  );
}
