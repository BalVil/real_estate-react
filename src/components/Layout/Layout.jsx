import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import UserDetailContext from "../../context/UserDetailContext";
import { createUser, fetchCurrentUser } from "../../services/api";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { PageLoader } from "../PageLoader/PageLoader";

function Layout() {
  const { isAuthenticated, user, isLoading, getAccessTokenSilently } =
    useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
          scope: "openid profile email",
        },
      });

      localStorage.setItem("access_token", token);
      setUserDetails((prev) => ({ ...prev, token }));

      const currentUser = await fetchCurrentUser(user.email, token);
      if (currentUser.email !== user.email) {
        mutate(token);
      }
    };

    isAuthenticated && getTokenAndRegister();
  }, [
    isAuthenticated,
    getAccessTokenSilently,
    setUserDetails,
    mutate,
    user?.email,
  ]);

  return (
    <>
      {isLoading && (
        <div className="page-layout">
          <PageLoader />
        </div>
      )}

      {!isLoading && (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

export default Layout;
