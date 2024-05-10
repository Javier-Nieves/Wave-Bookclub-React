import { useBooks } from "../../contexts/BooksContext";
import NoContentYet from "../../ui/NoContentYet";
import { TableRow, TableRowYear } from "./TableRow";

import styles from "./Tables.module.css";

export default function HistoryTable() {
  const { books } = useBooks();
  let yearChange;

  const readBooks = books.filter((item) => item.read);

  if (!readBooks.length)
    return <NoContentYet>Your reading history will be here</NoContentYet>;

  return (
    <table className={styles.histTable}>
      <thead>
        <tr className={styles.historyHead}>
          <th>Book</th>
          <th>Author</th>
          <th className={styles.mobileOnly}>Year</th>
          <th className={styles.mobileOnly}>Country</th>
          <th className={styles.mobileOnly}>Pages</th>
          <th>Rating</th>
        </tr>
      </thead>

      <tbody className={styles.historyTable}>
        {books
          .sort((a, b) => new Date(b.meeting_date) - new Date(a.meeting_date))
          .map((book) => {
            if (!book.read) return false;
            if (!yearChange) yearChange = book.meeting_date?.slice(0, 4);
            if (book.meeting_date?.slice(0, 4) !== yearChange) {
              yearChange = book.meeting_date?.slice(0, 4);
              // render Year Row and last Book row from that year together
              return (
                <TableRowYear
                  yearChange={yearChange}
                  key={yearChange || Date.now()}
                  book={book}
                />
              );
            }
            yearChange = book.meeting_date?.slice(0, 4);
            // render just book row if it's from the same year
            return <TableRow book={book} key={book.bookid} />;
          })}
      </tbody>
    </table>
  );
}
