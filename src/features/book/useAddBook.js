import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addBook as addBookApi } from "../../services/apiBooks";

export function useAddBook() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: addBook, isLoading: isAdding } = useMutation({
    mutationFn: addBookApi,
    onSuccess: () => {
      navigate("/app");
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
    onError: () => console.error("Error adding book!"),
  });

  return { addBook, isAdding };
}
