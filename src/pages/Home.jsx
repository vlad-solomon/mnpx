import { useData } from "../hooks/useData";
import { urlFor } from "../../sanity";
import Column from "../components/Column";
import Frame from "../components/Frame";

//todo rename PhotoBig to Showcase or something

export default function Home() {
    const { data, isLoading } = useData();

    if (isLoading) {
        return "loading...";
    }

    return (
        <div className="flex gap-8 max-w-[800px] m-auto h-[100dvh]">
            {[0, 1, 2].map((column) => (
                <Column key={column}>
                    {data
                        .filter((_, index) => index % 3 === column)
                        .map((photo) => (
                            <Frame
                                key={photo.slug.current}
                                slug={photo.slug.current}
                                src={urlFor(photo.image.asset._ref)}
                            />
                        ))}
                </Column>
            ))}
        </div>
    );
}
