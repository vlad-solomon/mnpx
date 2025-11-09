import { useState, useEffect, useRef } from "react";
import PhotoCard from "./PhotoCard";
import { urlFor } from "../../sanity";

const COLUMN_WIDTH = 280;
const GAP = 16;
const JITTER_RANGE = 30;
const COLUMN_PRIME = 3571;
const JITTER_COL_MULTIPLIER = 17;
const JITTER_ROW_MULTIPLIER = 23;

function InfiniteGallery({ data }) {
    const containerRef = useRef(null);
    const [offset, setOffset] = useState({ x: GAP, y: GAP });
    const [isDragging, setIsDragging] = useState(false);
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const lastPos = useRef({ x: 0, y: 0 });
    const lastTime = useRef(0);
    const animationFrame = useRef(null);

    const getImageDimensions = (ref) => {
        // Extract dimensions from Sanity image ref format: image-{id}-{width}x{height}-{ext}
        const match = ref.match(/-(\d+)x(\d+)-/);
        if (match) {
            return {
                width: parseInt(match[1]),
                height: parseInt(match[2]),
            };
        }
        return { width: 1, height: 1 }; // fallback
    };

    const generatePhotos = (currentOffset) => {
        if (!data || data.length === 0) return [];

        const photos = [];

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const numColumns = Math.ceil(viewportWidth / (COLUMN_WIDTH + GAP)) + 8;
        const startCol =
            Math.floor(-currentOffset.x / (COLUMN_WIDTH + GAP)) - 4;

        // Pre-calculate heights for each photo based on aspect ratio
        const photoHeights = data.map((photoData) => {
            const dims = getImageDimensions(photoData.image.asset._ref);
            const aspectRatio = dims.height / dims.width;
            return COLUMN_WIDTH * aspectRatio;
        });

        const avgHeight =
            photoHeights.reduce((sum, h) => sum + h, 0) / photoHeights.length;
        const photosPerColumn = Math.ceil(viewportHeight / avgHeight) + 16;

        for (let col = startCol; col < startCol + numColumns; col++) {
            const columnX = col * (COLUMN_WIDTH + GAP);
            const visibleStartY = -currentOffset.y - viewportHeight;

            const startPhotoIndex =
                Math.floor(visibleStartY / (avgHeight + GAP)) - 8;

            // Create a column-specific offset that's consistent for this column
            const colOffset = ((col % data.length) + data.length) % data.length;
            const colMultiplier = (Math.abs(col) * COLUMN_PRIME) % data.length;
            const finalColOffset = (colOffset + colMultiplier) % data.length;

            let currentY = 0;
            for (let i = 0; i < startPhotoIndex; i++) {
                const photoIdx =
                    ((i % data.length) + finalColOffset) % data.length;
                const baseHeight = photoHeights[photoIdx];
                const jitterSeed =
                    col * JITTER_COL_MULTIPLIER + i * JITTER_ROW_MULTIPLIER;
                const jitterAmount =
                    (jitterSeed % JITTER_RANGE) - JITTER_RANGE / 2;
                const height = baseHeight + jitterAmount;
                currentY += height + GAP;
            }

            if (startPhotoIndex < 0) {
                currentY = 0;
                for (let i = -1; i >= startPhotoIndex; i--) {
                    const photoIdx =
                        ((((i % data.length) + data.length) % data.length) +
                            finalColOffset) %
                        data.length;
                    const baseHeight = photoHeights[photoIdx];
                    const jitterSeed =
                        col * JITTER_COL_MULTIPLIER + i * JITTER_ROW_MULTIPLIER;
                    const jitterAmount =
                        (jitterSeed % JITTER_RANGE) - JITTER_RANGE / 2;
                    const height = baseHeight + jitterAmount;
                    currentY -= height + GAP;
                }
            }

            for (
                let photoIndex = startPhotoIndex;
                photoIndex < startPhotoIndex + photosPerColumn;
                photoIndex++
            ) {
                const photoIdx =
                    ((((photoIndex % data.length) + data.length) %
                        data.length) +
                        finalColOffset) %
                    data.length;
                const photoData = data[photoIdx];
                const baseHeight = photoHeights[photoIdx];

                // Add small deterministic jitter based on position
                const jitterSeed =
                    col * JITTER_COL_MULTIPLIER +
                    photoIndex * JITTER_ROW_MULTIPLIER;
                const jitterAmount =
                    (jitterSeed % JITTER_RANGE) - JITTER_RANGE / 2;
                const height = baseHeight + jitterAmount;

                const x = columnX + currentOffset.x;
                const y = currentY + currentOffset.y;

                if (
                    x + COLUMN_WIDTH >= -GAP &&
                    x <= viewportWidth + GAP &&
                    y + height >= -GAP &&
                    y <= viewportHeight + GAP
                ) {
                    photos.push({
                        id: `${col}-${photoIndex}`,
                        x,
                        y,
                        width: COLUMN_WIDTH,
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

                currentY += height + GAP;

                if (
                    y > viewportHeight + GAP &&
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
