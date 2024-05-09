import { useViews } from "../contexts/ViewsContext";

import styles from "./Message.module.css";

function Message(centered = false) {
  const { message } = useViews();

  return (
    <div
      className={`${styles.messageContainer} ${
        message?.text ? styles.active : ""
      }`}
      style={{
        backgroundColor:
          message?.style === "good" ? "var(--color-good)" : "var(--color-bad)",
        left: centered ? "calc(50vw - 250px)" : "calc(50vw - 180px)",
      }}
    >
      <div className={styles.message}>{message?.text}</div>
    </div>
  );
}

export default Message;
