import { createContext, useContext } from "react";

import styles from "./Tables.module.css";

const BookTableContext = createContext();

function BookTable({ section, children }) {
  return (
    <BookTableContext.Provider value={{ section }}>
      <table className={styles[`${section}Table`]}>{children}</table>
    </BookTableContext.Provider>
  );
}

function Header({ children }) {
  const { section } = useContext(BookTableContext);
  return (
    <thead>
      <tr className={styles[`${section}Head`]}>{children}</tr>
    </thead>
  );
}

function Body({ data, render }) {
  const { section } = useContext(BookTableContext);
  return (
    <tbody className={styles[`${section}Table`]}>{data.map(render)}</tbody>
  );
}

BookTable.Header = Header;
BookTable.Body = Body;

export default BookTable;
