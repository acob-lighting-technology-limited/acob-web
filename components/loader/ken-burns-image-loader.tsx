'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function KenBurnsImageLoader() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Ken Burns effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ken-burns-loader"
        style={{
          backgroundImage: `url('/images/olooji-community.jpg?height=800&width=1400')`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-primary-foreground text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">ACOB Lighting</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Powering a brighter future...
          </p>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          >
            <Loader2 className="h-12 w-12 text-primary mx-auto" />
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes ken-burns-loader {
          0% {
            transform: scale(1);
            transform-origin: center center;
          }
          100% {
            transform: scale(1.15);
            transform-origin: center center;
          }
        }
        .animate-ken-burns-loader {
          animation: ken-burns-loader 20s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
