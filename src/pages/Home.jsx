import { useData } from "../hooks/useData";
import { urlFor } from "../../sanity";
import { Link } from "react-router-dom";
import Column from "../components/Column";

export default function Home() {
    const { data, isLoading } = useData();

    if (isLoading) {
        return "loading...";
    }

    console.log(data);

    return (
        <div className="flex gap-4 max-w-[1000px] m-auto h-[100dvh]">
            {[0, 1, 2].map((column) => (
                <Column key={column}>
                    {data
                        .filter((_, index) => index % 3 === column)
                        .map((photo) => (
                            <Link
                                key={photo.slug.current}
                                to={`p/${photo.slug.current}`}
                            >
                                <img src={urlFor(photo.image.asset._ref)} />
                            </Link>
                        ))}
                </Column>
            ))}
        </div>
    );
}
