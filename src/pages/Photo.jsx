import { useParams, Link } from "react-router-dom";
import { useData } from "../hooks/useData";
import Controls from "../components/Controls";
import PhotoBig from "../components/PhotoBig";
import Line from "../assets/images/line.png";

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
        <>
            <Link
                to="/"
                className="relative flex items-center justify-center text-lg tracking-[.25em] text-white/50 font-light hover:text-white font-mono"
            >
                mnpx
                <img src={Line} alt="line" className="absolute -top-2" />
            </Link>
            <div className="flex flex-col justify-center max-w-[510px] m-auto h-full">
                <Controls next={nextPhoto} prev={prevPhoto} />
                <PhotoBig photo={photo} />
            </div>
        </>
    );
}
