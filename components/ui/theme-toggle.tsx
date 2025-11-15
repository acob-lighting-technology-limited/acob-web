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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        data-theme-toggle
        onClick={() => setIsOpen(!isOpen)}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
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
            <div className="p-2">
              {themes.map(({ name, value, icon: Icon }, index) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  <button
                    onClick={() => handleThemeChange(value)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all duration-500 group ${
                      theme === value
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:shadow-md transform hover:scale-105'
                    }`}
                  >
                    <div
                      className={`relative w-8 h-8 rounded-full p-1.5 overflow-hidden transition-all duration-500 flex items-center justify-center ${
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
