import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";

import { useViews } from "../../contexts/ViewsContext";
import { useSearch } from "./useSearch";
import { RES_PAGE } from "../../utils/config";

import styles from "./Search.module.css";

export default function Search() {
  const [titleToSearch, setTitleToSearch] = useState("");
  const [page, setPage] = useState(1);
  const searchInput = useRef(null);

  const { currentView, showMessage, showSearchResults } = useViews();
  const navigate = useNavigate();

  // activate search on each title change
  const { searchResults, totalResults, isSearching } = useSearch(
    titleToSearch,
    page
  );

  // time to let the page render before rendering results
  setTimeout(() => {
    showSearchResults(searchResults);
  }, 200);

  // on Enter push - focus title input. Of go to search
  useEffect(
    function () {
      function callback(e) {
        if (
          document.activeElement === searchInput.current &&
          titleToSearch !== ""
        ) {
          if (e.code === "Enter") navigate("/app/search");
          return;
        }
        if (e.code === "Enter") {
          searchInput.current.focus();
          searchInput.current.value = "";
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [navigate, titleToSearch]
  );

  useEffect(
    function () {
      if (currentView === "search" && (totalResults === 0 || !totalResults)) {
        navigate("/app");
        showMessage(`Can't find book with ${titleToSearch} title`, "bad");
        // setTitleToSearch("");
      }
    },
    [totalResults, currentView, navigate, showMessage, titleToSearch]
  );

  function handleChangeTitle(e) {
    setTitleToSearch(e.target.value);
    if (currentView !== "search" && e.target.value !== "")
      navigate("/app/search");
    if (currentView === "search" && e.target.value === "") navigate("/app");
  }

  function incPage() {
    if (page < Math.ceil(totalResults / RES_PAGE)) setPage((p) => p + 1);
  }
  function decPage() {
    if (page > 1) setPage((p) => p - 1);
  }

  return (
    <div id="search-field-container">
      <input
        type="text"
        placeholder="Search for books"
        required
        value={titleToSearch}
        onChange={(e) => handleChangeTitle(e)}
        ref={searchInput}
      />
      {currentView === "search" && (
        <div>
          <>
            <div className={styles.SearchInfoText}>
              Total results: {totalResults}
            </div>
            <div className={styles.SearchInfoText} style={{ margin: "15px " }}>
              Page:
            </div>
            <div className={styles.searchNavContainer}>
              <button className={styles.searchNavBtn} onClick={() => decPage()}>
                <FaLongArrowAltLeft />
              </button>
              <span className={styles.searchNavText}>
                {isSearching
                  ? page
                  : `${page} / ${Math.ceil(totalResults / RES_PAGE)}`}
              </span>
              <button className={styles.searchNavBtn} onClick={() => incPage()}>
                <FaLongArrowAltRight />
              </button>
            </div>
          </>
        </div>
      )}
    </div>
  );
}
