import { useBooks } from "../Contexts/BooksContext";
import { SearchRow } from "./TableRow";

import styles from "./Tables.module.css";

export default function SearchTable() {
  const { searchResults } = useBooks();

  if (!searchResults) return;
  return (
    <table>
      <thead>
        <tr className={styles.searchHead}>
          <th className="cl0 Up">Book</th>
          <th>Title</th>
          <th className="cl1 Up">Author</th>
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
