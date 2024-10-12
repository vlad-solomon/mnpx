import { useData } from "../hooks/useData";
import { urlFor } from "../../../sanity";
import { Link } from "react-router-dom";

export default function Home() {
    const { data, isLoading } = useData();

    if (isLoading) {
        return "loading...";
    }

    return (
        <ol>
            {data.map((photo) => (
                <Link
                    key={photo.slug.current}
                    to={`photo/${photo.slug.current}`}
                >
                    <li>
                        <span>{photo.slug.current}</span>
                        <br />
                        <img
                            src={urlFor(photo.image.asset._ref)
                                .width(100)
                                .url()}
                            alt={photo.slug.current}
                        />
                    </li>
                </Link>
            ))}
        </ol>
    );
}
