import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeBook as changeBookApi } from "../../services/apiBooks";

export function useUpdateBook() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: changeBook } = useMutation({
    mutationFn: ({ id, type, data }) => changeBookApi({ id, type, data }),
    onSuccess: () => {
      console.log("Updated");
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
    onerror: () => console.error("Error"),
  });

  return { isUpdating, changeBook };
}
