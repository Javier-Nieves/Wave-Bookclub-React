import { useState } from "react";
import { useForm } from "react-hook-form";
import { useViews } from "../contexts/ViewsContext";
import { useCountries } from "../contexts/CountriesContext";
import { useUpdateBook } from "../features/book/useUpdateBook";
import Button from "./Button";

import styles from "./EditBookForm.module.css";

function EditBookForm({ bookToEdit, setIsEditing }) {
  const [country, setCountry] = useState(bookToEdit.country);
  const { countries } = useCountries();
  const { changeBook } = useUpdateBook();
  const { showMessage } = useViews();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { ...bookToEdit },
  });

  const selectedCountry = countries.find((c) => c.name.common === country);

  function onSubmit(data) {
    // adding controlled field Country into the form data
    setValue("country", country);
    const { title, author, year, desc, pages } = data;
    data = { title, author, year, desc, pages, country };
    console.log(data);
    changeBook({ id: bookToEdit._id, data });
    showMessage("Book data is updated");
    setIsEditing(false);
  }

  return (
    <form
      className={styles.flex}
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.formRow}>
        <span className={styles.formText}>Title:</span>
        <input
          type="text"
          id="title"
          //   disabled={isWorking}
          {...register("title", { required: "This field is required" })}
        />
      </div>
      <div className={styles.formRow}>
        <span className={styles.formText}>Author:</span>
        <input
          type="text"
          id="author"
          //   disabled={isWorking}
          {...register("author", { required: "This field is required" })}
        />
      </div>

      <div className={styles.horRow}>
        <div className={styles.flex}>
          <span className={styles.formText}>Year:</span>
          <input
            type="text"
            id="year"
            //   disabled={isWorking}
            {...register("year", { required: "This field is required" })}
          />
        </div>

        <div className={styles.flex}>
          <span className={styles.formText}>
            {selectedCountry && (
              <span>
                <img
                  className={styles.tinyFlag}
                  src={selectedCountry.flags.svg}
                  alt={selectedCountry.flags.alt}
                />
              </span>
            )}
            Country:
          </span>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            list="countryList"
            placeholder="Country"
            // {...register("country", { required: "This field is required" })}
          />
          <datalist id="countryList">
            {countries.map((country) => (
              <option key={country.name.common}>{country.name.common}</option>
            ))}
          </datalist>
        </div>
      </div>

      <div className={styles.flex} style={{ width: "100%" }}>
        <span className={styles.formText}>Description:</span>
        <textarea
          type="text"
          className={styles.bookDesc}
          id="desc"
          //   disabled={isWorking}
          {...register("desc", { required: "This field is required" })}
        />
      </div>

      <Button type="brightBtn">Save changes</Button>
    </form>
  );
}

export default EditBookForm;
