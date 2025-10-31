'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface SimpleSpinnerExitProps {
  preview?: boolean;
  children?: ReactNode;
  loadingDuration?: number;
}

export default function SimpleSpinnerExit({
  preview = false,
  children,
  loadingDuration = 3000,
}: SimpleSpinnerExitProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (preview) {
      return;
    }

    // Auto exit after specified duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, [preview, loadingDuration]);

  // Preview mode - just show the spinner
  if (preview) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative">
          {/* Glowing background circles */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 -m-8 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="absolute inset-0 -m-12 bg-green-500/20 rounded-full blur-3xl"
          />

          {/* Logo with animations */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-10"
          >
            <motion.div
              animate={{
                filter: [
                  'drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))',
                  'drop-shadow(0 0 40px rgba(34, 197, 94, 0.8))',
                  'drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Image
                src="/images/acob-loader.png"
                alt="Loading..."
                width={120}
                height={120}
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 -m-4"
          >
            <div className="w-full h-full rounded-full border-2 border-transparent border-t-primary/50 border-r-primary/30" />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: '-100vh' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden"
        >
          {/* Animated gradient background */}
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0"
          />

          <Button
            onClick={() => window.location.reload()}
            variant="ghost"
            size="sm"
            className="absolute top-6 left-6 z-20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="text-center relative z-10">
            <div className="relative mb-8">
              {/* Glowing background circles */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 -m-8 bg-primary/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className="absolute inset-0 -m-12 bg-green-500/20 rounded-full blur-3xl"
              />

              {/* Logo with animations */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10"
              >
                <motion.div
                  animate={{
                    filter: [
                      'drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))',
                      'drop-shadow(0 0 40px rgba(34, 197, 94, 0.8))',
                      'drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Image
                    src="/images/acob-loader.png"
                    alt="Loading..."
                    width={120}
                    height={120}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain mx-auto"
                    priority
                  />
                </motion.div>
              </motion.div>

              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 -m-4 flex items-center justify-center"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-transparent border-t-primary/50 border-r-primary/30" />
              </motion.div>
            </div>

            <motion.h2
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-2xl font-semibold text-foreground mb-2"
            >
              Loading...
            </motion.h2>
            <motion.p
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.3,
              }}
              className="text-muted-foreground"
            >
              Please wait while we prepare your content
            </motion.p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ y: '100vh' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
