import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
// import Controls from "../components/_Controls";
// import PhotoBig from "../components/PhotoBig";
// import Line from "../assets/images/line.png";
import { urlFor } from "../../sanity";
import Controls from "../components/Controls";

export default function Photo() {
    const { slug } = useParams();
    const { data, isLoading } = useData();

    if (isLoading) return;

    const photo = data.find((item) => item.slug.current === slug);

    const [w, h] = photo.image.asset._ref.split("-")[2].split("x");
    const ratio = w / h;

    return (
        <>
            <Controls data={data} slug={slug} />
            <div className="bg-white/10 sm:border border-white/10 overflow-hidden sm:rounded shadow-md">
                <img src={urlFor(photo.image.asset._ref)} alt={slug} />
            </div>
        </>
    );
}
