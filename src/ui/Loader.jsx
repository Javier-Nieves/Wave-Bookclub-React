import styles from "./Loader.module.css";

export default function Loader({ name = "loadScreenGif" }) {
  return (
    <div className={styles.loaderContainer}>
      <img
        className={styles[name]}
        src="/img/gif4.gif"
        alt="book is loading..."
      />
    </div>
  );
}
