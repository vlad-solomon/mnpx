import { urlFor } from "../../sanity";
import tapeOne from "../assets/images/1.png";
import tapeTwo from "../assets/images/2.png";
import tapeThree from "../assets/images/3.png";
import getRandom from "../utils/getRandom";

export default function PhotoBig({ photo }) {
    const { date, image, slug, tags } = photo;
    return (
        <div
            className={`group relative shadow-custom-drop-shadow`}
            style={{ rotate: `${getRandom(-1, 1)}deg` }}
        >
            {/* <div className="absolute flex flex-col -bottom-8 left-0 text-white/50 opacity-0 pointer-events-none group-hover:opacity-100 drop-shadow-sm font-mono">
                <span>
                    {tags.split(";")[0]} {date}
                </span>
            </div>
            <div className="absolute text-white/50 -top-8 right-0 justify-end flex flex-wrap gap-[0_8px] opacity-0 pointer-events-none group-hover:opacity-100 drop-shadow-sm font-mono">
                {tags
                    .split(";")
                    .slice(2)
                    .filter((tag) => tag)
                    .map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
            </div> */}
            <img src={urlFor(image.asset._ref).url()} alt={slug.current} />
            <div className="hidden md:block">
                <img
                    src={tapeOne}
                    alt="tape-1"
                    className="absolute bottom-[-58px] right-[-80px] pointer-events-none"
                />
                <img
                    src={tapeTwo}
                    className="absolute top-[60px] left-[-130px] pointer-events-none"
                    alt="tape-2"
                />
                <img
                    src={tapeThree}
                    className="absolute top-[-52px] right-[-80px] pointer-events-none"
                    alt="tape-3"
                />
            </div>
        </div>
    );
}
