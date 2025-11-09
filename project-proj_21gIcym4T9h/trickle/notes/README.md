# Infinite Photo Gallery

A high-performance, infinite scrolling photo gallery with masonry-style layout and smooth momentum-based scrolling.

## Features

- **Infinite Scrolling**: Navigate through an endless photo gallery in all directions
- **Masonry Layout**: Variable photo sizes create a dynamic, Pinterest-style layout
- **Momentum Scrolling**: Smooth physics-based scrolling with natural feel
- **High Performance**: Only renders visible photos for optimal performance
- **Mouse/Touch Support**: Drag to scroll with smooth momentum
- **Lazy Loading**: Images load as they come into view

## Components

### InfiniteGallery
Main gallery component that handles:
- Viewport calculation and visible photo rendering
- Mouse/touch drag interactions
- Momentum physics and animation
- Virtual rendering optimization

### PhotoCard
Photo card component that displays individual photos with:
- Image with lazy loading
- Title and author overlay
- Hover effects

## Usage

The gallery generates an infinite masonry layout of photos from Picsum. Drag to explore in any direction and experience smooth momentum scrolling.

## Technical Details

- Uses React hooks for state management
- RequestAnimationFrame for smooth animations
- Virtual rendering - only visible photos are in DOM
- Velocity-based momentum with decay factor
- True masonry layout - photos stack in columns without gaps
- Dynamic photo sizing with variable heights
- Column-based positioning algorithm
- Picsum Photos for placeholder images

Created: 2025-11-09
Modified: 2025-11-09
