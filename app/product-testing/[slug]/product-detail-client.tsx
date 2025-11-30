'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Share2, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { ContactDialog } from '@/components/products/contact-dialog';
import { Lightbox } from '@/components/ui/lightbox';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface ProductDetailClientProps {
  images: Array<{
    asset: { url: string };
    alt?: string;
    title?: string;
    _type?: string;
  }>;
  productTitle: string;
  availability?: string;
}

export function ProductDetailClient({
  images,
  productTitle,
  availability,
}: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Check if screen is lg or larger
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint is 1024px
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: productTitle,
          text: `Check out ${productTitle}`,
          url: url,
        });
      } catch {
        // User cancelled or share failed
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard!');
  };

  const nextImage = () => {
    setSelectedImage(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage(prev => (prev - 1 + images.length) % images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isLargeScreen) {
      return;
    }

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (isLargeScreen) {
      setShowZoom(true);
    }
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
    setShowZoom(false);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleContactClick = () => {
    if (availability === 'out-of-stock') {
      toast.error('This product is currently out of stock');
      return;
    }
    setIsContactOpen(true);
  };

  return (
    <>
      <div className="space-y-4 ">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Thumbnail Gallery - Side */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex lg:flex-col gap-2 order-2 lg:order-1 lg:self-start"
            >
              {images.map((image, index) => {
                const isVideo =
                  image._type === 'file' ||
                  image._type === 'video' ||
                  image.asset?.url?.match(/\.(mp4|webm|ogg|mov)$/i);
                const mediaTitle =
                  image.title || image.alt || `${productTitle} ${index + 1}`;

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-14 h-14 lg:w-16 lg:h-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                      selectedImage === index
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-transparent hover:border-muted-foreground/30'
                    }`}
                  >
                    {isVideo ? (
                      <video
                        src={image.asset?.url}
                        className="object-cover w-full h-full"
                        muted
                        playsInline
                        aria-label={mediaTitle}
                      />
                    ) : (
                      <Image
                        src={image.asset?.url || '/placeholder.svg'}
                        alt={mediaTitle}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* Main Image Container */}
          <div className="flex-1 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted group"
              ref={imageRef}
              onMouseMove={isLargeScreen ? handleMouseMove : undefined}
              onMouseEnter={isLargeScreen ? handleMouseEnter : undefined}
              onMouseLeave={handleMouseLeave}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  {(() => {
                    const currentItem = images[selectedImage];
                    const isVideo =
                      currentItem?._type === 'file' ||
                      currentItem?._type === 'video' ||
                      currentItem?.asset?.url?.match(/\.(mp4|webm|ogg|mov)$/i);
                    const mediaTitle =
                      currentItem?.title || currentItem?.alt || productTitle;

                    if (isVideo) {
                      return (
                        <video
                          src={currentItem?.asset?.url}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={openLightbox}
                          controls={false}
                          muted
                          playsInline
                          aria-label={mediaTitle}
                        />
                      );
                    }

                    return (
                      <div
                        className="w-full h-full transition-transform duration-200 ease-out"
                        onClick={openLightbox}
                        style={{
                          backgroundImage: `url(${currentItem?.asset?.url || '/placeholder.svg'})`,
                          backgroundSize:
                            showZoom && isLargeScreen ? '300%' : '100%',
                          backgroundPosition:
                            showZoom && isLargeScreen
                              ? `${zoomPosition.x}% ${zoomPosition.y}%`
                              : 'center',
                          backgroundRepeat: 'no-repeat',
                          cursor:
                            showZoom && isLargeScreen ? 'zoom-in' : 'pointer',
                        }}
                      />
                    );
                  })()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-3 lg:static fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t lg:border-t-0 lg:bg-transparent lg:backdrop-blur-none z-50 lg:z-auto"
        >
          <Button
            onClick={handleContactClick}
            size="lg"
            className={`flex-1 ${
              availability === 'out-of-stock'
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            <Phone className="mr-2 h-5 w-5" />
            Contact Us
          </Button>
          <Button onClick={handleShare} size="lg" variant="outline">
            <Share2 className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      <ContactDialog
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        productName={productTitle}
      />

      {/* Lightbox */}
      <Lightbox
        media={images.map(img => {
          const isVideo =
            img._type === 'file' ||
            img._type === 'video' ||
            img.asset?.url?.match(/\.(mp4|webm|ogg|mov)$/i);
          return {
            src: img.asset?.url || '/placeholder.svg',
            alt: img.title || img.alt || productTitle,
            type: (isVideo ? 'video' : 'image') as 'image' | 'video',
          };
        })}
        initialIndex={selectedImage}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
      />
    </>
  );
}
