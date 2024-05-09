import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useBooks } from "../contexts/BooksContext";
import { useViews } from "../contexts/ViewsContext";
import Button from "./Button";
import Dialog from "./Dialog";

import styles from "./Main.module.css";

export function RateBookBlock() {
  const { rateBook } = useBooks();
  const { message, showMessage } = useViews();
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
    !message && showMessage("Book is rated", "good");
  }

  return (
    <>
      <div>
        <div className={styles.upcomText}>Reading now</div>
        <Button type="pictureBtn" onClick={() => setDialogIsOpen(true)}>
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
            <Button type="brightBtn">Rate</Button>
          </form>
        </Dialog>
      )}
    </>
  );
}
