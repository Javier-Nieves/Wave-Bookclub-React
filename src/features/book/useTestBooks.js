import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadTestBooks as uploadTestBooksApi } from "../../services/apiBooks";
import { useViews } from "../../contexts/ViewsContext";

export function useTestBooks() {
  const queryClient = useQueryClient();
  const { showMessage } = useViews();

  const { isLoading, mutate: uploadTestBooks } = useMutation({
    mutationFn: uploadTestBooksApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });

      showMessage("Test books uploaded");
    },
    onError: () => {
      console.error("Can't upload test books");
      showMessage("Test books are not uploaded", "bad");
    },
  });

  return { isLoading, uploadTestBooks };
}
