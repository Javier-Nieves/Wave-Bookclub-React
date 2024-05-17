import { useEffect, useState } from "react";
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
import { useLibrary } from "../features/book/useLibrary";

export default function Controls() {
  const { books } = useLibrary();
  const { bookToShow, upcomingBook, nextBook, removeBook } = useBooks();
  const { message, showMessage } = useViews();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const navigate = useNavigate();

  const [activeBook, setActiveBook] = useState(bookToShow);

  useEffect(
    function () {
      setActiveBook(
        books?.find((item) => item._id === bookToShow?._id) || bookToShow
      );
    },
    [books, bookToShow]
  );

  if (!activeBook?.bookid) return;

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
  if (activeBook.read)
    return (
      <>
        <Cover image={activeBook.image_link} />
        {activeBook.rating && <Rating rating={activeBook.rating} />}
      </>
    );

  // Upcoming Book view
  if (activeBook.upcoming)
    return (
      <div className={styles.controlGroup}>
        <Cover image={activeBook.image_link} />
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
        <Cover image={activeBook.image_link} />

        {books.some((b) => b === activeBook) ? (
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
