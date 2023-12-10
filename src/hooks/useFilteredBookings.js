import { useMemo } from "react";
import { commonFilter } from "../utils/common";

const useFilteredBookings = (data, bookings, searchValue) => {
  const filteredBookings = useMemo(
    () =>
      data
        ?.filter((property) =>
          bookings.map((booking) => booking.id).includes(property.id)
        )
        .filter((property) => commonFilter([property], searchValue)[0]) || [],
    [data, bookings, searchValue]
  );

  return filteredBookings;
};

export default useFilteredBookings;
