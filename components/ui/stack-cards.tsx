'use client';

import React, { useRef, useMemo } from 'react';
import {
  motion,
  useTransform,
  MotionValue,
  useMotionValue,
} from 'framer-motion';
import { Button } from './button';
import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
  i: number;
  title: string;
  description: string;
  images: { asset: { url: string } }[]; // Updated to match Sanity image asset structure
  location: string;
  url?: string;
  color?: string;
  gradientFrom: string;
  gradientTo: string;
  progress: MotionValue<number> | { get: () => number };
  range: number[];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  i = 0,
  title = '',
  description = '',
  images = [], // Default to empty array
  location = 'Nigeria',
  url = '#',

  gradientFrom = '#000000',
  gradientTo = '#000000',
  progress = { get: () => 0 }, // Mocked for safety
  range = [0, 1],
  targetScale = 1,
}) => {
  const container = useRef(null);

  // Create a fallback MotionValue if progress is not a MotionValue
  const fallbackProgress = useMotionValue(0);
  const actualProgress = 'get' in progress ? fallbackProgress : progress;

  const scale = useTransform(actualProgress, range, [1, targetScale]);

  // Memoize expensive computations
  const processedTitle = useMemo(
    () => (title.length > 50 ? `${title.slice(0, 50)}...` : title),
    [title],
  );

  const processedDescription = useMemo(
    () =>
      description.split(' ').length > 40
        ? `${description.split(' ').slice(0, 40).join(' ')}...`
        : description,
    [description],
  );

  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
      scale,
      top: `calc(-1vh + ${i * 25}px)`,
    }),
    [gradientFrom, gradientTo, scale, i],
  );

  return (
    <div
      ref={container}
      className="h-[80vh] sm:h-screen m-4 flex items-center text-white  justify-center sticky top-20 sm:top-0"
    >
      <motion.div
        style={backgroundStyle}
        className="relative -top-1/4 h-full sm:h-[600px] w-[1300px] rounded-[20px] p-4 py-6 lg:p-16 flex flex-col transform origin-top"
      >
        <div className="flex flex-col sm:flex-row justify-between h-full gap-8 lg:gap-16">
          {/* Description Section */}

          <div className="w-full sm:w-1/2 flex flex-col flex-1 h-full max-w-md">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-5xl font-extrabold text-left">
                {processedTitle}
              </h2>

              <p className="text-base lg:text-xl leading-relaxed line-clamp-3 md:line-clamp-none">
                {processedDescription}
              </p>

              <p className="flex gap-2 text-lg items-center">
                <MapPin />
                {location}
              </p>
            </div>

            <div className="sm:mt-auto pt-6">
              <Link href={url}>
                {' '}
                {/* Use the passed URL */}
                <Button className="bg-[#07F507]/70 text-lg py-6 !px-8 hover:bg-[#07F507]/60 text-white">
                  View Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full sm:w-1/2 h-full flex-1 rounded-[20px] overflow-hidden">
            {(() => {
              const validImages = images.filter(img => img?.asset?.url);

              if (validImages.length === 1) {
                // Single image - full height
                return (
                  <div className="relative rounded-[16px] overflow-hidden h-full">
                    <Image
                      src={`${validImages[0].asset.url}?w=600&h=400&fit=crop&auto=format&q=75`}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              } else if (validImages.length === 2) {
                // Two images - side by side
                return (
                  <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="relative rounded-[16px] overflow-hidden">
                      <Image
                        src={`${validImages[0].asset.url}?w=300&h=400&fit=crop&auto=format&q=75`}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative rounded-[16px] overflow-hidden">
                      <Image
                        src={`${validImages[1].asset.url}?w=300&h=400&fit=crop&auto=format&q=75`}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                );
              } else if (validImages.length >= 3) {
                // Three or more images - grid layout
                return (
                  <div className="grid grid-rows-2 grid-cols-2 gap-4 h-full">
                    <div className="row-span-1 col-span-2 relative rounded-[16px] overflow-hidden">
                      <Image
                        src={`${validImages[0].asset.url}?w=600&h=200&fit=crop&auto=format&q=75`}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative rounded-[16px] overflow-hidden">
                      <Image
                        src={`${validImages[1].asset.url}?w=300&h=200&fit=crop&auto=format&q=75`}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative rounded-[16px] overflow-hidden">
                      <Image
                        src={`${validImages[2].asset.url}?w=300&h=200&fit=crop&auto=format&q=75`}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                );
              } else {
                // No images - placeholder
                return (
                  <div className="h-full bg-muted/20 rounded-[16px] flex items-center justify-center">
                    <span className="text-muted-foreground">
                      No images available
                    </span>
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
