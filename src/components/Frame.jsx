import FilmFrame from "../assets/images/frame.png";
import { Link } from "react-router-dom";

export default function Frame({ src, slug }) {
    return (
        <Link to={`p/${slug}`}>
            <div className="relative flex items-center justify-center">
                <img
                    src={FilmFrame}
                    alt="frame"
                    className="drop-shadow-xl relative z-10"
                />
                <img
                    src={src}
                    alt={slug}
                    className="absolute w-[71%] h-full object-cover"
                />
            </div>
        </Link>
    );
}
