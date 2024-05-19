import { useNavigate } from "react-router-dom";
import { useRemoveBook } from "../features/book/useRemoveBook";
import { useViews } from "../contexts/ViewsContext";
import Button from "./Button";

import styles from "./Main.module.css";

function DeleteForm({ setDialogIsOpen }) {
  const { removeBook } = useRemoveBook();
  const { message, showMessage } = useViews();
  const navigate = useNavigate();

  function handleCancel(e) {
    e.preventDefault();
    setDialogIsOpen(false);
  }
  async function handleHistDelete(e) {
    e.preventDefault();
    await removeBook();
    navigate("/app");
    !message && showMessage("Book is removed from history", "good");
  }

  return (
    <form
      className={styles.modalFormAdd}
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleHistDelete}
    >
      <div className={styles.btnContainer}>
        <Button type="greyBtn" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="redBtn">Delete</Button>
      </div>
    </form>
  );
}

export default DeleteForm;
