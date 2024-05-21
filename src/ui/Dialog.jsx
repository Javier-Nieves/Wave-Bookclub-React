import styles from "./Dialog.module.css";

function Dialog({ type, title, children, onClick }) {
  return (
    <dialog open onClick={onClick}>
      <div
        className={`${styles.dialogContent} ${styles[type]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.modalText}>{title}</h2>
        {children}
      </div>
    </dialog>
  );
}

export default Dialog;
