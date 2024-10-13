import { Link, useNavigate } from "react-router-dom";
import Prev from "../assets/images/prev.png";
import Next from "../assets/images/next.png";
import { useEffect } from "react";

export default function Controls({ prev, next }) {
    const navigate = useNavigate();

    useEffect(() => {
        function handleControls({ key }) {
            if (key === "ArrowRight" && next) {
                navigate(`/p/${next.slug.current}`);
            }
            if (key === "ArrowLeft" && prev) {
                navigate(`/p/${prev.slug.current}`);
            }
            if (key === "Escape") {
                navigate("/");
            }
        }

        window.addEventListener("keydown", handleControls);
        return () => {
            window.removeEventListener("keydown", handleControls);
        };
    }, [prev, next, navigate]);

    return [prev, next].map(
        (control, index) =>
            control && (
                <Link
                    className={`hidden lg:block fixed z-50 top-1/2 -translate-y-1/2 text-lg tracking-[.25em] text-white/50 font-light hover:text-white font-mono ${
                        index === 0 ? "left-0 -rotate-90" : "right-0 rotate-90"
                    }`}
                    key={control.slug.current}
                    to={`/p/${control.slug.current}`}
                >
                    <img
                        src={index === 0 ? Prev : Next}
                        alt={index === 0 ? "prev" : "next"}
                        className="absolute scale-150"
                    />
                    {index === 0 ? "prev" : "next"}
                </Link>
            )
    );
}
