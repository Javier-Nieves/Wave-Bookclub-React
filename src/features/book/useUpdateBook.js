import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeBook as changeBookApi } from "../../services/apiBooks";

export function useUpdateBook() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: changeBook } = useMutation({
    mutationFn: ({ id, type, data }) => changeBookApi({ id, type, data }),
    onSuccess: (data) => {
      // re-fetch books query
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      // update book data on the page
      queryClient.setQueryData(["bookToShow", data.bookid], data);
    },
    onerror: () => console.error("Error"),
  });

  return { isUpdating, changeBook };
}
