import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../services/api";

function useProperties() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allProperties"],
    queryFn: getProperties,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isError, refetch };
}

export default useProperties;
