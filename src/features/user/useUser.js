import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../../services/apiUsers";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: checkAuth,
  });

  return { isLoading, user, isLoggedIn: Boolean(user) };
}
