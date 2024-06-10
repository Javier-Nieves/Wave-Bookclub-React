import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../../services/apiUsers";

export function useLogin() {
  const client = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ name, password }) => loginApi({ name, password }),
    onSuccess: (user) => {
      // manually set data to cash to speed the login up
      client.setQueryData(["user"], user.user);
      // save JWT to localStorage
      console.log(user);
      navigate("/app", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      // toast.error("Error in logging user");
    },
  });

  return { login, isLoading };
}

// export async function getCurrentUser() {
//   const { data: session } = await supabase.auth.getSession();
//   if (!session.session) return null;

//   const { data, error } = await supabase.auth.getUser();

//   if (error) throw new Error(error.message);

//   return data?.user;
// }
