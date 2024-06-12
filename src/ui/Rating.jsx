import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "./Button";
import Dialog from "./Dialog";
import DeleteForm from "./DeleteForm";

import styles from "./Main.module.css";

export function Rating({ rating }) {
  const [dialogIsOpen, setDialogIsOpen] = useState();

  return (
    <>
      {dialogIsOpen && (
        <Dialog
          title="You're about to delete this book and it's data from your history. This action is irreversable!"
          onClick={() => setDialogIsOpen(false)}
        >
          <DeleteForm setDialogIsOpen={setDialogIsOpen} />
        </Dialog>
      )}

      <div className={styles.historyControls}>
        <div>
          <div className={styles.upcomText}>Club&apos;s rating:</div>
          <button className={styles.viewRating}>{rating}</button>
        </div>
        <Button type="redBtn" onClick={() => setDialogIsOpen(true)}>
          <FaRegTrashAlt />
        </Button>
      </div>
    </>
  );
}
