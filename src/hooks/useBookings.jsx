import { useContext, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../context/UserDetailContext";
import { getBookings } from "../services/api";

function useBookings() {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allBookings"],
    queryFn: () => {
      // Check if user is true before making the API call
      if (user) {
        return getBookings(user?.email, userDetails?.token);
      }
      // Return a promise that resolves to [] if user is false
      return Promise.resolve([]);
    },
    // onSuccess: (data) =>
    //   setUserDetails((prev) => ({ ...prev, bookings: data })),
    enabled: user !== undefined,
    staleTime: 30000,
  });

  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();

    if (data) {
      setUserDetails((prev) => ({ ...prev, bookings: data }));
    }
  }, [userDetails?.token, data, setUserDetails]);

  return { data, isLoading, isError, refetch };
}

export default useBookings;
