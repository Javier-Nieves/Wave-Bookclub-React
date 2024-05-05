import { useBooks } from "../Contexts/BooksContext";
import { CLASSIC_LIMIT } from "../config";
import { TableRow } from "./TableRow";

import styles from "./Tables.module.css";

export default function Table({ period }) {
  const { books } = useBooks();
  return (
    <table id={styles[`${period}Table`]}>
      <thead>
        <tr className={styles[`${period}Head`]}>
          <th className="cl0 Up">Book</th>
          <th className="cl1 Up">Author</th>
          <th className="cl2 Up">Year</th>
          <th className="cl3 Up">Country</th>
          <th className="cl4 Up">Pages</th>
        </tr>
      </thead>

      <tbody className={styles[`${period}Table`]}>
        {period === "classic" &&
          books.map(
            (book) =>
              book.year < CLASSIC_LIMIT &&
              !book.read && <TableRow book={book} key={book.bookid} />
          )}

        {period === "modern" &&
          books.map(
            (book) =>
              book.year > CLASSIC_LIMIT &&
              !book.read && <TableRow book={book} key={book.bookid} />
          )}
      </tbody>
    </table>
  );
}
