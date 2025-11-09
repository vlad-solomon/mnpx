import { useState, useEffect, useRef } from "react";
import PhotoCard from "./PhotoCard";
import generatePhotos from "../utils/generatePhotos";

function getLayout() {
    const width = window.innerWidth;
    if (width < 640) return { columnWidth: 200, gap: 2 }; // mobile
    if (width < 1024) return { columnWidth: 240, gap: 5 }; // tablet
    return { columnWidth: 280, gap: 10 }; // desktop
}

export default function InfiniteGallery({ data }) {
    const containerRef = useRef(null);
    const initialLayout = getLayout();
    const [layout, setLayout] = useState(initialLayout);
    const [offset, setOffset] = useState({
        x: initialLayout.gap,
        y: initialLayout.gap,
    });
    const [isDragging, setIsDragging] = useState(false);
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const lastPos = useRef({ x: 0, y: 0 });
    const lastTime = useRef(0);
    const animationFrame = useRef(null);
    const targetOffset = useRef({ x: initialLayout.gap, y: initialLayout.gap });

    function getPointerPosition(e) {
        return e.touches
            ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
            : { x: e.clientX, y: e.clientY };
    }

    function handlePointerDown(e) {
        setIsDragging(true);
        const pos = getPointerPosition(e);
        lastPos.current = pos;
        lastTime.current = Date.now();
        setVelocity({ x: 0, y: 0 });
        if (animationFrame.current)
            cancelAnimationFrame(animationFrame.current);
    }

    function handlePointerMove(e) {
        if (!isDragging) return;

        const pos = getPointerPosition(e);
        const now = Date.now();
        const dt = now - lastTime.current;
        const dx = pos.x - lastPos.current.x;
        const dy = pos.y - lastPos.current.y;

        if (dt > 0) {
            setVelocity({ x: (dx / dt) * 16, y: (dy / dt) * 16 });
        }

        setOffset((prev) => {
            const newOffset = { x: prev.x + dx, y: prev.y + dy };
            targetOffset.current = newOffset;
            return newOffset;
        });
        lastPos.current = pos;
        lastTime.current = now;
    }

    function handlePointerUp() {
        setIsDragging(false);
    }

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        function handleResize() {
            setLayout(getLayout());
        }

        function handleWheel(e) {
            e.preventDefault();

            // Reset velocity to stop momentum
            setVelocity({ x: 0, y: 0 });
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }

            targetOffset.current = {
                x: targetOffset.current.x - e.deltaX,
                y: targetOffset.current.y - e.deltaY,
            };
        }

        function smoothScroll() {
            setOffset((current) => {
                const dx = targetOffset.current.x - current.x;
                const dy = targetOffset.current.y - current.y;

                // Smooth easing
                const ease = 0.1;
                const newX = current.x + dx * ease;
                const newY = current.y + dy * ease;

                return { x: newX, y: newY };
            });
            requestAnimationFrame(smoothScroll);
        }

        window.addEventListener("resize", handleResize);
        container.addEventListener("wheel", handleWheel, { passive: false });
        const rafId = requestAnimationFrame(smoothScroll);

        return () => {
            window.removeEventListener("resize", handleResize);
            container.removeEventListener("wheel", handleWheel);
            cancelAnimationFrame(rafId);
        };
    }, []);

    useEffect(() => {
        if (
            !isDragging &&
            (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1)
        ) {
            const animate = () => {
                setVelocity((prev) => ({ x: prev.x * 0.95, y: prev.y * 0.95 }));
                setOffset((prev) => {
                    const newOffset = {
                        x: prev.x + velocity.x,
                        y: prev.y + velocity.y,
                    };
                    targetOffset.current = newOffset;
                    return newOffset;
                });

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

    const photos = generatePhotos(data, offset, layout.gap, layout.columnWidth);

    return (
        <div
            ref={containerRef}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
            className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none scroll-smooth"
        >
            {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
            ))}
        </div>
    );
}
