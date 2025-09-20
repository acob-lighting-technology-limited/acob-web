'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Image as ImageIcon,
  Video,
  Camera,
  Filter,
  Grid,
  List,
  Play,
  Pause,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';

import Image from 'next/image';
import type { Project } from '@/lib/types';
import { applySanityImagePreset } from '@/lib/utils/sanity-image';

interface GalleryCategoryData {
  category: string;
  projects: Project[];
  images: string[];
  totalImages: number;
}

interface GalleryClientProps {
  galleryData: GalleryCategoryData[];
}

export function GalleryClient({ galleryData }: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentCategoryImages, setCurrentCategoryImages] = useState<string[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Filter gallery data based on selected category
  const filteredData = useMemo(() => {
    if (selectedCategory === 'All') {
      return galleryData;
    }
    return galleryData.filter(data => data.category === selectedCategory);
  }, [selectedCategory, galleryData]);

  // Auto-play functionality
  const startAutoPlay = useCallback((images: string[]) => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    
    setAutoPlayInterval(interval);
    setIsAutoPlaying(true);
  }, [autoPlayInterval]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      setAutoPlayInterval(null);
    }
    setIsAutoPlaying(false);
  }, [autoPlayInterval]);

  // Open image viewer
  const openImageViewer = useCallback((images: string[], startIndex: number = 0) => {
    console.log('Opening image viewer with images:', images);
    console.log('Start index:', startIndex);
    setCurrentCategoryImages(images);
    setCurrentImageIndex(startIndex);
    setIsViewerOpen(true);
    stopAutoPlay(); // Stop any existing auto-play
  }, [stopAutoPlay]);

  // Close image viewer
  const closeImageViewer = useCallback(() => {
    // Exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsViewerOpen(false);
    setIsFullscreen(false);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    stopAutoPlay();
  }, [stopAutoPlay]);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    const modalElement = document.querySelector('[data-gallery-modal]') as HTMLElement;
    if (!modalElement) return;

    if (!document.fullscreenElement) {
      modalElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Zoom functions
  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, []);

  // Drag functions
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  }, [zoomLevel, imagePosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart, zoomLevel]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (zoomLevel === 1) {
      setZoomLevel(2);
    } else {
      setZoomLevel(1);
      setImagePosition({ x: 0, y: 0 });
    }
  }, [zoomLevel]);

  // Navigate images
  const goToPrevious = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev === 0 ? currentCategoryImages.length - 1 : prev - 1
    );
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, [currentCategoryImages.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev === currentCategoryImages.length - 1 ? 0 : prev + 1
    );
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, [currentCategoryImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isViewerOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Escape':
          e.preventDefault();
          closeImageViewer();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case '+':
        case '=':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
          e.preventDefault();
          zoomOut();
          break;
        case '0':
          e.preventDefault();
          resetZoom();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isViewerOpen, goToPrevious, goToNext, closeImageViewer, toggleFullscreen, zoomIn, zoomOut, resetZoom]);

  // Cleanup auto-play on unmount
  useEffect(() => {
    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  }, [autoPlayInterval]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="space-y-8">
      {/* Gallery Controls */}
      <Card className="!border-t-2 !border-t-primary border border-border">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Filter by Category:</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant={selectedCategory === 'All' ? 'default' : 'outline'}
              size="sm"
              className="text-xs"
              onClick={() => setSelectedCategory('All')}
            >
              All Categories
            </Button>
            {galleryData.map(categoryData => (
              <Button
                key={categoryData.category}
                variant={selectedCategory === categoryData.category ? 'default' : 'outline'}
                size="sm"
                className="text-xs"
                onClick={() => setSelectedCategory(categoryData.category)}
              >
                {categoryData.category} ({categoryData.totalImages})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Cards Grid */}
      {filteredData.length === 0 ? (
        <Card className="!border-t-2 !border-t-primary border border-border">
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground mb-4">
              <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No categories found</h3>
              <p>No gallery categories match the selected filter.</p>
            </div>
            <Button variant="outline" onClick={() => setSelectedCategory('All')}>
              View All Categories
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
          {filteredData.map(categoryData => (
            <Card key={categoryData.category} className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 group ${
              viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
            }`}>
              <div className={`${viewMode === 'list' ? 'md:w-1/3' : ''} aspect-[4/3] overflow-hidden relative`}>
                {categoryData.images.length > 0 ? (
                    <Image
                      src={applySanityImagePreset(categoryData.images[0], 'card')}
                      alt={categoryData.category}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Camera className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                
                {/* Overlay with action buttons */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <Button
                      size="sm"
                    onClick={() => {
                      console.log('View All clicked for category:', categoryData.category);
                      console.log('Images:', categoryData.images);
                      openImageViewer(categoryData.images, 0);
                    }}
                      className="bg-white/90 text-black hover:bg-white"
                    >
                      <Maximize2 className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                    {categoryData.images.length > 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (isAutoPlaying) {
                            stopAutoPlay();
                          } else {
                            openImageViewer(categoryData.images, 0);
                            startAutoPlay(categoryData.images);
                          }
                        }}
                        className="bg-white/90 text-black hover:bg-white border-white/50"
                      >
                        {isAutoPlaying ? (
                          <Pause className="h-4 w-4 mr-2" />
                        ) : (
                          <Play className="h-4 w-4 mr-2" />
                        )}
                        {isAutoPlaying ? 'Pause' : 'Auto Play'}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Image count badge */}
                <div className="absolute top-2 right-2">
                  <span className="bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                    {categoryData.totalImages} images
                  </span>
                </div>
              </div>
              
              <CardContent className={`p-4 ${viewMode === 'list' ? 'md:w-2/3 md:flex md:flex-col md:justify-between' : ''}`}>
                <div>
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <span className="bg-muted px-2 py-1 rounded text-xs">{categoryData.category}</span>
                    <span className="mx-2">•</span>
                    <span>{categoryData.projects.length} projects</span>
                  </div>
                  <h3 className={`font-semibold mb-2 text-foreground ${viewMode === 'list' ? 'text-lg' : ''}`}>
                    {categoryData.category}
                  </h3>
                  <p className={`text-sm text-muted-foreground mb-3 ${viewMode === 'list' ? 'text-base' : ''}`}>
                    {categoryData.totalImages > 0 
                      ? `Explore ${categoryData.totalImages} images from ${categoryData.projects.length} projects in this category.`
                      : 'No images available for this category yet.'
                    }
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`${viewMode === 'list' ? 'w-auto' : 'flex-1'}`}
                    onClick={() => {
                      console.log('View Gallery clicked for category:', categoryData.category);
                      console.log('Images:', categoryData.images);
                      setIsViewerOpen(true);
                      setCurrentCategoryImages(categoryData.images);
                      setCurrentImageIndex(0);
                    }}
                    disabled={categoryData.images.length === 0}
                  >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    View Gallery
                  </Button>
                  {categoryData.images.length > 1 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        if (isAutoPlaying) {
                          stopAutoPlay();
                        } else {
                          openImageViewer(categoryData.images, 0);
                          startAutoPlay(categoryData.images);
                        }
                      }}
                      className="px-3"
                    >
                      {isAutoPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Image Viewer Modal */}
      {isViewerOpen && currentCategoryImages.length > 0 && (
        <div 
          data-gallery-modal
          className={`fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 ${
            isFullscreen ? 'bg-black' : 'bg-black/90'
          }`}
        >
          <div className={`relative w-full h-full flex flex-col ${
            isFullscreen ? 'max-w-none max-h-none' : 'max-w-7xl max-h-[90vh]'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-black/50 text-white">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">
                  {currentImageIndex + 1} of {currentCategoryImages.length}
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (isAutoPlaying) {
                        stopAutoPlay();
                      } else {
                        startAutoPlay(currentCategoryImages);
                      }
                    }}
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  >
                    {isAutoPlaying ? (
                      <Pause className="h-4 w-4 mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    {isAutoPlaying ? 'Pause' : 'Auto Play'}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={zoomOut}
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                    disabled={zoomLevel <= 0.5}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm px-2">{Math.round(zoomLevel * 100)}%</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={zoomIn}
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                    disabled={zoomLevel >= 3}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={resetZoom}
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                    disabled={zoomLevel === 1}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Fullscreen Button */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={toggleFullscreen}
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
                
                {/* Close Button */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={closeImageViewer}
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image Container */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              {currentCategoryImages[currentImageIndex] && (
                <div 
                  className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onDoubleClick={handleDoubleClick}
                >
                  <img
                    src={currentCategoryImages[currentImageIndex]}
                    alt={`Gallery image ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain transition-all duration-300 ease-out"
                    style={{ 
                      maxHeight: isFullscreen ? '100vh' : '70vh',
                      transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                      transformOrigin: 'center center',
                      transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', currentCategoryImages[currentImageIndex]);
                      console.error('Error:', e);
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', currentCategoryImages[currentImageIndex]);
                    }}
                    draggable={false}
                  />
                </div>
              )}
            </div>

            {/* Navigation */}
            {currentCategoryImages.length > 1 && (
              <>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm text-center">
              <div>Use arrow keys to navigate • Press ESC to close</div>
              <div>F for fullscreen • +/- to zoom • 0 to reset • Double-click to zoom</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
