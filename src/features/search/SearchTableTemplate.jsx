import { useBooks } from "../../contexts/BooksContext";
import { SearchRow } from "../tables/TableRow";

import styles from "../tables/Tables.module.css";

export default function SearchTable() {
  const { searchResults } = useBooks();

  if (!searchResults) return;
  return (
    <table style={{ marginTop: "6rem" }}>
      <thead>
        <tr className={styles.searchHead}>
          <th className="Up">Book</th>
          <th>Title</th>
          <th className="Up">Author</th>
        </tr>
      </thead>

      <tbody className={styles.searchTable}>
        {searchResults.map((book) => (
          <SearchRow book={book} key={book.bookid} />
        ))}
      </tbody>
    </table>
  );
}
