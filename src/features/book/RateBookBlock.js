import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useBooks } from "../Contexts/BooksContext";
import Button from "./Button";
import styles from "./Main.module.css";
import Dialog from "./Dialog";

export function RateBookBlock() {
  const { rateBook } = useBooks();
  const [dialogIsopen, setDialogIsOpen] = useState(false);
  const [rating, setRating] = useState("");
  const navigate = useNavigate();

  function handleClick(e) {
    // don't close dialog when form is clicked
    e.stopPropagation();
  }

  async function handleRateBook(e) {
    e.preventDefault();
    await rateBook(rating);
    setDialogIsOpen(false);
    navigate("/app");
  }

  return (
    <>
      <div>
        <div className={styles.upcomText}>Reading now</div>
        <Button type="rateBtn" onClick={() => setDialogIsOpen(true)}>
          Rate
        </Button>
      </div>
      {dialogIsopen && (
        <Dialog
          title={"How good was this book?"}
          onClick={() => setDialogIsOpen(false)}
        >
          <form
            className={styles.modalFormRate}
            onSubmit={handleRateBook}
            onClick={handleClick}
          >
            <input
              type="number"
              className={styles.rateField}
              placeholder="Rating"
              min="1"
              max="10"
              step="0.1"
              required
              onChange={(e) => setRating(e.target.value)}
              value={rating}
            />
            <Button type="searchBtn">Rate</Button>
          </form>
        </Dialog>
      )}
    </>
  );
}
