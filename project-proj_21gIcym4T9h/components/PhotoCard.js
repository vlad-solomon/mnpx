function PhotoCard({ photo }) {
  try {
    return (
      <div
        className="absolute rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer bg-white select-none"
        style={{
          left: `${photo.x}px`,
          top: `${photo.y}px`,
          width: `${photo.width}px`,
          height: `${photo.height}px`,
        }}
        data-name="photo-card"
        data-file="components/PhotoCard.js"
      >
        <img
          src={photo.url}
          alt={photo.title}
          className="w-full h-full object-cover pointer-events-none"
          loading="lazy"
          draggable="false"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-semibold text-sm">{photo.title}</h3>
          <p className="text-white/80 text-xs mt-1">{photo.author}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PhotoCard component error:', error);
    return null;
  }
}