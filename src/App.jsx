import { Suspense, useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDetailContext from "./context/UserDetailContext";
import Layout from "./components/Layout/Layout";
import Website from "./pages/Website";
import Properties from "./pages/Properties/Properties";
import Property from "./pages/Property/Property";
import Bookings from "./pages/Bookings/Bookings";
import Favorites from "./pages/Favorites/Favorites";

function App() {
  const queryClient = new QueryClient();

  const [userDetails, setUserDetails] = useState({
    favorites: [],
    bookings: [],
    token: null,
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>{<Layout />}</Suspense>
      ),
      children: [
        { index: true, element: <Website /> },
        {
          path: "properties",
          element: <Properties />,
        },
        {
          path: "properties/:propertyId",
          element: <Property />,
        },
        {
          path: "bookings",
          element: <Bookings />,
        },
        {
          path: "favorites",
          element: <Favorites />,
        },
      ],
    },
  ]);

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer autoClose={3000} transition={Slide} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
