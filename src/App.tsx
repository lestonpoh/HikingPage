import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About.tsx";
import Hikes from "./pages/Hikes.tsx";
import ErrorPage from "./layout/ErrorPage.tsx";
import HikeDetails from "./pages/HikeDetails.tsx";
import CreateEditHike from "./pages/CreateEditHike.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hikes />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "/hikes",
    element: <Hikes />,
  },
  {
    path: "/hikes/:name",
    element: <HikeDetails />,
  },
  {
    path: "/CreateEditHike/:id?",
    element: <CreateEditHike />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
