import { useQuery } from "@tanstack/react-query";
import { getAllBooks } from "../../services/apiBooks";
import { useUser } from "../user/useUser";

export function useLibrary() {
  const { user } = useUser();

  // prettier-ignore
  const {data: books, isLoading, error} = useQuery({
        queryKey: ['books'],
        queryFn: () => getAllBooks(user._id),
        enabled: Boolean(user?._id) // Enable the query when user is defined
    })

  const upcomingBook = books?.find((book) => book.upcoming === true);

  // //* DEV: generate TestBooks list from bookclub's reading history
  // const filteredBooks = books?.map((book) => {
  //   const rating =
  //     book.rating || (book.read && +(Math.random() * 6 + 4).toFixed(1));
  //   return {
  //     ...book,
  //     testBook: true,
  //     club: ["66754a55d072377eaa0154f6"],
  //     _id: 0,
  //     rating,
  //   };
  // });
  // console.log(filteredBooks);

  return { isLoading, books, upcomingBook, error };
}
