import axios from "axios";
import { SERVER_URL, BOOK_API } from "../utils/config";
import { getSearchedBooks, makeUniformedBook } from "../utils/helpers";
import { useLibrary } from "../features/book/useLibrary";

export async function getAllBooks(id) {
  //   console.log("getting books for", id);
  let books = [];
  if (id === undefined) return books;

  try {
    // geting all books for one user/club
    const res = await axios({
      method: "GET",
      url: `${SERVER_URL}api/v1/books/all/${id}`,
    });
    if (res.data.status === "success") {
      books = res.data.data.books.sort((a, b) => a.year - b.year);
    }
  } catch (err) {
    console.error(err);
  }
  return books;
}

export async function getBook(books = [], id) {
  if (id === undefined) return {};

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
    // dispatch({ type: "book/loaded", payload: bookInDb || bookFromApi });
    return bookInDb || bookFromApi;
  } catch {
    return {};
  }
}

export async function addBook(data) {
  console.log("API call", data);
  if (!data || !data.club || !data.country || !data.year) return;

  try {
    const reply = await axios({
      method: "POST",
      url: `${SERVER_URL}api/v1/books`,
      data,
    });
    return reply;
  } catch {
    return {};
  }
}
