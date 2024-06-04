import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CLASSIC_LIMIT } from "../../utils/config";
import { useLibrary } from "../book/useLibrary";

export function useSort() {
  const [searchParams] = useSearchParams();
  const { books } = useLibrary();
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const isSorted = useRef("");

  function handleSort(columnName) {
    isSorted.current = "test";
    if (sortedColumn === columnName) {
      // If already sorted, toggle the direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If sorting a new column, set it as sorted and default to ascending
      setSortedColumn(columnName);
      setSortDirection("asc");
    }
  }

  const sortedBooks = books?.sort((a, b) => {
    const columnA = a[sortedColumn];
    const columnB = b[sortedColumn];
    if (columnA < columnB) return sortDirection === "asc" ? -1 : 1;
    if (columnA > columnB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
  const classicBooks = sortedBooks?.filter(
    (book) => book.year < CLASSIC_LIMIT && !book.read
  );
  const modernBooks = sortedBooks?.filter(
    (book) => book.year > CLASSIC_LIMIT && !book.read
  );

  let readBooks = books
    ?.filter((book) => book.read)
    .sort((a, b) => new Date(b.meeting_date) - new Date(a.meeting_date));

  // if history table isSorted:
  isSorted.current && (readBooks = sortedBooks?.filter((book) => book.read));

  // if history table is filtered
  const filterValue = searchParams.get("period");
  if (filterValue === "modern")
    readBooks = readBooks.filter((book) => book.year > CLASSIC_LIMIT);
  if (filterValue === "classic")
    readBooks = readBooks.filter((book) => book.year < CLASSIC_LIMIT);

  return {
    classicBooks,
    modernBooks,
    readBooks,
    isSorted: isSorted.current,
    handleSort,
  };
}
