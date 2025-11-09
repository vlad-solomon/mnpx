import { Link } from "react-router-dom";

export default function Header() {
    return (
        <Link navigate="/">
            <span className="absolute top-4 left-4 z-10 text-5xl italic text-shadow-xs drop-shadow-lg font-script">
                mnpx
            </span>
        </Link>
    );
}
