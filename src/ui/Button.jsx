import styles from "./Button.module.css";

function Button({ children, onClick, type, disabled = false }) {
  return (
    <button onClick={onClick} className={`${styles[type]}`} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
