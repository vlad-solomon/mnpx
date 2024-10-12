import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import Map from "../components/Map";
import Controls from "../components/Controls";
import PhotoBig from "../components/PhotoBig";

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
            <PhotoBig src={photo.image.asset._ref} alt={slug} />
            {/* <div className="relative bg-stone-900 border border-stone-500/50 rounded-lg overflow-hidden">
                <img src={urlFor(photo.image.asset._ref).url()} /> */}
            {/* <div className="absolute top-0">
                    <span>{photo.date}</span>
                    <span>{photo.tags.split(";")[0]}</span>
                </div> */}
            {/* </div> */}
            {/* <div className="relative overflow-hidden bg-stone-900 flex items-end p-4 text-lg border border-stone-500/50 rounded-lg w-full aspect-square">
                <Map lat={photo.location.lat} long={photo.location.lng} />
                <div className="relative flex flex-col pointer-events-none">
                    <span>{photo.location.lat}</span>
                    <span>{photo.location.lng}</span>
                </div>
            </div> */}
        </div>
    );
}
