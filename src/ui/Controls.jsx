import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../contexts/BooksContext";
import { useCountries } from "../contexts/CountriesContext";
import { useAuth } from "../contexts/AuthContext.jsx";
import { RateBookBlock } from "./RateBookBlock";
import Button from "./Button";
import Dialog from "./Dialog";

import styles from "./Main.module.css";

export default function Controls() {
  const { bookToShow, upcomingBook, books, nextBook, addBook, removeBook } =
    useBooks();
  const { user } = useAuth();
  const { countries } = useCountries();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();
  const selectedCountry = countries.find((c) => c.name.common === country);

  if (!bookToShow) return;

  async function handleNextBook() {
    await nextBook();
    navigate("/app");
  }

  async function handleAddBook() {
    const newBook = { ...bookToShow, country, year, club: user.id };
    await addBook(newBook);
    navigate("/app");
  }

  async function handleRemoveBook() {
    await removeBook();
    navigate("/app");
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
              <Button type="addBtn">Add book</Button>
            </div>
          </form>
        </Dialog>
      )}
      <div className={styles.controlGroup}>
        <Cover image={bookToShow.image_link} />

        {books.some((b) => b === bookToShow) ? (
          <>
            <Button type="removeBtn" onClick={handleRemoveBook}>
              Remove from the reading list
            </Button>
            {!upcomingBook && (
              <Button type="nextBtn" onClick={handleNextBook}>
                Next
              </Button>
            )}
          </>
        ) : (
          <Button type="addBtn" onClick={() => setDialogIsOpen(true)}>
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
