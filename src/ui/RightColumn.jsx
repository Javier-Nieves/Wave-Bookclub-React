import { Outlet } from "react-router-dom";

import { useBooks } from "../contexts/BooksContext";
import { useCountries } from "../contexts/CountriesContext";

import Loader from "./Loader";

import styles from "./Main.module.css";

export default function RightColumn() {
  const { loadingBooks } = useBooks();
  const { loadingCountries } = useCountries();

  return (
    <div className={styles.mainRightPart}>
      {(loadingBooks || loadingCountries) && <Loader />}
      {!loadingBooks && !loadingCountries && <Outlet />}
    </div>
  );
}
