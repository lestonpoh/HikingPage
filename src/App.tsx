import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components_about/About.tsx";
import Hikes from "./components_hikes/Hikes.tsx";
import ErrorPage from "./components_common/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hikes />,
    errorElement: <ErrorPage />,
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
