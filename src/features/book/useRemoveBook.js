import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeBook as removeBookApi } from "../../services/apiBooks";
import { useNavigate } from "react-router-dom";

export function useRemoveBook() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isDeleting, mutate: removeBook } = useMutation({
    mutationFn: removeBookApi,
    onSuccess: () => {
      navigate("/app");
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
    onError: () => console.error("Can't delete book"),
  });

  return { isDeleting, removeBook };
}
