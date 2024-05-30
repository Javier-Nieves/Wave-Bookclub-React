import { useLibrary } from "../book/useLibrary";
import { useSort } from "./useSort";
import { TableRow, TableRowYear } from "./TableRow";
import Loader from "../../ui/Loader";
import NoContentYet from "../../ui/NoContentYet";
import BookTable from "./BookTable";

import styles from "./Tables.module.css";

export default function HistoryTable() {
  const { isLoading } = useLibrary();
  const { readBooks, isSorted, handleSort } = useSort();
  let yearChange;

  if (isLoading) return <Loader />;

  // Empty reading history:
  if (!readBooks?.length)
    return <NoContentYet>Your reading history will be here</NoContentYet>;

  return (
    <BookTable section="history">
      <BookTable.Header>
        <th onClick={() => handleSort("title")}>Title</th>
        <th onClick={() => handleSort("author")}>Author</th>
        <th onClick={() => handleSort("year")} className={styles.mobileOnly}>
          Year
        </th>
        <th onClick={() => handleSort("country")} className={styles.mobileOnly}>
          Country
        </th>
        <th onClick={() => handleSort("pages")} className={styles.mobileOnly}>
          Pages
        </th>
        <th onClick={() => handleSort("rating")}>Rating</th>
      </BookTable.Header>
      <BookTable.Body
        data={readBooks}
        render={(book) => {
          // yearChange detects places in history when calendar year ends
          if (!yearChange) yearChange = book.meeting_date?.slice(0, 4);
          if (book.meeting_date?.slice(0, 4) !== yearChange && !isSorted) {
            yearChange = book.meeting_date?.slice(0, 4);
            // render Year Row and last Book row from that year together
            return (
              <TableRowYear
                yearChange={yearChange}
                key={book.bookid + 13}
                book={book}
              />
            );
          }
          yearChange = book.meeting_date?.slice(0, 4);
          // render just book row if it's from the same year
          return <TableRow book={book} key={book.bookid} />;
        }}
      />
    </BookTable>
  );
}
