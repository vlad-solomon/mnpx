function PhotoCard({ photo }) {
    return (
        <div
            className="absolute rounded cursor-pointer select-none bg-white/10 sm:border border-white/10 aspect-square sm:rounded overflow-hidden shadow-md"
            style={{
                left: `${photo.x}px`,
                top: `${photo.y}px`,
                width: `${photo.width}px`,
                height: `${photo.height}px`,
            }}
        >
            <img
                src={photo.url}
                alt={photo.slug}
                className="w-full h-full object-cover pointer-events-none"
                loading="lazy"
                draggable="false"
            />
        </div>
    );
}

export default PhotoCard;
