import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PhotoCard({ photo, isDragging }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const hasDragged = useRef(false);
    const navigate = useNavigate();

    function handlePointerDown() {
        hasDragged.current = false;
    }

    function handlePointerMove() {
        if (isDragging) {
            hasDragged.current = true;
        }
    }

    function handleClick(e) {
        if (hasDragged.current) {
            e.preventDefault();
        } else {
            navigate(`/p/${photo.slug}`);
        }
    }

    return (
        <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onClick={handleClick}
            className="absolute rounded cursor-pointer select-none overflow-hidden shadow-md border border-white/10 bg-white/10"
            style={{
                left: `${photo.x}px`,
                top: `${photo.y}px`,
                width: `${photo.width}px`,
                height: `${photo.height}px`,
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "scale(1)" : "scale(0.95)",
                transformOrigin: "center",
                transition: "opacity 500ms ease-out, transform 500ms ease-out",
            }}
        >
            <img
                src={photo.url}
                alt={photo.slug}
                className="w-full h-full object-cover pointer-events-none"
                loading="lazy"
                draggable="false"
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
}
