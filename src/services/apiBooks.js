import axios from "axios";
import { SERVER_URL, BOOK_API } from "../utils/config";

export async function getAllBooks(id) {
  //   console.log("getting books for", id);
  let books = [];
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
