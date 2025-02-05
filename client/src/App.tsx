import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hikes from "./pages/Hikes.tsx";
import ErrorPage from "./layout/ErrorPage.tsx";
import HikeDetails from "./pages/HikeDetails.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Layout from "./layout/Layout.tsx";
import Home from "./pages/Home.tsx";
import ProtectedRoute from "./layout/ProtectedRoute.tsx";
import { AuthContextProvider } from "./context/authContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddHike from "./pages/AddHike.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/hike",
        element: <Hikes />,
      },
      {
        path: "/hike/:name",
        element: <HikeDetails />,
      },
      {
        path: "/addHike/:name?",
        element: (
          <ProtectedRoute>
            <AddHike />
          </ProtectedRoute>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
