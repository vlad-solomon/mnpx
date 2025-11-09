import { useState, useEffect, useRef } from "react";
import PhotoCard from "./PhotoCard";
import generatePhotos from "../utils/generatePhotos";

const GAP = 16;

export default function InfiniteGallery({ data }) {
    const containerRef = useRef(null);
    const [offset, setOffset] = useState({ x: GAP, y: GAP });
    const [isDragging, setIsDragging] = useState(false);
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const lastPos = useRef({ x: 0, y: 0 });
    const lastTime = useRef(0);
    const animationFrame = useRef(null);

    function handleMouseDown(e) {
        setIsDragging(true);
        lastPos.current = { x: e.clientX, y: e.clientY };
        lastTime.current = Date.now();
        setVelocity({ x: 0, y: 0 });
        if (animationFrame.current)
            cancelAnimationFrame(animationFrame.current);
    }

    function handleMouseMove(e) {
        if (!isDragging) return;

        const now = Date.now();
        const dt = now - lastTime.current;
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;

        if (dt > 0) {
            setVelocity({ x: (dx / dt) * 16, y: (dy / dt) * 16 });
        }

        setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
        lastPos.current = { x: e.clientX, y: e.clientY };
        lastTime.current = now;
    }

    function handleMouseUp() {
        setIsDragging(false);
    }

    useEffect(() => {
        if (
            !isDragging &&
            (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1)
        ) {
            const animate = () => {
                setVelocity((prev) => ({ x: prev.x * 0.95, y: prev.y * 0.95 }));
                setOffset((prev) => ({
                    x: prev.x + velocity.x,
                    y: prev.y + velocity.y,
                }));

                if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1) {
                    animationFrame.current = requestAnimationFrame(animate);
                }
            };
            animationFrame.current = requestAnimationFrame(animate);
        }

        return () => {
            if (animationFrame.current)
                cancelAnimationFrame(animationFrame.current);
        };
    }, [isDragging, velocity]);

    const photos = generatePhotos(data, offset, GAP);

    return (
        <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        >
            {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
            ))}
        </div>
    );
}
