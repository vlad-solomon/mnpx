import { urlFor } from "../../sanity";

const JITTER_RANGE = 30;
const COLUMN_PRIME = 3571;
const JITTER_COL_MULTIPLIER = 17;
const JITTER_ROW_MULTIPLIER = 23;

export default function generatePhotos(data, currentOffset, gap, columnWidth) {
    if (!data || data.length === 0) return [];

    const photos = [];

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const numColumns = Math.ceil(viewportWidth / (columnWidth + gap)) + 8;
    const startCol = Math.floor(-currentOffset.x / (columnWidth + gap)) - 4;

    // Pre-calculate heights for each photo based on aspect ratio
    const photoHeights = data.map((photoData) => {
        const dims = photoData.image.asset.metadata?.dimensions;
        if (!dims) return columnWidth * 1.5; // fallback aspect ratio
        const aspectRatio = dims.height / dims.width;
        return columnWidth * aspectRatio;
    });

    const avgHeight =
        photoHeights.reduce((sum, h) => sum + h, 0) / photoHeights.length;
    const photosPerColumn = Math.ceil(viewportHeight / avgHeight) + 32;

    for (let col = startCol; col < startCol + numColumns; col++) {
        const columnX = col * (columnWidth + gap);
        const visibleStartY = -currentOffset.y - viewportHeight * 1.5;

        const startPhotoIndex =
            Math.floor(visibleStartY / (avgHeight + gap)) - 16;

        // Create a column-specific offset that's consistent for this column
        const colOffset = ((col % data.length) + data.length) % data.length;
        const colMultiplier = (Math.abs(col) * COLUMN_PRIME) % data.length;
        const finalColOffset = (colOffset + colMultiplier) % data.length;

        let currentY = 0;
        for (let i = 0; i < startPhotoIndex; i++) {
            const photoIdx = ((i % data.length) + finalColOffset) % data.length;
            const baseHeight = photoHeights[photoIdx];
            const jitterSeed =
                col * JITTER_COL_MULTIPLIER + i * JITTER_ROW_MULTIPLIER;
            const jitterAmount = (jitterSeed % JITTER_RANGE) - JITTER_RANGE / 2;
            const height = baseHeight + jitterAmount;
            currentY += height + gap;
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
                currentY -= height + gap;
            }
        }

        for (
            let photoIndex = startPhotoIndex;
            photoIndex < startPhotoIndex + photosPerColumn;
            photoIndex++
        ) {
            const photoIdx =
                ((((photoIndex % data.length) + data.length) % data.length) +
                    finalColOffset) %
                data.length;
            const photoData = data[photoIdx];
            const baseHeight = photoHeights[photoIdx];

            // Add small deterministic jitter based on position
            const jitterSeed =
                col * JITTER_COL_MULTIPLIER +
                photoIndex * JITTER_ROW_MULTIPLIER;
            const jitterAmount = (jitterSeed % JITTER_RANGE) - JITTER_RANGE / 2;
            const height = baseHeight + jitterAmount;

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
                    url: urlFor(photoData.image.asset._ref).width(400).url(),
                    slug: photoData.slug.current,
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
}
