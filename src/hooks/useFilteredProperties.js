import { useMemo } from "react";
import { commonFilter } from "../utils/common";

function useFilteredProperties(data, searchValue) {
  return useMemo(
    () =>
      data?.filter((property) => commonFilter([property], searchValue)[0]) ||
      [],
    [data, searchValue]
  );
}

export default useFilteredProperties;
