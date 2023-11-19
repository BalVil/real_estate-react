import { useContext, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../context/UserDetailContext";
import { getFavorites } from "../services/api";

const useFavorites = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allFavorites"],
    queryFn: () => {
      // Check if user is true before making the API call
      if (user) {
        return getFavorites(user?.email, userDetails?.token);
      }
      // Return a promise that resolves to [] if user is false
      return Promise.resolve([]);
    },
    // onSuccess: (data) =>
    //   setUserDetails((prev) => ({ ...prev, favorites: data })),
    enabled: user !== undefined,
    staleTime: 30000,
  });

  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();

    if (data) {
      setUserDetails((prev) => ({ ...prev, favorites: data }));
    }
  }, [userDetails?.token, data, setUserDetails]);

  return { data, isError, isLoading, refetch };
};

export default useFavorites;
