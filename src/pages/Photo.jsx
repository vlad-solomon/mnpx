import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { urlFor } from "../../sanity";

export default function Photo() {
    const { slug } = useParams();
    const { data, isLoading } = useData();

    if (isLoading) {
        return "loading...";
    }

    const photo = data.find((item) => item.slug.current === slug);

    return (
        <>
            <span className="text-blue-500">{photo.slug.current}</span>
            <img src={urlFor(photo.image.asset._ref).width(400).url()} />
        </>
    );
}
