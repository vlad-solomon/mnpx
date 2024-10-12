import { useData } from "../hooks/useData";
import { urlFor } from "../../sanity";
import { Link } from "react-router-dom";

export default function Home() {
    const { data, isLoading } = useData();

    if (isLoading) {
        return "loading...";
    }

    return (
        <>
            <div className="bg-red-500 size-5"></div>
            <ol>
                {data.map((photo) => (
                    <Link
                        key={photo.slug.current}
                        to={`p/${photo.slug.current}`}
                    >
                        <li>
                            <span className="text-red-500 font-mono text-xl">
                                {photo.slug.current}
                            </span>
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
        </>
    );
}
