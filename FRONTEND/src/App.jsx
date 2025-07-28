import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import DemoAnalyticsPage from "./pages/DemoAnalyticsPage";
import ShortCodeAnalyticsPage from "./pages/ShortCodeAnalyticsPage";
import Register from "./pages/RegisterPage"; 

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true, 
          element: <Home />,
        },
        {
          path: "analytics", 
          element: <AnalyticsPage />,
        },
        {
          path : "short-code-analytics",
          element : <ShortCodeAnalyticsPage/>
        },
        {
          path : "demo-analytics",
          element : <DemoAnalyticsPage />
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
