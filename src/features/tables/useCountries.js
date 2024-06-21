import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../../services/apiCountries";

export function useCountries() {
  const { data: countries, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(),
  });

  return { isLoading, countries };
}
