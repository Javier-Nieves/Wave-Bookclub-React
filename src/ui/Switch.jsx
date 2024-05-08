import { NavLink, useNavigate } from "react-router-dom";

import styles from "./Switch.module.css";

export default function Switch({ section = undefined }) {
  const navigate = useNavigate();

  function handleChangeView(section) {
    navigate(section === "classic" ? "/app/modern" : "/app/classic");
  }
  return (
    <div className={styles.switchContainer}>
      {(section === "modern" || section === "classic") && (
        //* with images
        // <NavLink
        //   to={section === "classic" ? "/app/modern" : "/app/classic"}
        //   className="switch"
        //   style={{ backgroundImage: `url("/img/${section}.png")` }}
        // />

        //* with slider
        <>
          <span
            className={`${styles.switchText} ${
              section === "classic" ? styles.selected : ""
            }`}
            style={{ fontFamily: "var(--font-classic)" }}
          >
            Classic
          </span>
          <label className={styles.switch}>
            <input
              checked={section === "modern"}
              type="checkbox"
              onChange={() => handleChangeView(section)}
            />
            <span
              className={`${styles.slider} ${styles.round} ${styles.wColor}`}
              style={{
                backgroundColor:
                  section === "classic"
                    ? "var(--color-classic-even)"
                    : "var(--color-modern-even)",
              }}
            />
          </label>
          <span
            className={`${styles.switchText} ${
              section === "modern" ? styles.selected : ""
            }`}
            style={{ fontFamily: "var(--font-modern)" }}
          >
            Modern
          </span>
        </>
      )}

      {/* {section !== "classic" && section !== "modern" && (
        <img
          src={"/img/club2.png"}
          className={styles.historyWaveLogo}
          alt="wave-logo"
        />
      )} */}
    </div>
  );
}
