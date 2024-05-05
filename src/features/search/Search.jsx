import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useBooks } from "../../contexts/BooksContext";
// import { RES_PAGE } from "../../utils/config";

export default function Search() {
  const [titleToSearch, setTitleToSearch] = useState("");
  const { currentView, totalResults, searchBooks } = useBooks();
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
      <form className="search-form" onSubmit={searchHandler}>
        <input
          type="text"
          className="searchField"
          placeholder="Search for books"
          required
          value={titleToSearch}
          onChange={(e) => setTitleToSearch(e.target.value)}
          ref={searchInput}
        />
        <button className="searchBtn">Search</button>
      </form>
      {currentView === "search" && (
        <div className="flex-column" id="searchInfo">
          <div className="paginationText"> Total results: {totalResults}</div>
        </div>
      )}
    </div>
  );
}
