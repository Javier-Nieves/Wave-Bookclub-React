import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import axios from "axios";

import { SERVER_URL, BOOK_API } from "../utils/config";
import { getSearchedBooks, makeUniformedBook } from "../utils/helpers";
import { useAuth } from "./AuthContext.jsx";

const BooksContext = createContext();

const initialState = {
  books: [],
  bookToShow: undefined,
  loadingBooks: false,
  upcomingBook: undefined,
  searchResults: [],
  totalResults: 0,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loadingBooks: true };
    case "bookToShow/cleared":
      return { ...state, bookToShow: null };
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
      return {
        ...state,
        loadingBooks: false,
        books: action.payload,
        upcomingBook,
      };
    }
    case "book/loaded":
      return {
        ...state,
        bookToShow: action.payload,
        loadingBooks: false,
      };
    case "book/rated":
      return {
        ...state,
        books: state.books.map((item) =>
          item.bookid === state.upcomingBook.bookid
            ? {
                ...item,
                rating: Number(action.payload.rating),
                meeting_date: action.payload.meeting_date,
                read: true,
                upcoming: false,
              }
            : item
        ),
        bookToShow: null,
        loadingBooks: false,
        upcomingBook: null,
      };
    case "book/next":
      return {
        ...state,
        books: state.books.map((item) =>
          item.bookid === state.bookToShow.bookid
            ? { ...item, upcoming: true }
            : item
        ),
        upcomingBook: { ...state.bookToShow, upcoming: true },
        loadingBooks: false,
        bookToShow: null,
      };
    case "book/add":
      return {
        ...state,
        books: [...state.books, action.payload],
        loadingBooks: false,
      };
    case "book/meetingDateChanged":
      return {
        ...state,
        upcomingBook: {
          ...state.upcomingBook,
          meeting_date: action.payload.meeting_date,
        },
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
        totalResults: action.payload.total,
        searchResults: action.payload.results,
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
      // currentView,
      searchResults,
      totalResults,
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
            url: `${SERVER_URL}api/v1/books/all/${user.id}`,
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
      if (bookToShow) return;
      dispatch({ type: "loading" });
      try {
        // looking for the book in the DB:
        const bookInDb = books.find((book) => book.bookid === id);
        let bookFromApi;
        // if it's not in the DB - look in the web api
        if (bookInDb === undefined) {
          const response = await fetch(`${BOOK_API}/${id}`);
          const data = await response.json();
          bookFromApi = makeUniformedBook(data);
        }
        dispatch({ type: "book/loaded", payload: bookInDb || bookFromApi });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Error while fetching book data!",
        });
      }
    },
    [books, bookToShow]
  );

  // Change existing Book document
  async function changeBookDocument(id, data) {
    if (!user.id) return;
    dispatch({ type: "loading" });
    try {
      data = { ...data, club: user.id };
      await axios({
        method: "PATCH",
        url: `${SERVER_URL}api/v1/books/${id}`,
        data,
      });
      dispatch({ type: "book/meetingDateChanged", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Error while changing book data!",
      });
    }
  }

  // Add new Book
  async function addBook(data) {
    if (!user.id) return;
    data = { ...data, club: user.id };
    dispatch({ type: "loading" });
    try {
      const reply = await axios({
        method: "POST",
        url: `${SERVER_URL}api/v1/books`,
        data,
      });
      dispatch({ type: "book/add", payload: reply.data.data.newBook });
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
      const data = { club: user._id, meeting_date: meetingDate };
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
    const meeting_date = upcomingBook.meeting_date
      ? upcomingBook.meeting_date
      : new Date().toISOString();
    try {
      const data = {
        upcoming: false,
        read: true,
        rating,
        meeting_date,
      };
      await changeBookDocument(upcomingBook.bookid, data);
      dispatch({ type: "book/rated", payload: { rating, meeting_date } });
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
        url: `${SERVER_URL}api/v1/books/${bookToShow._id}`,
      });
      dispatch({ type: "book/remove" });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Error while removing new book!",
      });
    }
  }

  // Clear bookToShow
  function clearBookToShow() {
    if (!bookToShow) return;
    dispatch({ type: "bookToShow/cleared" });
  }

  return (
    <BooksContext.Provider
      value={{
        books,
        loadingBooks,
        bookToShow,
        upcomingBook,
        searchResults,
        totalResults,
        error,
        showBook,
        rateBook,
        nextBook,
        addBook,
        addBookDate,
        removeBook,
        clearBookToShow,
        searchBooks,
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
