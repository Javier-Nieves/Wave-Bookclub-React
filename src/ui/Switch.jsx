import { NavLink, useNavigate } from "react-router-dom";

import styles from "./Switch.module.css";

export default function Switch({ period = undefined }) {
  const navigate = useNavigate();

  function handleChangeView(period) {
    navigate(period === "classic" ? "/app/modern" : "/app/classic");
  }
  return (
    <div className={styles.switchContainer}>
      {(period === "modern" || period === "classic") && (
        //* with images
        // <NavLink
        //   to={period === "classic" ? "/app/modern" : "/app/classic"}
        //   className="switch"
        //   style={{ backgroundImage: `url("/img/${period}.png")` }}
        // />

        //* with slider
        <>
          <span
            className={`${styles.switchText} ${
              period === "classic" ? styles.selected : ""
            }`}
            style={{ fontFamily: "var(--font-classic)" }}
          >
            Classic
          </span>
          <label className={styles.switch}>
            <input
              checked={period === "modern"}
              type="checkbox"
              onChange={() => handleChangeView(period)}
            />
            <span
              className={`${styles.slider} ${styles.round} ${styles.wColor}`}
              style={{
                backgroundColor:
                  period === "classic"
                    ? "var(--color-classic-even)"
                    : "var(--color-modern-even)",
              }}
            />
          </label>
          <span
            className={`${styles.switchText} ${
              period === "modern" ? styles.selected : ""
            }`}
            style={{ fontFamily: "var(--font-modern)" }}
          >
            Modern
          </span>
        </>
      )}

      {/* {period !== "classic" && period !== "modern" && (
        <img
          src={"/img/club2.png"}
          className={styles.historyWaveLogo}
          alt="wave-logo"
        />
      )} */}
    </div>
  );
}
