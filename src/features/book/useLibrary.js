import { useQuery } from "@tanstack/react-query";
import { getAllBooks } from "../../services/apiBooks";
import { useAuth } from "../../contexts/AuthContext";

export function useLibrary() {
  const { user } = useAuth();

  // prettier-ignore
  const {data: books, isLoading, error} = useQuery({
        queryKey: ['books'],
        queryFn: () => getAllBooks(user.id)
    })

  return { isLoading, books, error };
}
