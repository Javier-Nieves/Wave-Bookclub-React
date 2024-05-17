import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBook } from "../../services/apiBooks";
import { useLibrary } from "./useLibrary";

export function useGetBook() {
  const { books } = useLibrary();
  const { id } = useParams();

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
