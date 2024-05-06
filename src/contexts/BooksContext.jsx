import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import axios from "axios";

import { SITE_URL, CLASSIC_LIMIT, BOOK_API } from "../utils/config";
import { getSearchedBooks, AJAX, makeUniformedBook } from "../utils/helpers";
import { useAuth } from "./AuthContext.jsx";

const BooksContext = createContext();

const initialState = {
  books: [],
  bookToShow: undefined,
  loadingBooks: false,
  upcomingBook: undefined,
  searchResults: [],
  totalResults: 0,
  currentView: "modern",
  defaultStyle: "modern",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loadingBooks: true };
    case "search/started":
      return {
        ...state,
        loadingBooks: true,
        totalResults: 0,
        searchResults: [],
      };
    case "books/loaded": {
      // prettier-ignore
      const upcomingBook = action.payload.find((book) => book.upcoming === true);
      const defaultStyle =
        upcomingBook?.year < CLASSIC_LIMIT ? "modern" : "classic";
      return {
        ...state,
        loadingBooks: false,
        books: action.payload,
        upcomingBook,
        defaultStyle,
      };
    }
    case "book/loaded":
      return {
        ...state,
        bookToShow: action.payload,
        loadingBooks: false,
        currentView: "book",
      };
    case "book/rated":
      return {
        ...state,
        bookToShow: null,
        loadingBooks: false,
        upcomingBook: null,
      };
    case "book/next":
      return {
        ...state,
        upcomingBook: { ...state.bookToShow, upcoming: true },
        loadingBooks: false,
      };
    case "book/add":
      return {
        ...state,
        books: [...state.books, action.payload],
        loadingBooks: false,
      };
    case "book/remove":
      return {
        ...state,
        books: [
          ...state.books.filter(
            (book) => book.bookid !== state.bookToShow.bookid
          ),
        ],
        bookToShow: null,
        loadingBooks: false,
      };
    case "search/completed":
      if (action.payload.total === 0) return { ...state, loadingBooks: false };
      return {
        ...state,
        loadingBooks: false,
        currentView: "search",
        totalResults: action.payload.total,
        searchResults: action.payload.results,
      };
    case "changeView":
      return {
        ...state,
        currentView: action.payload,
        bookToShow: undefined,
      };
    case "rejected":
      return { ...state, loadingBooks: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function BooksProvider({ children }) {
  const [
    {
      books,
      bookToShow,
      loadingBooks,
      upcomingBook,
      currentView,
      searchResults,
      totalResults,
      defaultStyle,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { user, isLoggedIn } = useAuth();

  // 1) getting initial books
  useEffect(
    function () {
      async function getAllBooks() {
        if (!isLoggedIn || !user.id) return;
        dispatch({ type: "loading" });
        try {
          // geting all books for one user/club
          const res = await axios({
            method: "GET",
            url: `${SITE_URL}api/v1/books/all/${user.id}`,
          });
          if (res.data.status === "success") {
            dispatch({
              type: "books/loaded",
              payload: res.data.data.books.sort((a, b) => a.year - b.year),
            });
          }
        } catch {
          dispatch({
            type: "rejected",
            payload: "Error while fetching books data!",
          });
        }
      }
      getAllBooks();
    },
    [user, isLoggedIn]
  );

  // 2) Books from the search field
  async function searchBooks(title, page) {
    dispatch({ type: "search/started" });
    const searchResults = await getSearchedBooks(title, page);
    dispatch({ type: "search/completed", payload: searchResults });
  }

  // 3) Specific Book data is received. Also checking if it's already in the DB
  const showBook = useCallback(
    async function showBook(id) {
      if (bookToShow !== undefined) return;
      dispatch({ type: "loading" });
      try {
        // looking for the book in the DB:
        const bookInDb = books.find((book) => book.bookid === id);
        let bookFromApi;
        // if it's not in the DB - look in the web api
        if (bookInDb === undefined) {
          const response = await AJAX(`${BOOK_API}/${id}`);
          bookFromApi = makeUniformedBook(response);
        }
        dispatch({ type: "book/loaded", payload: bookInDb || bookFromApi });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Error while fetching book data!",
        });
      }
    },
    [bookToShow, books]
  );

  async function changeBookDocument(id, data) {
    await axios({
      method: "PATCH",
      url: `${SITE_URL}api/v1/books/${id}`,
      data,
    });
  }

  // Add new Book
  async function addBook(data) {
    dispatch({ type: "loading" });
    try {
      await axios({
        method: "POST",
        url: `${SITE_URL}api/v1/books`,
        data,
      });
      dispatch({ type: "book/add", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Error while adding new book!",
      });
    }
  }

  // Add meeting date
  async function addBookDate(meetingDate) {
    dispatch({ type: "loading" });
    try {
      const data = { meeting_date: meetingDate };
      await changeBookDocument(upcomingBook.bookid, data);
      dispatch({ type: "book/add", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Error while adding new book!",
      });
    }
  }

  // Rate Book
  async function rateBook(rating) {
    if (!upcomingBook) return;
    dispatch({ type: "loading" });
    try {
      const data = {
        read: true,
        rating,
        upcoming: false,
        meeting_date: upcomingBook.meeting_date
          ? upcomingBook.meeting_date
          : Date.now(),
      };
      await changeBookDocument(upcomingBook.bookid, data);
      dispatch({ type: "book/rated", payload: rating });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Error while rating book!",
      });
    }
  }

  // Choose Next Book
  async function nextBook() {
    if (!bookToShow || upcomingBook) return;
    dispatch({ type: "loading" });
    try {
      const data = { upcoming: true };
      await changeBookDocument(bookToShow.bookid, data);
      dispatch({ type: "book/next" });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Error while selecting next book!",
      });
    }
  }

  // Remove Book
  async function removeBook() {
    dispatch({ type: "loading" });
    try {
      await axios({
        method: "DELETE",
        url: `${SITE_URL}api/v1/books/${bookToShow._id}`,
      });
      dispatch({ type: "book/remove" });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Error while removing new book!",
      });
    }
  }

  const changeView = useCallback(function changeView(view) {
    dispatch({ type: "changeView", payload: view });
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        loadingBooks,
        bookToShow,
        upcomingBook,
        searchResults,
        totalResults,
        currentView,
        defaultStyle,
        error,
        showBook,
        rateBook,
        nextBook,
        addBook,
        addBookDate,
        removeBook,
        searchBooks,
        changeView,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

function useBooks() {
  const context = useContext(BooksContext);
  if (context === undefined)
    throw new Error("Books Context used outside of the provider");
  return context;
}

export { BooksProvider, useBooks };
