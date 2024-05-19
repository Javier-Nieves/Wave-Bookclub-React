import { useViews } from "../../contexts/ViewsContext";
import Loader from "../../ui/Loader";
import { SearchRow } from "../tables/TableRow";

import styles from "../tables/Tables.module.css";

export default function SearchTable() {
  const { currentSearchResults } = useViews();

  if (!currentSearchResults) return <Loader />;

  return (
    <table className={styles.searchTable}>
      <thead>
        <tr className={styles.searchHead}>
          <th className="Up">Book</th>
          <th>Title</th>
          <th className="Up">Author</th>
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
