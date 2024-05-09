import { useState } from "react";
import { useBooks } from "../../contexts/BooksContext";
import NoContentYet from "../../ui/NoContentYet";
import { CLASSIC_LIMIT } from "../../utils/config";
import { TableRow } from "./TableRow";

import styles from "./Tables.module.css";

export default function Table({ section }) {
  const { books } = useBooks();
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  function handleSort(columnName) {
    if (sortedColumn === columnName) {
      // If already sorted, toggle the direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If sorting a new column, set it as sorted and default to ascending
      setSortedColumn(columnName);
      setSortDirection("asc");
    }
  }

  const sortedBooks = books.sort((a, b) => {
    const columnA = a[sortedColumn];
    const columnB = b[sortedColumn];
    if (columnA < columnB) return sortDirection === "asc" ? -1 : 1;
    if (columnA > columnB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const classicBooks = sortedBooks.filter((book) => book.year < CLASSIC_LIMIT);
  const modernBooks = sortedBooks.filter((book) => book.year > CLASSIC_LIMIT);

  if (section === "classic" && !classicBooks.length)
    return (
      <NoContentYet>
        <p>Your classic reading list will be here.</p>
        <p style={{ marginTop: "40px" }}>Use search to add some books to it!</p>
      </NoContentYet>
    );

  if (section === "modern" && !modernBooks.length)
    return (
      <NoContentYet>
        <p>Your modern reading list will be here.</p>
        <p style={{ marginTop: "40px" }}>Use search to add some books to it!</p>
      </NoContentYet>
    );

  return (
    <table id={styles[`${section}Table`]}>
      <thead>
        <tr className={styles[`${section}Head`]}>
          <th onClick={() => handleSort("title")}>Book</th>
          <th onClick={() => handleSort("author")}>Author</th>
          <th onClick={() => handleSort("year")}>Year</th>
          <th onClick={() => handleSort("country")}>Country</th>
          <th onClick={() => handleSort("pages")}>Pages</th>
        </tr>
      </thead>

      <tbody className={styles[`${section}Table`]}>
        {section === "classic" &&
          classicBooks.map(
            (book) => !book.read && <TableRow book={book} key={book.bookid} />
          )}

        {section === "modern" &&
          modernBooks.map(
            (book) => !book.read && <TableRow book={book} key={book.bookid} />
          )}
      </tbody>
    </table>
  );
}
