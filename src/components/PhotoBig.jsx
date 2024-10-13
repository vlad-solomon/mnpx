import { urlFor } from "../../sanity";
import tapeOne from "../assets/images/1.png";
import tapeTwo from "../assets/images/2.png";
import tapeThree from "../assets/images/3.png";

//todo random between -1 and 1 for rotate
//todo maybe also randomize tapes

export default function PhotoBig({ photo }) {
    const { date, image, location, slug, tags } = photo;
    return (
        <div className="group relative rotate-1 shadow-custom-drop-shadow">
            <div className="absolute flex flex-col bottom-4 left-4 text-white/50 opacity-0 pointer-events-none group-hover:opacity-100">
                <span>{tags.split(";")[0]}</span>
                <span>{date}</span>
            </div>
            <div className="absolute text-white/50 w-1/2 top-4 right-4 justify-end flex flex-wrap gap-[0_8px] opacity-0 pointer-events-none group-hover:opacity-100">
                {tags
                    .split(";")
                    .slice(2)
                    .map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
            </div>
            <img src={urlFor(image.asset._ref).url()} alt={slug} />
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
    );
}
