import { useEffect, useState } from "react";
import { useData } from "../hooks/useData";
import { urlFor } from "../../sanity";
import Column from "../components/Column";
import Frame from "../components/Frame";

//todo rename PhotoBig to Showcase or something

export default function Home() {
    const { data, isLoading } = useData();
    const [columns, setColumns] = useState(3);

    useEffect(() => {
        const breakpoints = [300, 500, 700];

        const handleResize = () => {
            const size = window.innerWidth;
            const index = breakpoints.findIndex((b) => size <= b);
            const newColumns = index !== -1 ? index + 1 : breakpoints.length;

            if (newColumns !== columns) {
                setColumns(newColumns);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [columns]);

    if (isLoading) {
        return "loading...";
    }

    return (
        <div className="flex gap-8 max-w-[800px] m-auto h-[100dvh]">
            {Array.from({ length: columns }, (_, index) => index).map(
                (column) => (
                    <Column key={column}>
                        {data
                            .filter((_, index) => index % columns === column)
                            .map((photo) => (
                                <Frame
                                    key={photo.slug.current}
                                    slug={photo.slug.current}
                                    src={urlFor(photo.image.asset._ref)}
                                />
                            ))}
                    </Column>
                )
            )}
        </div>
    );
}
