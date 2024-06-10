import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register as registerApi } from "../../services/apiUsers";
import { useViews } from "../../contexts/ViewsContext";

export function useRegister() {
  const { showMessage } = useViews();
  const client = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register, isLoading } = useMutation({
    mutationFn: ({ name, password, passwordConfirm }) =>
      registerApi({ name, password, passwordConfirm }),
    onSuccess: (user) => {
      // manually set data to cash to speed the login up
      client.setQueryData(["user"], user.user);
      // save JWT to localStorage
      localStorage.setItem("jwt", user.jwt);
      // show login message
      showMessage("You bookclub is created!");

      navigate("/app", { replace: true });
    },
    onError: () => {
      showMessage("Error while registering user", "bad");
    },
  });

  return { register, isLoading };
}
