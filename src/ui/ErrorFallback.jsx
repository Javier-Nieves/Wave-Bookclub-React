import styles from "../pages/Pages.module.css";
import Button from "./Button";

export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <main className={styles.homepage}>
      <h1 className={styles.loginTitle}>Something went Wrong</h1>
      <h2 className={styles.errorMessage}>{error.message}</h2>
      <Button
        type="blackBtn"
        className={styles.backLink}
        onClick={resetErrorBoundary}
      >
        Try Again
      </Button>
    </main>
  );
}
