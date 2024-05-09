import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../contexts/BooksContext";
import { useViews } from "../contexts/ViewsContext";
import { useCountries } from "../contexts/CountriesContext";
import { RateBookBlock } from "./RateBookBlock";
import Button from "./Button";
import Dialog from "./Dialog";

import styles from "./Main.module.css";

export default function Controls() {
  const { bookToShow, upcomingBook, books, nextBook, addBook, removeBook } =
    useBooks();
  const { message, showMessage } = useViews();
  const { countries } = useCountries();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();
  const selectedCountry = countries.find((c) => c.name.common === country);

  if (!bookToShow?.bookid) return;

  async function handleNextBook() {
    await nextBook();
    navigate("/app");
    !message && showMessage("Next book is selected", "good");
  }

  async function handleAddBook(e) {
    e.preventDefault();
    // check if country exist and year is ok
    if (!countries.find((item) => item.name.common === country)) {
      !message && showMessage("Country name should be correct", "bad");
      return;
    }
    if (year < -3000 || year > new Date().getFullYear()) {
      !message && showMessage("No time travel please!", "bad");
      return;
    }

    const newBook = { ...bookToShow, country, year };
    await addBook(newBook);
    navigate("/app");
    !message && showMessage("New book is added", "good");
  }

  async function handleRemoveBook() {
    await removeBook();
    navigate("/app");
    !message && showMessage("Book is removed", "good");
  }

  if (bookToShow.read)
    return (
      <>
        <Cover image={bookToShow.image_link} />
        {bookToShow.rating && <Rating rating={bookToShow.rating} />}
      </>
    );
  if (bookToShow.upcoming)
    return (
      <div className={styles.controlGroup}>
        <Cover image={bookToShow.image_link} />
        <RateBookBlock />
      </div>
    );

  return (
    <>
      {dialogIsOpen && (
        <Dialog title="Book details:" onClick={() => setDialogIsOpen(false)}>
          <form
            className={styles.modalFormAdd}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAddBook}
          >
            <input
              type="number"
              className={styles.searchField}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Year of publication"
              required
            />

            <input
              type="text"
              className={styles.searchField}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              list="countryList"
              placeholder="Country"
              required
            />

            <datalist id="countryList">
              {countries.map((country) => (
                <option key={country.name.common}>{country.name.common}</option>
              ))}
            </datalist>
            <div className={styles.countryContainer}>
              {selectedCountry && (
                <img
                  className={styles.flag}
                  src={selectedCountry.flags.svg}
                  alt={selectedCountry.flags.alt}
                />
              )}
              <Button type="blackBtn">Add book</Button>
            </div>
          </form>
        </Dialog>
      )}
      <div className={styles.controlGroup}>
        <Cover image={bookToShow.image_link} />

        {books.some((b) => b === bookToShow) ? (
          <>
            <Button type="greyBtn" onClick={handleRemoveBook}>
              Remove from the reading list
            </Button>
            {!upcomingBook && (
              <Button type="pictureBtn" onClick={handleNextBook}>
                Next
              </Button>
            )}
          </>
        ) : (
          <Button type="greyBtn" onClick={() => setDialogIsOpen(true)}>
            To the Reading List
          </Button>
        )}
      </div>
    </>
  );
}

function Cover({ image }) {
  return (
    <img
      className={styles.viewImage}
      src={image || "/img/club2.png"}
      alt="Book Cover"
      loading="lazy"
    />
  );
}

function Rating({ rating }) {
  return (
    <>
      <div className={styles.upcomText}>Club&apos;s rating:</div>
      <button className={styles.viewRating}>{rating}</button>
    </>
  );
}
