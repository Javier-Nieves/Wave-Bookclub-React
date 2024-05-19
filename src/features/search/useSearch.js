import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "../../services/apiBooks";

export function useSearch(title, page) {
  const { isLoading: isSearching, data } = useQuery({
    queryKey: ["search", title],
    queryFn: () => searchBooks(title, page),
    enabled: Boolean(title),
  });

  return {
    isSearching,
    searchResults: data?.searchResults,
    totalResults: data?.totalResults,
  };
}
