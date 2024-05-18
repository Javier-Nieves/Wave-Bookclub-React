import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBook } from "../../services/apiBooks";
import { useLibrary } from "./useLibrary";

export function useGetBook() {
  const queryClient = useQueryClient();
  const { books } = useLibrary();
  const { id } = useParams();
  // make old bookToShow query stale to update it
  queryClient.invalidateQueries({ queryKey: ["bookToShow"] });

  const {
    isLoading,
    data: bookToShow,
    error,
  } = useQuery({
    queryKey: ["bookToShow"],
    queryFn: () => getBook(books, id),
  });

  return { isLoading, bookToShow, error };
}
