import { Link, useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { urlFor } from "../../sanity";
import Map from "../components/Map";
import Controls from "../components/Controls";

//todo shadows

export default function Photo() {
    const { slug } = useParams();
    const { data, isLoading } = useData();

    if (isLoading) {
        return "loading...";
    }

    const photo = data.find((item) => item.slug.current === slug);
    const prevPhoto = data.find(
        (_, index, arr) => arr[index - 1]?.slug.current === slug
    );
    const nextPhoto = data.find(
        (_, index, arr) => arr[index + 1]?.slug.current === slug
    );

    return (
        <div className="flex flex-col gap-5 py-6">
            <Controls next={nextPhoto} prev={prevPhoto} />
            <div className="bg-stone-900 border border-stone-500/50 rounded-lg overflow-hidden">
                <img src={urlFor(photo.image.asset._ref).url()} />
            </div>
            <div className="bg-stone-900 flex justify-between font-mono p-4 text-lg border border-stone-500/50 rounded-lg">
                <span>{photo.date}</span>
                <span>{photo.tags.split(";")[0]}</span>
            </div>
            <div className="relative overflow-hidden bg-stone-900 flex items-end p-4 text-lg border border-stone-500/50 rounded-lg w-full aspect-square">
                <Map lat={photo.location.lat} long={photo.location.lng} />
                <div className="relative bg-stone-900 w-full p-4 border border-stone-500/50 rounded-md">
                    {photo.location.lat} {photo.location.lng}
                </div>
            </div>
            <div className="flex gap-4 flex-wrap font-mono">
                {photo.tags
                    .split(";")
                    .filter((tag) => tag)
                    .map((tag) => (
                        <span
                            key={tag}
                            className="py-1 px-4 bg-stone-900 rounded-lg border border-stone-500/50"
                        >
                            {tag}
                        </span>
                    ))}
            </div>
        </div>
    );
}
