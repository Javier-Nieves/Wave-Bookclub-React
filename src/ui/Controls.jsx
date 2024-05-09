import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../contexts/BooksContext";
import { useViews } from "../contexts/ViewsContext";
import { RateBookBlock } from "./RateBookBlock";
import Button from "./Button";
import Dialog from "./Dialog";
import { Cover } from "./Cover";
import { Rating } from "./Rating";
import { AddForm } from "./AddForm";

import styles from "./Main.module.css";

export default function Controls() {
  const { bookToShow, upcomingBook, books, nextBook, removeBook } = useBooks();
  const { message, showMessage } = useViews();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const navigate = useNavigate();

  if (!bookToShow?.bookid) return;

  async function handleNextBook() {
    await nextBook();
    navigate("/app");
    !message && showMessage("Next book is selected", "good");
  }

  async function handleRemoveBook() {
    await removeBook();
    navigate("/app");
    !message && showMessage("Book is removed", "good");
  }

  // History view
  if (bookToShow.read)
    return (
      <>
        <Cover image={bookToShow.image_link} />
        {bookToShow.rating && <Rating rating={bookToShow.rating} />}
      </>
    );

  // Upcoming Book view
  if (bookToShow.upcoming)
    return (
      <div className={styles.controlGroup}>
        <Cover image={bookToShow.image_link} />
        <RateBookBlock />
      </div>
    );

  // Ordinary book view
  return (
    <>
      {dialogIsOpen && (
        <Dialog title="Book details:" onClick={() => setDialogIsOpen(false)}>
          <AddForm />
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
