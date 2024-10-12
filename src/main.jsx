import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DataProvider } from "./assets/context/DataContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./assets/pages/Home.jsx";
import Photo from "./assets/pages/Photo.jsx";

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
