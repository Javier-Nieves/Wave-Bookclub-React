import axios from "axios";
import { SERVER_URL, BOOK_API, RES_PAGE } from "../utils/config";
import { makeUniformedBook, makeUniformedList } from "../utils/helpers";

export async function getAllBooks(id) {
  console.log("getting books for", id);
  // id - is userId. function returns all the books for this user
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
    console.error("Error getting books", err);
  }
  return books;
}

export async function getBook(books = [], id) {
  if (id === undefined) return {};
  try {
    // looking for the book in the DB:
    let responseBook = books.find((book) => book.bookid === id);
    // if it's not in the DB - look in the web api
    if (responseBook === undefined) {
      const response = await fetch(`${BOOK_API}/${id}`);
      const data = await response.json();
      responseBook = makeUniformedBook(data);
    }
    return responseBook;
  } catch (err) {
    console.error("Error getting one book", err);
    return {};
  }
}

export async function addBook(data) {
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

export async function removeBook(id) {
  if (!id) return;
  try {
    await axios({
      method: "DELETE",
      url: `${SERVER_URL}api/v1/books/${id}`,
    });
  } catch (err) {
    console.error("Error removing book", err);
  }
}

export async function changeBook({ id, type, data }) {
  // can update: 1) meeting-date 2) upcoming status 3) rate book
  if (!id || !type) return;

  if (type === "Next") data = { upcoming: true };

  if (type === "Date") data = { meeting_date: data.meetingDate };

  if (type === "Rate") {
    data = {
      upcoming: false,
      read: true,
      rating: data.rating,
      meeting_date: data.meetingDate,
    };
  }

  try {
    await axios({
      method: "PATCH",
      url: `${SERVER_URL}api/v1/books/${id}`,
      data,
    });
  } catch (err) {
    console.error("Error updating book", err);
  }
}

export async function searchBooks(title, page) {
  //   console.log("looking for", title);
  try {
    // todo - if title contains several words - data is strange in pagination somehow
    // prettier-ignore
    const response = await fetch(`${BOOK_API}?q=+intitle:${title}&startIndex=${(+page - 1) * +RES_PAGE}&maxResults=${RES_PAGE}`);
    const result = await response.json();
    const searchResults = makeUniformedList(result);
    const totalResults = result.totalItems;
    // console.log("API:", searchResults);
    return { searchResults, totalResults };
  } catch (err) {
    console.log("Error searching books", err);
  }
  return {};
}
