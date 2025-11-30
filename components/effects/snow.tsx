'use client';

import { useEffect, useRef } from 'react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  density: number;
  speed: number;
  angle: number;
  opacity: number;
  drift: number;
}

interface SnowProps {
  speed?: 'slow' | 'avg' | 'fast';
  intensity?: 'low' | 'medium' | 'high';
}

export function Snow({ speed = 'avg', intensity = 'medium' }: SnowProps) {
  // eslint-disable-next-line no-undef
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Speed configuration
    const speedConfig = {
      slow: 0.5,
      avg: 1,
      fast: 1.8,
    };
    const speedMultiplier = speedConfig[speed];

    // Intensity configuration (number of snowflakes)
    const intensityConfig = {
      low: 50,
      medium: 100,
      high: 200,
    };
    const snowflakeCount = intensityConfig[intensity];

    // Create snowflakes
    const snowflakes: Snowflake[] = [];
    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push(createSnowflake(canvas.width, canvas.height, true));
    }

    function createSnowflake(
      maxX: number,
      maxY: number,
      initial = false,
    ): Snowflake {
      return {
        x: Math.random() * maxX,
        y: initial ? Math.random() * maxY : -10,
        radius: Math.random() * 3 + 1, // Size between 1-4px
        density: Math.random() * 30 + 1,
        speed: (Math.random() * 1 + 0.5) * speedMultiplier,
        angle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.5, // 0.5 to 1
        drift: Math.random() * 0.5 - 0.25, // Horizontal drift
      };
    }

    // Animation
    let animationFrame: number;
    let lastTime = 0;

    function animate(currentTime: number) {
      const _deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw each snowflake
      snowflakes.forEach((flake, index) => {
        // Update position
        flake.y += flake.speed;
        flake.x += Math.sin(flake.angle) * 0.5 + flake.drift;
        flake.angle += 0.01;

        // Reset snowflake when it goes off screen
        if (flake.y > canvas.height) {
          snowflakes[index] = createSnowflake(canvas.width, canvas.height);
        }
        if (flake.x > canvas.width + 10) {
          flake.x = -10;
        } else if (flake.x < -10) {
          flake.x = canvas.width + 10;
        }

        // Draw snowflake
        ctx.save();
        ctx.globalAlpha = flake.opacity;
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';

        // Draw a more realistic snowflake shape
        const spikes = 6;
        const outerRadius = flake.radius;
        const innerRadius = flake.radius * 0.5;

        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (Math.PI / spikes) * i + flake.angle * 0.1;
          const x = flake.x + Math.cos(angle) * radius;
          const y = flake.y + Math.sin(angle) * radius;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();

        // Add a smaller center circle for more detail
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius * 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationFrame = requestAnimationFrame(animate);
    }

    animationFrame = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [speed, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        mixBlendMode: 'screen',
      }}
    />
  );
}
