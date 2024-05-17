import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addBook as addBookApi } from "../../services/apiBooks";

export function useAddBook() {
  const navigate = useNavigate();
  const { mutate: addBook, isLoading: isAdding } = useMutation({
    mutationFn: addBookApi,
    onSuccess: () => {
      navigate("/app");
    },
    onError: () => console.error("Error adding book!"),
  });

  return { addBook, isAdding };
}
