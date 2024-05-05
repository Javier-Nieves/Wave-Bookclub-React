import { useEffect } from "react";

import Switch from "./Switch";
import ReadingTableTemplate from "./ReadingTableTemplate";
import HistoryTableTemplate from "./HistoryTableTemplate";
import SearchTableTemplate from "./SearchTableTemplate";
import { useBooks } from "../Contexts/BooksContext";

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
