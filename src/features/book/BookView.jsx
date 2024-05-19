import { useEffect } from "react";
import { useGetBook } from "./useGetBook";
import { CLASSIC_LIMIT } from "../../utils/config";
import { useViews } from "../../contexts/ViewsContext";
import Loader from "../../ui/Loader";

import styles from "./BookView.module.css";

export default function BookView() {
  const { currentView, changeView } = useViews();
  const { bookToShow, isLoading } = useGetBook();

  useEffect(
    function () {
      currentView !== "book" && changeView("book");
    },
    [changeView, currentView]
  );

  // changing tab title
  useEffect(
    function () {
      if (!bookToShow) return;
      document.title = "Wave bookclub | " + bookToShow.title;
      // cleanup function
      return function () {
        document.title = "Wave bookclub";
      };
    },
    [bookToShow]
  );

  if (isLoading || !bookToShow) return <Loader />;

  if (!bookToShow?.bookid)
    return <h1 className={styles.noBook}>No such book</h1>;

  return (
    <div className={styles.bookInfo}>
      <BookTitle bookToShow={bookToShow} />
      <BookStats bookToShow={bookToShow} />
      <BookDescription bookToShow={bookToShow} />
    </div>
  );
}

function BookTitle({ bookToShow }) {
  const bookStyle = bookToShow?.year < CLASSIC_LIMIT ? "classic" : "modern";
  return (
    <h1
      className={styles.viewTitle}
      style={{ fontFamily: `var(--font-${bookStyle})` }}
    >
      {bookToShow.title}
    </h1>
  );
}

function BookStats({ bookToShow }) {
  const bookStyle = bookToShow?.year < CLASSIC_LIMIT ? "classic" : "modern";
  return (
    <div className={styles.bookInfoTop}>
      <h2
        className={styles.viewAuthor}
        style={{ fontFamily: `var(--font-${bookStyle})` }}
      >
        {bookToShow.author}
        {bookToShow.year ? `, ${bookToShow.year}` : ""}
      </h2>
      <div
        className={styles.bookInfoTop}
        style={{ fontFamily: `var(--font-${bookStyle})` }}
      >
        <div
          className={styles.viewPages}
          style={{ fontFamily: `var(--font-${bookStyle})` }}
        >
          Pages: {bookToShow.pages}
        </div>
      </div>
      {/* <button className="edit-btn">Edit</button>
      <button className="save-btn">Save</button> */}
    </div>
  );
}

function BookDescription({ bookToShow }) {
  const bookStyle = bookToShow?.year < CLASSIC_LIMIT ? "classic" : "modern";
  // a way to show HTML code not as a string
  return (
    <div
      className={styles.viewDesc}
      style={{ fontFamily: `var(--font-${bookStyle})` }}
      dangerouslySetInnerHTML={{ __html: bookToShow.desc }}
    />
  );
}
