import { useMemo } from "react";
import { commonFilter } from "../utils/common";

function useFilteredFavorites(data, favorites, searchValue) {
  return useMemo(
    () =>
      data
        ?.filter((property) => favorites.includes(property.id))
        .filter((property) => commonFilter([property], searchValue)[0]) || [],
    [data, favorites, searchValue]
  );
}

export default useFilteredFavorites;
