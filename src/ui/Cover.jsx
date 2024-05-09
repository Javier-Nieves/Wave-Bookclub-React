import styles from "./Main.module.css";

export function Cover({ image }) {
  return (
    <div className={styles.coverFrame}>
      <img
        className={styles.viewImage}
        src={image || "/img/club2.png"}
        alt="Book Cover"
      />
    </div>
  );
}
