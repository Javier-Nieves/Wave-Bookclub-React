import styles from "./Dialog.module.css";

function Dialog({ title, children, onClick }) {
  return (
    <dialog open onClick={onClick}>
      <div className={styles.dialogContent}>
        <h2 className={styles.modalText}>{title}</h2>
        {children}
      </div>
    </dialog>
  );
}

export default Dialog;
