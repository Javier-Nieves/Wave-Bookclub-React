import { useLibrary } from "../book/useLibrary";
import { useSort } from "./useSort";
import { TableRow } from "./TableRow";
import NoContentYet from "../../ui/NoContentYet";
import Loader from "../../ui/Loader";
import BookTable from "./BookTable";

import styles from "./Tables.module.css";

export default function Table({ section }) {
  const { isLoading } = useLibrary();
  const { classicBooks, modernBooks, handleSort } = useSort();

  if (isLoading) return <Loader />;

  // reading lists are empty:
  if (
    (section === "classic" && !classicBooks?.length) ||
    (section === "modern" && !modernBooks?.length)
  )
    return (
      <NoContentYet>
        <p>Your {section} reading list will be here.</p>
        <p style={{ marginTop: "40px" }}>Use search to add some books to it!</p>
      </NoContentYet>
    );

  return (
    <BookTable section={section}>
      <BookTable.Header>
        <th className="12" onClick={() => handleSort("title")}>
          Book
        </th>
        <th onClick={() => handleSort("author")}>Author</th>
        <th onClick={() => handleSort("year")}>Year</th>
        {/* prettier-ignore */}
        <th className={styles.mobileOnly} onClick={() => handleSort("country")}>
            Country </th>
        <th className={styles.mobileOnly} onClick={() => handleSort("pages")}>
          Pages
        </th>
      </BookTable.Header>
      <BookTable.Body
        data={section === "classic" ? classicBooks : modernBooks}
        render={(book) =>
          !book.read && <TableRow book={book} key={book.bookid} />
        }
      />
    </BookTable>
  );
}
