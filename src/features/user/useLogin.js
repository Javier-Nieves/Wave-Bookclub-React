import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useViews } from "../../contexts/ViewsContext";
import { login as loginApi } from "../../services/apiUsers";

export function useLogin() {
  const { showMessage } = useViews();
  const client = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ name, password }) => loginApi({ name, password }),
    onSuccess: (user) => {
      // manually set data to cash to speed the login up
      client.setQueryData(["user"], user.user);
      // save JWT to localStorage
      localStorage.setItem("jwt", user.jwt);
      // show login message
      showMessage("You are logged in");

      navigate("/app", { replace: true });
    },
    onError: () => {
      // console.log("ERROR: ", err);
      showMessage("Error while logging user", "bad");
    },
  });

  return { login, isLoading };
}
