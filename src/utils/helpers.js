import { TIMEOUT_SEC, RES_PAGE, BOOK_API } from "./config.js";

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
// export async function getBook(id) {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const response = await AJAX(`${BOOK_API}/${id}`);
//     const result = makeUniformedBook(response);
//     return result;
//   } catch (err) {
//     throw err;
//   }
// }

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
