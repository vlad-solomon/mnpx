import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DataProvider } from "./context/DataContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Photo from "./pages/Photo";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/p/:slug",
        element: <Photo />,
        errorElement: <NotFound />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <DataProvider>
            <RouterProvider router={router} />
        </DataProvider>
    </StrictMode>
);
