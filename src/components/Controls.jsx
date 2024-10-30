import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import curved from "../assets/curved-text.svg";
import logo from "../assets/logo.png";

export default function Controls({ data, slug }) {
    const navigate = useNavigate();
    const prev = data.find(
        (_, index, arr) => arr[index - 1]?.slug.current === slug
    );
    const next = data.find(
        (_, index, arr) => arr[index + 1]?.slug.current === slug
    );

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

    return (
        <div className="hidden md:block">
            <Link to="/">
                <div className="fixed top-5 left-5 flex justify-center items-center">
                    <img
                        src={curved}
                        alt="back-to-gallery"
                        className="absolute animate-[spin_60s_linear_infinite]"
                    />
                    <img src={logo} alt="logo" className="scale-[65%]" />
                </div>
            </Link>
            {prev && (
                <Link
                    to={`/p/${prev.slug.current}`}
                    className="fixed left-5 top-1/2 -translate-y-1/2 bg-white/10 size-8 border border-white/10 rounded flex justify-center items-center shadow-md"
                >
                    <ChevronLeft className="size-4" />
                </Link>
            )}
            {next && (
                <Link
                    to={`/p/${next.slug.current}`}
                    className="fixed right-5 top-1/2 -translate-y-1/2 bg-white/10 size-8 border border-white/10 rounded flex justify-center items-center shadow-md"
                >
                    <ChevronRight className="size-4" />
                </Link>
            )}
        </div>
    );
}
