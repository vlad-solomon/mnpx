import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import Controls from "../components/Controls";
import PhotoBig from "../components/PhotoBig";

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
        <div className="flex flex-col max-w-[510px] m-auto h-[100dvh] justify-center">
            <Controls next={nextPhoto} prev={prevPhoto} />
            <PhotoBig photo={photo} />
        </div>
    );
}
