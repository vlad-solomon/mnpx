import { Link } from "react-router-dom";
import { urlFor } from "../../sanity";

export default function Grid({ data }) {
    return (
        <div className="grid grid-cols-3 max-w-[928px] m-auto gap-[1px] sm:gap-2 min-w-80">
            {data.map((photo) => (
                <Link key={photo.slug.current} to={`p/${photo.slug.current}`}>
                    <div className="bg-white/10 sm:border border-white/10 aspect-square sm:rounded overflow-hidden shadow-md">
                        <img
                            src={urlFor(photo.image.asset._ref)}
                            alt={photo.slug.current}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
}
