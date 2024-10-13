import getRandom from "../utils/getRandom";

export default function Column({ children }) {
    return (
        <div
            className="w-full flex-1 overflow-auto"
            style={{ rotate: `${getRandom(-1, 1)}deg` }}
        >
            {children}
        </div>
    );
}
