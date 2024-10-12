import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DataProvider } from "./assets/context/DataContext";

import Home from "./assets/pages/Home";
import Photo from "./assets/pages/Photo";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/photo/:slug",
            element: <Photo />,
        },
    ]);

    return (
        <DataProvider>
            <RouterProvider router={router} />
        </DataProvider>
    );
}
