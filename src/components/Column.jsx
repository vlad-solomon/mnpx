export default function Column({ children, id }) {
    return (
        <div className="w-full flex-1 overflow-auto" id={id}>
            {children}
        </div>
    );
}
