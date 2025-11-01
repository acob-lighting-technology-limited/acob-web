import { useEffect, useState, useRef, ReactNode } from 'react';

interface AnimatedFillTextProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  sequential?: boolean;
  delay?: number;
}

export function AnimatedFillText({
  children,
  className = '',
  duration = 1.2,
  sequential = false,
  delay = 0,
}: AnimatedFillTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (sequential) {
            // Add delay for sequential animations
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [sequential, delay]);

  return (
    <div
      ref={ref}
      className="relative inline-block m-1 transition-all duration-500"
    >
      <div
        className={`relative z-10 ${className} text-primary-foreground dark:text-primary-foreground p-2 w-fit h-fit`}
      >
        {children}
      </div>
      <div
        className={`absolute inset-0 bg-primary rounded-sm transition-all ease-out ${
          isVisible ? 'w-full' : 'w-0'
        }`}
        style={{
          animation: isVisible
            ? `fillLeft ${duration}s ease-out forwards`
            : 'none',
        }}
      />
      <style>{`
        @keyframes fillLeft {
          from {
            width: 0%;
            left: 0;
          }
          to {
            width: 100%;
            left: 0;
          }
        }
      `}</style>
    </div>
  );
}
