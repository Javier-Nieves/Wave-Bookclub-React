import styles from "./NoContentYet.module.css";

function NoContentYet({ children }) {
  return (
    <div className={styles.noContentContainer}>
      <h1 className={styles.noContextText}>{children}</h1>
    </div>
  );
}

export default NoContentYet;
