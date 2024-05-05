import { useBooks } from "../../contexts/BooksContext";
import { TableRow, TableRowYear } from "../../ui/TableRow";

import styles from "../../ui/Tables.module.css";

export default function HistoryTable() {
  const { books } = useBooks();
  let yearChange;
  return (
    <table>
      <thead>
        <tr className={styles.historyHead}>
          <th className="cl0 Up">Book</th>
          <th className="cl1 Up">Author</th>
          <th className="cl2 Up">Year</th>
          <th className="cl3 Up">Country</th>
          <th className="cl4 Up">Pages</th>
          <th className="cl5 Up">Rating</th>
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
