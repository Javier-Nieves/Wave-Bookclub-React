import { useEffect, useState } from "react";
import { useCountries } from "../../contexts/CountriesContext";
import { useGetBook } from "./useGetBook";
import { CLASSIC_LIMIT } from "../../utils/config";
import { useViews } from "../../contexts/ViewsContext";
import EditBookForm from "../../ui/EditBookForm";
import Loader from "../../ui/Loader";
import Button from "../../ui/Button";
import Dialog from "../../ui/Dialog";

import styles from "./BookView.module.css";

export default function BookView() {
  const { currentView, changeView } = useViews();
  const { bookToShow, isLoading } = useGetBook();
  const [isEditing, setIsEditing] = useState(false);

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
    <>
      {isEditing && (
        <Dialog type="wide" onClick={() => setIsEditing(false)}>
          <EditBookForm bookToEdit={bookToShow} />
        </Dialog>
      )}
      <div className={styles.bookInfo}>
        <BookTitle bookToShow={bookToShow} />
        <BookStats bookToShow={bookToShow} setIsEditing={setIsEditing} />
        <BookDescription bookToShow={bookToShow} />
      </div>
    </>
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

function BookStats({ bookToShow, setIsEditing }) {
  const { countries } = useCountries();

  const bookCountry = countries.find(
    (c) => c.name.common === bookToShow.country
  );
  const bookStyle = bookToShow?.year < CLASSIC_LIMIT ? "classic" : "modern";
  return (
    <div className={styles.bookInfoTop}>
      {bookCountry?.flags.svg && (
        <img
          src={bookCountry.flags.svg}
          className={styles.medFlag}
          alt="flag"
        />
      )}
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
        {bookToShow.year && (
          <Button type="blackBtn" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </div>
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
