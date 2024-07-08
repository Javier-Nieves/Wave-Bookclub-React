import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { logout as logoutApi } from "../../services/apiUsers";
import { useViews } from "../../contexts/ViewsContext";

export function useLogout() {
  const { showMessage } = useViews();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      // toast.success("You're logged out");
      navigate("/", { replace: true });
      showMessage("You are logged out");
    },
    onError: () => {
      // console.error("Error while logging out");
      showMessage("Error while logging out", "bad");
    },
  });

  return { logout, isLoading };
}
