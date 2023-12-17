import { useMemo } from "react";
import { commonFilter } from "../utils/common";

function useFilteredProperties(data, searchValue) {
  console.log(data);
  return useMemo(() => {
    if (!Array.isArray(data)) {
      console.error("Data is not in the expected format:", data);
      return [];
    }

    return (
      data?.filter((property) => commonFilter([property], searchValue)[0]) || []
    );
  }, [data, searchValue]);
}

export default useFilteredProperties;
