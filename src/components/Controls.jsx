import { Link } from "react-router-dom";

//todo keyboard events

export default function Controls({ prev, next }) {
    return [prev, next].map(
        (control, index) =>
            control && (
                <Link
                    className={`fixed top-1/2 -translate-y-1/2 ${
                        index === 0 ? "left-0" : "right-0"
                    } size-10 bg-stone-900 flex items-center justify-center rounded-full`}
                    key={control.slug.current}
                    to={`/p/${control.slug.current}`}
                >
                    {index === 0 ? "<" : ">"}
                </Link>
            )
    );
}
