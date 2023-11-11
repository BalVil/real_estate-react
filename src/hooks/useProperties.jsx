import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../services/api";

function useProperties() {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["allProperties"],
    queryFn: getProperties,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isError, isFetching };
}

export default useProperties;
