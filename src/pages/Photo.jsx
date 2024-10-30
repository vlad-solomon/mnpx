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
            <div className="h-screen flex items-center justify-center">
                <div className="bg-white/10 sm:border border-white/10 overflow-hidden sm:rounded shadow-md my-5">
                    <img
                        src={urlFor(photo.image.asset._ref)}
                        alt={slug}
                        className="max-h-[calc(100vh-16px)]"
                    />
                </div>
            </div>
        </>
    );
}
