import { createContext, useEffect, useState } from "react";
import { getPhotos } from "../../../sanity";

export const DataContext = createContext(null);

export function DataProvider({ children }) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getPhotos();
                setData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ data, isLoading }}>
            {children}
        </DataContext.Provider>
    );
}
