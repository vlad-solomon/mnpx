import { useState, useEffect, useRef } from "react";
import PhotoCard from "./PhotoCard";
import { urlFor } from "../../sanity";

function InfiniteGallery({ data }) {
    const containerRef = useRef(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const lastPos = useRef({ x: 0, y: 0 });
    const lastTime = useRef(0);
    const animationFrame = useRef(null);

    const generatePhotos = (currentOffset) => {
        if (!data || data.length === 0) return [];

        const photos = [];
        const columnWidth = 280;
        const gap = 16;
        const minHeight = 180;
        const maxHeight = 450;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const numColumns = Math.ceil(viewportWidth / (columnWidth + gap)) + 8;
        const startCol = Math.floor(-currentOffset.x / (columnWidth + gap)) - 4;

        const photosPerColumn = Math.ceil(viewportHeight / minHeight) + 16;

        for (let col = startCol; col < startCol + numColumns; col++) {
            const columnX = col * (columnWidth + gap);
            const visibleStartY = -currentOffset.y - viewportHeight;

            const avgHeight = (minHeight + maxHeight) / 2;
            const startPhotoIndex =
                Math.floor(visibleStartY / (avgHeight + gap)) - 8;

            let currentY = 0;
            for (let i = 0; i < startPhotoIndex; i++) {
                const seed = col * 7919 + i * 4283;
                const height =
                    minHeight + (Math.abs(seed) % (maxHeight - minHeight));
                currentY += height + gap;
            }

            if (startPhotoIndex < 0) {
                currentY = 0;
                for (let i = -1; i >= startPhotoIndex; i--) {
                    const seed = col * 7919 + i * 4283;
                    const height =
                        minHeight + (Math.abs(seed) % (maxHeight - minHeight));
                    currentY -= height + gap;
                }
            }

            for (
                let photoIndex = startPhotoIndex;
                photoIndex < startPhotoIndex + photosPerColumn;
                photoIndex++
            ) {
                const seed = col * 7919 + photoIndex * 4283;
                const height =
                    minHeight + (Math.abs(seed) % (maxHeight - minHeight));
                const photoData = data[Math.abs(seed) % data.length];

                const x = columnX + currentOffset.x;
                const y = currentY + currentOffset.y;

                if (
                    x + columnWidth >= -gap &&
                    x <= viewportWidth + gap &&
                    y + height >= -gap &&
                    y <= viewportHeight + gap
                ) {
                    photos.push({
                        id: `${col}-${photoIndex}`,
                        x,
                        y,
                        width: columnWidth,
                        height,
                        url: urlFor(photoData.image.asset._ref)
                            .width(400)
                            .url(),
                        title: photoData.date,
                        author: photoData.tags
                            .split(";")
                            .slice(0, 3)
                            .join(", "),
                    });
                }

                currentY += height + gap;

                if (
                    y > viewportHeight + gap &&
                    photoIndex > startPhotoIndex + photosPerColumn / 2
                ) {
                    break;
                }
            }
        }

        return photos;
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        lastPos.current = { x: e.clientX, y: e.clientY };
        lastTime.current = Date.now();
        setVelocity({ x: 0, y: 0 });
        if (animationFrame.current)
            cancelAnimationFrame(animationFrame.current);
    };

    const handleMouseMove = (e) => {
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
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

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

    const photos = generatePhotos(offset);

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

export default InfiniteGallery;
