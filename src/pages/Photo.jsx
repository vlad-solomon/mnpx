import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { urlFor } from "../../sanity";
import { motion, AnimatePresence } from "motion/react";
import Controls from "../components/Controls";

export default function Photo() {
    const { slug } = useParams();
    const { data, isLoading } = useData();

    if (isLoading) return;

    const photo = data.find((item) => item.slug.current === slug);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: "none" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg px-8 lg:px-20"
        >
            <Controls data={data} slug={slug} />
            <AnimatePresence mode="wait">
                <motion.div
                    key={slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white/10 border border-white/10 overflow-hidden rounded-md shadow-lg"
                    >
                        <img
                            src={urlFor(photo.image.asset._ref)}
                            alt={slug}
                            className="max-h-[calc(100vh-100px)]"
                        />
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
