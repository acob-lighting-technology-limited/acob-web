'use client';

import { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleProps {
  direction?: 'up' | 'down';
}

export function ThemeToggle({ direction = 'down' }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<React.ElementRef<'button'>>(null);

  // Close on a click or tap outside, and on Escape (focus goes back to the
  // trigger so keyboard users aren't dropped at the top of the page).
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerOutside = (event: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const themes = [
    {
      name: 'Light',
      value: 'light',
      icon: Sun,
    },
    {
      name: 'Dark',
      value: 'dark',
      icon: Moon,
    },
    {
      name: 'System',
      value: 'system',
      icon: Monitor,
    },
  ];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onBlur={event => {
        // Close once Tab moves focus out of the trigger and its options.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
    >
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        data-theme-toggle
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="theme-options"
        className="group relative overflow-hidden"
      >
        {/* Animated fill effect - fills entire button */}
        <span
          className="absolute inset-0 bg-primary transform scale-0 transition-transform duration-500 ease-out group-hover:scale-[1.02] rounded-md origin-center"
          aria-hidden="true"
        />
        {/* Icon container */}
        <span
          className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
          aria-hidden="true"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0 group-hover:!text-white" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100 group-hover:!text-white" />
        </span>
        <span className="sr-only">Choose Theme</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: direction === 'up' ? 10 : -10,
              scale: 0.95,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: direction === 'up' ? 10 : -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute right-0 w-40 bg-popover rounded-lg shadow-2xl border-[0.5px] border-border overflow-hidden z-50 ${
              direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
            }`}
          >
            <div
              className="p-2"
              id="theme-options"
              role="group"
              aria-label="Theme"
            >
              {themes.map(({ name, value, icon: Icon }, index) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  <button
                    type="button"
                    onClick={() => handleThemeChange(value)}
                    aria-pressed={theme === value}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-[background-color,color,box-shadow,transform] duration-500 group ${
                      theme === value
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:shadow-md transform hover:scale-105'
                    }`}
                  >
                    <div
                      aria-hidden="true"
                      className={`relative w-8 h-8 rounded-full p-1.5 overflow-hidden transition-[background-color,transform] duration-500 flex items-center justify-center ${
                        theme === value
                          ? 'bg-primary'
                          : 'bg-primary/10 group-hover:bg-primary group-hover:scale-110'
                      }`}
                    >
                      {theme !== value && (
                        <div className="absolute inset-0 bg-primary transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center" />
                      )}
                      <Icon
                        className={`h-4 w-4 relative z-10 transition-colors duration-500 ${
                          theme === value
                            ? 'text-primary-foreground'
                            : 'text-muted-foreground group-hover:text-primary-foreground'
                        }`}
                      />
                    </div>
                    <span>{name}</span>
                    {theme === value && (
                      <motion.div
                        layoutId="activeTheme"
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
