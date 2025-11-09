import { useData } from "../hooks/useData";
import InfiniteGallery from "../components/InfiniteGallery";

export default function Home() {
    const { data, isLoading } = useData();

    if (isLoading) return null;

    return (
        <>
            <InfiniteGallery data={data} />
        </>
    );
}
