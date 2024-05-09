import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import { useBooks } from "../../contexts/BooksContext";
import { useViews } from "../../contexts/ViewsContext";
// import { RES_PAGE } from "../../utils/config";

import styles from "./Search.module.css";

export default function Search() {
  const [titleToSearch, setTitleToSearch] = useState("");
  const { totalResults, searchBooks } = useBooks();
  const { currentView } = useViews();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const searchInput = useRef(null);

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

  // navigate back if searchResults are none
  useEffect(
    function () {
      if (currentView === "search" && totalResults === 0) {
        navigate("/app");
        setTitleToSearch("");
      }
    },
    [totalResults, currentView, navigate]
  );

  async function searchHandler(e) {
    e.preventDefault();
    if (titleToSearch) await searchBooks(titleToSearch, page);
    currentView !== "search" && setTitleToSearch("");
    navigate("/app/search");
  }

  return (
    <div id="search-field-container">
      <form className={styles.searchForm} onSubmit={searchHandler}>
        <input
          type="text"
          placeholder="Search for books"
          required
          value={titleToSearch}
          onChange={(e) => setTitleToSearch(e.target.value)}
          ref={searchInput}
        />
        <Button type="greyBtn">Search</Button>
      </form>
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
