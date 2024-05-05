import { Outlet } from "react-router-dom";

import { useBooks } from "../Contexts/BooksContext";
import { useCountries } from "../Contexts/CountriesContext";

import Loader from "../Components/Loader";

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
