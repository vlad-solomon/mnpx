import { useData } from "../hooks/useData";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import InfiniteGallery from "../components/InfiniteGallery";
import Header from "../components/Header";

export default function Home() {
    const { data, isLoading } = useData();
    const location = useLocation();
    const outlet = useOutlet();
    const isPhotoRoute = location.pathname.startsWith("/p/");

    if (isLoading) return null;

    return (
        <>
            <Header />
            <InfiniteGallery data={data} />
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, transparent 75%, rgba(0, 0, 0, 0.8) 100%)",
                }}
            />
            <AnimatePresence mode="wait">
                {outlet && (
                    <div key={isPhotoRoute ? "photo" : location.pathname}>
                        {outlet}
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
