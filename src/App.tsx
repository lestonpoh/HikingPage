import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components_about/About.tsx";
import Hikes from "./components_hikes/Hikes.tsx";
import ErrorPage from "./components_common/ErrorPage.tsx";
import HikeDetails from "./components_hikes/HikeDetails.tsx";

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
    path: "/about",
    element: <About />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
