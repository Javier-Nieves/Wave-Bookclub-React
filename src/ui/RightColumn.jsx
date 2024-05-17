import { Outlet } from "react-router-dom";

import { useLibrary } from "../features/book/useLibrary";
import { useCountries } from "../contexts/CountriesContext";

import Loader from "./Loader";

import styles from "./Main.module.css";

export default function RightColumn() {
  const { isLoading } = useLibrary();
  const { loadingCountries } = useCountries();

  const isWorking = isLoading || loadingCountries;

  return (
    <div className={styles.mainRightPart}>
      {isWorking && <Loader />}
      {!isWorking && <Outlet />}
    </div>
  );
}
