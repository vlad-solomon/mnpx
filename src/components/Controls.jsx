import { Link } from "react-router-dom";

//todo keyboard events

export default function Controls({ prev, next }) {
    return [prev, next].map(
        (control, index) =>
            control && (
                <Link
                    className={`fixed top-1/2 -translate-y-1/2 text-lg tracking-[.25em] text-white/50 font-light hover:text-white ${
                        index === 0 ? "left-0 -rotate-90" : "right-0 rotate-90"
                    }`}
                    key={control.slug.current}
                    to={`/p/${control.slug.current}`}
                >
                    {index === 0 ? "prev" : "next"}
                </Link>
            )
    );
}
