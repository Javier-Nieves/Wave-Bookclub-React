import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useViews } from "../../contexts/ViewsContext";
import { useSearch } from "./useSearch";
// import { RES_PAGE } from "../../utils/config";

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

  // TODO! :
  setTimeout(() => {
    showSearchResults(searchResults);
  }, 500);

  useEffect(function () {
    function callback(e) {
      if (document.activeElement === searchInput.current) return;
      if (e.code === "Enter") {
        searchInput.current.focus();
        searchInput.current.value = "";
      }
    }
    document.addEventListener("keydown", callback);
    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, []);

  // TODO: correct, strange behavior. Navigate back if searchResults are none
  useEffect(
    function () {
      if (currentView === "search" && totalResults === 0) {
        navigate("/app");
        showMessage(`Can't find book with ${titleToSearch} title`, "bad");
        setTitleToSearch("");
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
          <div className={styles.SearchInfoText}>
            Total results: {totalResults}
          </div>
        </div>
      )}
    </div>
  );
}
