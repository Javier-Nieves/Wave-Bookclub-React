import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../contexts/BooksContext";
import { useViews } from "../contexts/ViewsContext";
import { useCountries } from "../contexts/CountriesContext";
import Button from "./Button";
import styles from "./Main.module.css";

export function AddForm() {
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const { bookToShow, addBook } = useBooks();
  const { message, showMessage } = useViews();
  const { countries } = useCountries();
  const navigate = useNavigate();

  const selectedCountry = countries.find((c) => c.name.common === country);

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
  return (
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
  );
}
