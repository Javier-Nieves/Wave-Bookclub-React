import axios from "axios";
import { TIMEOUT_SEC, RES_PAGE, BOOK_API } from "./config.js";
import { SERVER_URL } from "./config";

// import { mockBooks } from "./booklist.js";
const mockBooks = [];

const testBook = {
  bookid: "jzSOEAAAQBAJ",
  title: "Tomorrow, and Tomorrow, and Tomorrow",
  author: "Gabrielle Zevin",
  country: "USA",
  pages: 416,
  desc: '<b><i>NEW YORK TIMES </i>BEST SELLER <b>• </b>In this exhilarating novel by the best-selling author of <i>The Storied Life of A. J. Fikry</i> two friends—often in love, but never lovers—come together as creative partners in the world of video game design, where success brings them fame, joy, tragedy, duplicity, and, ultimately, a kind of immortality.</b><br><br><b>"Utterly brilliant. In this sweeping, gorgeously written novel, Gabrielle Zevin charts the beauty, tenacity, and fragility of human love and creativity.... One of the best books I\'ve ever read." —John Green</b><br> &nbsp;<br> On a bitter-cold day, in the December of his junior year at Harvard, Sam Masur exits a subway car and sees, amid the hordes of people waiting on the platform, Sadie Green. He calls her name. For a moment, she pretends she hasn’t heard him, but then, she turns, and a game begins: a legendary collaboration that will launch them to stardom. These friends, intimates since childhood, borrow money, beg favors, and, before even graduating college, they have created their first blockbuster,<i> Ichigo</i>. Overnight, the world is theirs. Not even twenty-five years old, Sam and Sadie are brilliant, successful, and rich, but these qualities won’t protect them from their own creative ambitions or the betrayals of their hearts.<br> &nbsp;<br> Spanning thirty years, from Cambridge, Massachusetts, to Venice Beach, California, and lands in between and far beyond, Gabrielle Zevin’s <i>Tomorrow, and Tomorrow, and Tomorrow</i> is a dazzling and intricately imagined novel that examines the multifarious nature of identity, disability, failure, the redemptive possibilities in play, and above all, our need to connect: to be loved and to love. Yes, it is a love story, but it is not one you have read before.',
  image_link:
    "http://books.google.com/books/publisher/content?id=jzSOEAAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73HhQWbcUr7d0XJMwLo8-t6GnulzCfbHrwdz5Za27qyyUs4365YJUz84_W2UaIXtlEcreI_BRKmFmMUPRkudDc6mi_-0o4c71VjGd9DoMxA5tkd236VLInu7g2a9tDKt5VbyIKb&source=gbs_api",
  year: 2022,
  read: true,
  upcoming: false,
  rating: 8.6,
  meeting_date: "2023-07-02",
  club: "661811ec3e5fae3ac2c84b4d",
};

function changeMockBooks() {
  const newBooks = mockBooks.map((book) => {
    return { ...book, club: "661811ec3e5fae3ac2c84b4d" };
  });
  console.log(newBooks);
}

async function fillDb() {
  // with many books
  mockBooks.forEach(async (data) => {
    await axios({
      method: "POST",
      url: `${SERVER_URL}api/v1/books`,
      data,
    });
  });
  // with one book
  // const data = testBook;
  // await axios({
  //   method: "POST",
  //   url: `${SITE_URL}api/v1/books`,
  //   data,
  // });
}
// fillDb();

export const classicLimit = new Date().getFullYear() - 50;

export async function getSearchedBooks(title, page) {
  // eslint-disable-next-line no-useless-catch
  try {
    // todo - if title contains several words - data is strange in pagination somehow
    // prettier-ignore
    const response = await AJAX(`${BOOK_API}?q=+intitle:${title}&startIndex=${(+page - 1) * +RES_PAGE}&maxResults=${RES_PAGE}`);
    const results = makeUniformedList(response);
    const total = response.totalItems;
    return { results, total };
  } catch (err) {
    throw err;
  }
}
export async function getBook(id) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await AJAX(`${BOOK_API}/${id}`);
    const result = makeUniformedBook(response);
    return result;
  } catch (err) {
    throw err;
  }
}

export async function AJAX(url, uploadData = undefined, method = "GET") {
  // eslint-disable-next-line no-useless-catch
  try {
    let fetchPro;
    if (uploadData) {
      if (method === "POST" || method === "PUT")
        fetchPro = fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(uploadData),
        });
    } else fetchPro = fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    //   if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (err) {
    throw err;
  }
}

function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}

function makeUniformedList(data) {
  return data.items?.map((item) => ({
    bookid: item?.id,
    title: item.volumeInfo?.title,
    author: item.volumeInfo?.authors?.[0] || "-",
    desc: item.volumeInfo?.description,
    image_link: item.volumeInfo?.imageLinks?.smallThumbnail || "img/club2.png",
    pages: item.volumeInfo?.pageCount,
    read: false,
    upcoming: false,
    rating: null,
    meeting_date: null,
  }));
}

export function makeUniformedBook(item) {
  return {
    bookid: item?.id,
    title: item.volumeInfo?.title,
    author: item.volumeInfo?.authors?.[0] || "-",
    desc: item.volumeInfo?.description,
    image_link: item.volumeInfo?.imageLinks?.smallThumbnail || "img/club2.png",
    pages: item.volumeInfo?.pageCount,
    read: false,
    upcoming: false,
    rating: null,
    meeting_date: null,
  };
}
