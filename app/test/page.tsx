'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { servicesData } from '@/lib/data';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

export default function TestPage() {
  const [currentEffect, setCurrentEffect] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Get first 10 service images
  const images = servicesData.slice(0, 10).map(service => ({
    src: service.image,
    alt: service.title,
  }));

  const effects = [
    {
      name: '1. Fade',
      className: 'transition-opacity duration-1000',
      activeClass: 'opacity-100',
      inactiveClass: 'opacity-0',
    },
    {
      name: '2. Slide Left',
      className: 'transition-transform duration-1000',
      activeClass: 'translate-x-0',
      inactiveClass: 'translate-x-full',
    },
    {
      name: '3. Slide Right',
      className: 'transition-transform duration-1000',
      activeClass: 'translate-x-0',
      inactiveClass: '-translate-x-full',
    },
    {
      name: '4. Slide Up',
      className: 'transition-transform duration-1000',
      activeClass: 'translate-y-0',
      inactiveClass: 'translate-y-full',
    },
    {
      name: '5. Slide Down',
      className: 'transition-transform duration-1000',
      activeClass: 'translate-y-0',
      inactiveClass: '-translate-y-full',
    },
    {
      name: '6. Zoom Fade',
      className: 'transition-all duration-1000',
      activeClass: 'scale-100 opacity-100',
      inactiveClass: 'scale-125 opacity-0',
    },
    {
      name: '7. Zoom Out Fade',
      className: 'transition-all duration-1000',
      activeClass: 'scale-100 opacity-100',
      inactiveClass: 'scale-75 opacity-0',
    },
    {
      name: '8. Rotate Fade',
      className: 'transition-all duration-1000',
      activeClass: 'rotate-0 opacity-100',
      inactiveClass: 'rotate-90 opacity-0',
    },
    {
      name: '9. 3D Flip Horizontal',
      className: 'transition-all duration-1000 [transform-style:preserve-3d]',
      activeClass: '[transform:rotateY(0deg)] opacity-100',
      inactiveClass: '[transform:rotateY(90deg)] opacity-0',
    },
    {
      name: '10. Ken Burns Crossfade',
      className: 'transition-opacity duration-2000',
      activeClass: 'opacity-100 animate-smooth-zoom',
      inactiveClass: 'opacity-0',
    },
    {
      name: '11. 3D Flip Vertical',
      className: 'transition-all duration-1000 [transform-style:preserve-3d]',
      activeClass: '[transform:rotateX(0deg)] opacity-100',
      inactiveClass: '[transform:rotateX(90deg)] opacity-0',
    },
    {
      name: '12. Diagonal Slide Top-Left',
      className: 'transition-all duration-1000',
      activeClass: 'translate-x-0 translate-y-0 opacity-100',
      inactiveClass: '-translate-x-full -translate-y-full opacity-0',
    },
    {
      name: '13. Diagonal Slide Bottom-Right',
      className: 'transition-all duration-1000',
      activeClass: 'translate-x-0 translate-y-0 opacity-100',
      inactiveClass: 'translate-x-full translate-y-full opacity-0',
    },
    {
      name: '14. Rotate Zoom In',
      className: 'transition-all duration-1000',
      activeClass: 'scale-100 rotate-0 opacity-100',
      inactiveClass: 'scale-50 rotate-180 opacity-0',
    },
    {
      name: '15. Rotate Zoom Out',
      className: 'transition-all duration-1000',
      activeClass: 'scale-100 rotate-0 opacity-100',
      inactiveClass: 'scale-150 -rotate-180 opacity-0',
    },
    {
      name: '16. Blur Fade In',
      className: 'transition-all duration-1000',
      activeClass: 'blur-none opacity-100',
      inactiveClass: 'blur-xl opacity-0',
    },
    {
      name: '17. Scale X Slide',
      className: 'transition-all duration-1000',
      activeClass: 'scale-x-100 translate-x-0 opacity-100',
      inactiveClass: 'scale-x-0 -translate-x-20 opacity-0',
    },
    {
      name: '18. Scale Y Slide',
      className: 'transition-all duration-1000',
      activeClass: 'scale-y-100 translate-y-0 opacity-100',
      inactiveClass: 'scale-y-0 translate-y-20 opacity-0',
    },
    {
      name: '19. Skew Left Fade',
      className: 'transition-all duration-1000',
      activeClass: 'skew-x-0 opacity-100',
      inactiveClass: '-skew-x-12 opacity-0',
    },
    {
      name: '20. Skew Right Fade',
      className: 'transition-all duration-1000',
      activeClass: 'skew-x-0 opacity-100',
      inactiveClass: 'skew-x-12 opacity-0',
    },
    {
      name: '21. Bounce Zoom',
      className: 'transition-all duration-[1500ms]',
      activeClass: 'scale-100 opacity-100',
      inactiveClass: 'scale-0 opacity-0',
    },
    {
      name: '22. Swing In',
      className: 'transition-all duration-1000 origin-top',
      activeClass: 'rotate-0 opacity-100',
      inactiveClass: '-rotate-45 opacity-0',
    },
    {
      name: '23. Swing Out',
      className: 'transition-all duration-1000 origin-top',
      activeClass: 'rotate-0 opacity-100',
      inactiveClass: 'rotate-45 opacity-0',
    },
    {
      name: '24. Zoom Blur',
      className: 'transition-all duration-1000',
      activeClass: 'scale-100 blur-none opacity-100',
      inactiveClass: 'scale-150 blur-md opacity-0',
    },
    {
      name: '25. Spiral In',
      className: 'transition-all duration-1200',
      activeClass: 'scale-100 rotate-0 opacity-100',
      inactiveClass: 'scale-0 -rotate-[360deg] opacity-0',
    },
    {
      name: '26. Spiral Out',
      className: 'transition-all duration-1200',
      activeClass: 'scale-100 rotate-0 opacity-100',
      inactiveClass: 'scale-0 rotate-[360deg] opacity-0',
    },
    {
      name: '27. Fold Horizontal',
      className: 'transition-all duration-1000 [transform-style:preserve-3d]',
      activeClass: 'scale-x-100 opacity-100',
      inactiveClass: 'scale-x-0 [transform:rotateY(90deg)] opacity-0',
    },
    {
      name: '28. Fold Vertical',
      className: 'transition-all duration-1000 [transform-style:preserve-3d]',
      activeClass: 'scale-y-100 opacity-100',
      inactiveClass: 'scale-y-0 [transform:rotateX(90deg)] opacity-0',
    },
    {
      name: '29. Wave Distort',
      className: 'transition-all duration-1000',
      activeClass: 'scale-100 skew-x-0 skew-y-0 opacity-100',
      inactiveClass: 'scale-75 skew-x-12 -skew-y-6 opacity-0',
    },
    {
      name: '30. Glitch Fade',
      className: 'transition-all duration-700',
      activeClass: 'translate-x-0 translate-y-0 opacity-100',
      inactiveClass: 'translate-x-4 -translate-y-2 opacity-0',
    },
  ];

  // Auto-play slideshow
  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPlaying, images.length]);

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + images.length) % images.length);
  };

  const currentEffectData = effects[currentEffect];

  return (
    <div className="min-h-screen bg-background py-16">
      <Container>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            10 Beautiful Image Transitions
          </h1>
          <p className="text-muted-foreground mb-8">
            Watch images transition from one to another
          </p>
        </div>

        {/* Main Slideshow */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {currentEffectData.name}
            </h2>

            {/* Image Container */}
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-6">
              {images.map((image, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 ${currentEffectData.className} ${
                    idx === currentImage
                      ? currentEffectData.activeClass
                      : currentEffectData.inactiveClass
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={idx === 0}
                  />
                </div>
              ))}

              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm z-10">
                {currentImage + 1} / {images.length}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevImage}
                title="Previous"
              >
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={nextImage}
                title="Next"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentImage
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Effect Selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {effects.map((effect, index) => (
            <Button
              key={index}
              variant={currentEffect === index ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentEffect(index)}
            >
              {effect.name}
            </Button>
          ))}
        </div>

        {/* Technical Details */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Current Effect</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold">Name:</span>{' '}
                {currentEffectData.name}
              </div>
              <div className="font-mono text-xs bg-muted p-2 rounded">
                <div className="mb-2">
                  <span className="text-green-600">Active:</span>{' '}
                  {currentEffectData.activeClass}
                </div>
                <div>
                  <span className="text-red-600">Inactive:</span>{' '}
                  {currentEffectData.inactiveClass}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Settings</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Auto-play:</strong> {isPlaying ? 'On' : 'Off'}
              </li>
              <li>
                <strong>Interval:</strong> 3 seconds
              </li>
              <li>
                <strong>Total Images:</strong> {images.length}
              </li>
              <li>
                <strong>Transition Duration:</strong> 1-2 seconds
              </li>
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-primary/5 border border-primary/20 rounded-lg p-6 max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold mb-2">How to use:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              • Click on the effect buttons below the slideshow to change
              transitions
            </li>
            <li>
              • Use Play/Pause to control auto-play (images change every 3
              seconds)
            </li>
            <li>• Click Previous/Next arrows to manually navigate</li>
            <li>• Click on the dots to jump to a specific image</li>
            <li>• Watch how each image transitions smoothly to the next</li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
