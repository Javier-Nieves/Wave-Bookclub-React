import { useState } from "react";
import { useViews } from "../contexts/ViewsContext";
import { useCountries } from "../features/tables/useCountries";
import { useAddBook } from "../features/book/useAddBook";
import { useUser } from "../features/user/useUser";
import { useGetBook } from "../features/book/useGetBook";
import Button from "./Button";

import styles from "./Main.module.css";

export function AddForm() {
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");

  const { message, showMessage } = useViews();
  const { countries } = useCountries();
  const { bookToShow } = useGetBook();
  const { addBook } = useAddBook();
  const { user } = useUser();

  const selectedCountry = countries.find((c) => c.name.common === country);

  async function handleAddBook(e) {
    e.preventDefault();
    // check if country exist and year is ok
    // prettier-ignore
    if (countries.length && !countries.find((item) => item.name.common === country)) {
      !message && showMessage("Country name should be correct", "bad");
      return;
      }

    if (year < -3000 || year > new Date().getFullYear()) {
      !message && showMessage("No time travel please!", "bad");
      return;
    }

    // In case when Countries API is down - country will be 'Unknown'
    addBook({
      ...bookToShow,
      country: country || "Unknown",
      year,
      club: user._id,
    });
    !message && showMessage("New book is added", "good");
  }
  return (
    <form
      className={styles.modalFormAdd}
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => handleAddBook(e)}
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
        disabled={!countries.length}
        onChange={(e) => setCountry(e.target.value)}
        list="countryList"
        placeholder={countries.length ? `Country` : "Countries unavailable"}
        required={countries.length}
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
