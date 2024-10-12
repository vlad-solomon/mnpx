import { urlFor } from "../../sanity";
import tapeOne from "../assets/images/1.png";
import tapeTwo from "../assets/images/2.png";
import tapeThree from "../assets/images/3.png";

//todo random between -1 and 1 for rotate
//todo maybe also randomize tapes

export default function PhotoBig({ src, alt }) {
    return (
        <div className="relative rotate-1 shadow-custom-drop-shadow">
            <img src={urlFor(src).url()} alt={alt} />
            <img
                src={tapeOne}
                alt="tape-1"
                className="absolute bottom-[-58px] right-[-80px]"
            />
            <img
                src={tapeTwo}
                className="absolute top-1/3 left-[-130px]"
                alt="tape-2"
            />
            <img
                src={tapeThree}
                className="absolute top-[-52px] right-[-80px]"
                alt="tape-3"
            />
        </div>
    );
}
