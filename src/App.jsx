import { useEffect, useState } from "react";
import "./App.css";
import { getPhotos, urlFor } from "../sanity";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchPhotos() {
            const data = await getPhotos();
            setData(data);
        }
        fetchPhotos();
    }, []);

    return (
        <ol>
            {data.map((photo) => (
                <li key={photo.slug.current}>
                    <span>{photo.slug.current}</span>
                    <br />
                    <img
                        src={urlFor(photo.image.asset._ref).width(100).url()}
                        alt={photo.slug.current}
                    />
                </li>
            ))}
        </ol>
    );
}

export default App;
