import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBook } from "../../services/apiBooks";
import { useLibrary } from "./useLibrary";

export function useGetBook() {
  const { id } = useParams();
  const { books } = useLibrary();

  const {
    isLoading,
    data: bookToShow,
    error,
  } = useQuery({
    queryKey: ["bookToShow", id],
    queryFn: () => getBook(books, id),
  });

  return { isLoading, bookToShow, error };
}
