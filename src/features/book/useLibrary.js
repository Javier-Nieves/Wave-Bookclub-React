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

  return { isLoading, books, upcomingBook, error };
}
