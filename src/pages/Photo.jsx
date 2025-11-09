import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { urlFor } from "../../sanity";
import Controls from "../components/Controls";

export default function Photo() {
    const { slug } = useParams();
    const { data, isLoading } = useData();

    if (isLoading) return;

    const photo = data.find((item) => item.slug.current === slug);

    return (
        <>
            <Controls data={data} slug={slug} />
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg px-2">
                <div className="bg-white/10 border border-white/10 overflow-hidden rounded-md shadow-lg">
                    <img
                        src={urlFor(photo.image.asset._ref)}
                        alt={slug}
                        className="max-h-[calc(100vh-100px)]"
                    />
                </div>
            </div>
        </>
    );
}
