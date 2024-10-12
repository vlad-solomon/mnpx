import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DataProvider } from "./context/DataContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Photo from "./pages/Photo";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/p/:slug",
        element: <Photo />,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <DataProvider>
            <RouterProvider router={router} />
        </DataProvider>
    </StrictMode>
);
