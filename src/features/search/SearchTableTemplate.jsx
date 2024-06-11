import { useViews } from "../../contexts/ViewsContext";
import NoContentYet from "../../ui/NoContentYet";
import { SearchRow } from "../tables/TableRow";

import styles from "../tables/Tables.module.css";

export default function SearchTable() {
  const { currentSearchResults } = useViews();

  if (!currentSearchResults.length)
    return <NoContentYet>No results</NoContentYet>;
  return (
    <table className={styles.searchTable}>
      <thead>
        <tr className={styles.searchHead}>
          <th>Book</th>
          <th>Title</th>
          <th>Author</th>
        </tr>
      </thead>

      <tbody className={styles.searchTable}>
        {currentSearchResults.map((book) => (
          <SearchRow book={book} key={book.bookid} />
        ))}
      </tbody>
    </table>
  );
}
