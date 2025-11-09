function PhotoCard({ photo }) {
    return (
        <div
            className="absolute rounded overflow-hidden shadow-lg cursor-pointer select-none"
            style={{
                left: `${photo.x}px`,
                top: `${photo.y}px`,
                width: `${photo.width}px`,
                height: `${photo.height}px`,
            }}
        >
            <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover pointer-events-none"
                loading="lazy"
                draggable="false"
            />
        </div>
    );
}

export default PhotoCard;
