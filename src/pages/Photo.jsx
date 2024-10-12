import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { urlFor } from "../../sanity";

//todo shadows

export default function Photo() {
    const { slug } = useParams();
    const { data, isLoading } = useData();

    if (isLoading) {
        return "loading...";
    }

    const photo = data.find((item) => item.slug.current === slug);
    console.log(photo);

    return (
        <div className="flex flex-col gap-5 py-6">
            <div className="bg-stone-900 border border-stone-500/50 rounded-lg overflow-hidden">
                <img src={urlFor(photo.image.asset._ref).url()} />
            </div>
            <div className="bg-stone-900 flex justify-between font-mono p-4 text-lg border border-stone-500/50 rounded-lg">
                <span>{photo.date}</span>
                <span>{photo.tags.split(";")[0]}</span>
            </div>
            <div className="bg-stone-900 flex items-end p-4 text-lg border border-stone-500/50 rounded-lg w-full aspect-square">
                <div className="bg-stone-900 w-full p-4 border border-stone-500/50 rounded-md">
                    {photo.location.lat} {photo.location.lng}
                </div>
            </div>
            <div className="flex gap-4 flex-wrap font-mono">
                {photo.tags.split(";").map((tag) => (
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
