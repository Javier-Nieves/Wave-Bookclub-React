export const classicLimit = new Date().getFullYear() - 50;

export function makeUniformedList(data) {
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

export const exampleBook = {
  _id: "663b3e2230290d75584d28fc",
  bookid: "mztbEAAAQBAJ",
  club: ["6638d7ca88f4966ab6ec77e6"],
  title: "La Regenta",
  author: "Leopoldo Alas «Clarín»",
  country: "Spain",
  pages: 1233,
  desc: "«Finalidad: la verdad de lo real, tal como es»: el ideario de Clarín como crítico literario hubo de traspasarse a la novela cuando decidió dar su primer paso en este género. El resultado fue la gran novela de referencia –junto con <i>Fortunata y Jacinta</i> de Galdós– del siglo XIX español, que se nutre de la agudeza y de la pasión polémica de su autor como atento observador de la realidad de la España de la Restauración. Aunque mil veces comparada con <i>La señora Bovary</i> y famosa como «novela de adulterio», <i>La Regenta</i> (1884-1885) –que aquí recuperamos en edición presentada y anotada por Ignacio Echevarría– es una obra totalizadora, enciclopédica, compendio crítico de la cultura de su tiempo. Por encima de su formidable galería de personajes, su auténtica protagonista es la ciudad de Vetusta, trasunto inequívoco de Oviedo, explorada al detalle en todos sus estamentos, su gobierno, su economía, su paisaje y su moralidad. Las luchas por el poder, donde el clero tiene un papel determinante, se desarrollan en un clima de hipocresía y falsa virtud, donde todo el mundo es observado, incluso, se diría, sin necesidad de que haya alguien presente. Su heroína, Ana Ozores, juzgada y mangoneada desde la infancia, centro nervioso del erotismo omnipresente en la comunidad, llegará a ser vista como una «santurrona en pecado mortal» porque prefiere luchar contra la tentación –y si acaso sucumbir a ella– antes que «la batalla de todos los días con el hastío, el ridículo, la prosa».",
  image_link:
    "http://books.google.com/books/publisher/content?id=mztbEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71JA0dGyqgirUT1f47OgN7oBsw5r6Agq7Zau9EcWjDvTEAHvHmqtvSJDBw3KtTrUjI_Tz9vFjHXq_iucnwQ31-U2n6W9t3As5xJ79DX5SdGKPd5RcO4z7N7RZIfpkMLnPfPNKWu&source=gbs_api",
  year: 1456,
  read: true,
  upcoming: false,
  rating: 8.6,
  meeting_date: "2024-05-08T08:56:30.583Z",
  __v: 0,
};

export function arraysEqual(arr1, arr2) {
  if (!arr1 || !arr2) return false;

  // Check if arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }
  // Sort arrays to ensure consistent order of objects
  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();
  // Check if each object in the arrays is equal
  for (let i = 0; i < sortedArr1.length; i++) {
    const obj1 = sortedArr1[i];
    const obj2 = sortedArr2[i];
    // Check if objects have the same keys
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (
      keys1.length !== keys2.length ||
      !keys1.every((key) => keys2.includes(key))
    ) {
      return false;
    }
    // Check if values of corresponding keys are equal
    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }
  return true;
}

export function objectsAreEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }
  // Iterate over the keys and compare the values
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

export function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}
