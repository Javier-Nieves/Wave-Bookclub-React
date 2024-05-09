import { useBooks } from "../../contexts/BooksContext";
import NoContentYet from "../../ui/NoContentYet";
import { CLASSIC_LIMIT } from "../../utils/config";
import { TableRow } from "./TableRow";

import styles from "./Tables.module.css";

export default function Table({ section }) {
  const { books } = useBooks();

  const classicBooks = books.filter((book) => book.year < CLASSIC_LIMIT);
  const modernBooks = books.filter((book) => book.year > CLASSIC_LIMIT);

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
          <th className="Up">Book</th>
          <th className="Up">Author</th>
          <th className="Up">Year</th>
          <th className="Up">Country</th>
          <th className="Up">Pages</th>
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
