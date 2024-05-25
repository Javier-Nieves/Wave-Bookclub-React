import { useQuery } from "@tanstack/react-query";
import { getAllBooks } from "../../services/apiBooks";
import { useAuth } from "../../contexts/AuthContext";

export function useLibrary() {
  const { user } = useAuth();

  // prettier-ignore
  const {data: books, isLoading, error} = useQuery({
        queryKey: ['books'],
        queryFn: () => getAllBooks(user.id),
        enabled: Boolean(user.id) // Enable the query when user is defined
    })

  const upcomingBook = books?.find((book) => book.upcoming === true);

  return { isLoading, books, upcomingBook, error };
}
