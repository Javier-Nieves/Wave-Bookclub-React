import { useNavigate } from "react-router-dom";
import { useViews } from "../contexts/ViewsContext";
import { useCountries } from "../contexts/CountriesContext";

import styles from "./Tables.module.css";

export function TableRow({ book }) {
  const { currentView } = useViews();
  const { countries } = useCountries();
  const navigate = useNavigate();

  const bookCountry = countries.find((c) => c.name.common === book.country);

  return (
    <tr
      className={`${styles[currentView + "Body"]} ${
        book.upcoming ? styles.upcomBook : ""
      }`}
      onClick={() => navigate(`/app/book/${book.bookid}`)}
    >
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.year}</td>
      <td>
        <div className={styles.flagContainer}>
          <div>{book.country}</div>
          <img
            src={bookCountry?.flags.svg}
            className={styles.smallFlag}
            alt="flag"
          />
        </div>
      </td>
      <td>{book.pages}</td>
      {currentView === "history" && <td>{book.rating}</td>}
    </tr>
  );
}

export function TableRowYear({ yearChange, book }) {
  return (
    <>
      <tr className={styles.yearRow}>
        <td>{yearChange}</td>
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
      <TableRow book={book} key={book.bookid} />
    </>
  );
}

export function SearchRow({ book }) {
  const navigate = useNavigate();

  return (
    <tr
      className={styles.historyBody}
      onClick={() => navigate(`/app/book/${book.bookid}`)}
    >
      <td>
        <img
          className={styles.smallPic}
          src={book.image_link}
          alt="book cover"
        />
      </td>
      <td className={styles.searchResultBig}>{book.title}</td>
      <td className={styles.searchResultSmall}>{book.author}</td>
    </tr>
  );
}
