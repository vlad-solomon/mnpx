import { useData } from "../hooks/useData";
import InfiniteGallery from "../components/InfiniteGallery";

export default function Home() {
    const { data, isLoading } = useData();

    if (isLoading) return null;

    return (
        <>
            <InfiniteGallery data={data} />
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, transparent 75%, rgba(0, 0, 0, 0.8) 100%)",
                }}
            />
        </>
    );
}
