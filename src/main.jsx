import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DataProvider } from "./context/DataContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import BaseLayout from "./layouts/BaseLayout";
import Home from "./pages/Home";
import Photo from "./pages/Photo";

const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/p/:slug",
                element: <Photo />,
            },
        ],
    },
]);

createRoot(document.querySelector("body")).render(
    <StrictMode>
        <DataProvider>
            <RouterProvider router={router} />
        </DataProvider>
    </StrictMode>
);
