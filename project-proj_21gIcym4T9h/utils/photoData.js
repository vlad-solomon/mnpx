function generatePhotos(offset) {
  const photos = [];
  const columnWidth = 280;
  const gap = 16;
  const minHeight = 180;
  const maxHeight = 450;
  
  const categories = ['nature', 'architecture', 'food', 'animals', 'travel', 'technology'];
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  const numColumns = Math.ceil(viewportWidth / (columnWidth + gap)) + 8;
  const startCol = Math.floor(-offset.x / (columnWidth + gap)) - 4;
  
  const photosPerColumn = Math.ceil(viewportHeight / minHeight) + 16;
  
  for (let col = startCol; col < startCol + numColumns; col++) {
    const columnX = col * (columnWidth + gap);
    const visibleStartY = -offset.y - viewportHeight;
    const visibleEndY = -offset.y + viewportHeight * 2;
    
    // Calculate starting photoIndex based on visible start Y (can be negative)
    const avgHeight = (minHeight + maxHeight) / 2;
    const startPhotoIndex = Math.floor(visibleStartY / (avgHeight + gap)) - 8;
    
    // Calculate Y position for the starting photo index
    let currentY = startPhotoIndex * (avgHeight + gap);
    
    // Recalculate actual Y position using real heights
    let tempY = 0;
    for (let i = 0; i < startPhotoIndex; i++) {
      const seed = (col * 7919 + i * 4283);
      const height = minHeight + (Math.abs(seed) % (maxHeight - minHeight));
      tempY += height + gap;
    }
    currentY = tempY;
    
    // Handle negative indices by working backwards
    if (startPhotoIndex < 0) {
      currentY = 0;
      for (let i = -1; i >= startPhotoIndex; i--) {
        const seed = (col * 7919 + i * 4283);
        const height = minHeight + (Math.abs(seed) % (maxHeight - minHeight));
        currentY -= (height + gap);
      }
    }
    
    // Generate visible photos
    for (let photoIndex = startPhotoIndex; photoIndex < startPhotoIndex + photosPerColumn; photoIndex++) {
      const seed = (col * 7919 + photoIndex * 4283);
      const height = minHeight + (Math.abs(seed) % (maxHeight - minHeight));
      const category = categories[Math.abs(seed) % categories.length];
      const photoId = Math.abs(seed) % 100;
      
      const x = columnX + offset.x;
      const y = currentY + offset.y;
      
      if (x + columnWidth >= -gap && x <= viewportWidth + gap &&
          y + height >= -gap && y <= viewportHeight + gap) {
        photos.push({
          id: `${col}-${photoIndex}`,
          x,
          y,
          width: columnWidth,
          height,
          url: `https://picsum.photos/seed/${seed}/400/600`,
          title: `${category.charAt(0).toUpperCase() + category.slice(1)} Photo ${photoId}`,
          author: `Photographer ${Math.abs(seed) % 50 + 1}`,
        });
      }
      
      currentY += height + gap;
      
      if (y > viewportHeight + gap && photoIndex > startPhotoIndex + photosPerColumn / 2) {
        break;
      }
    }
  }
  
  return photos;
}
