'use client';

import { useState, useEffect } from 'react';

interface SpamProtectionProps {
  children: React.ReactNode;
  onValidation: (isValid: boolean) => void;
}

export function SpamProtection({
  children,
  onValidation,
}: SpamProtectionProps) {
  const [isValid, setIsValid] = useState(false);
  const [honeypotValue, setHoneypotValue] = useState('');
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [mouseMovements, setMouseMovements] = useState(0);
  const [keyStrokes, setKeyStrokes] = useState(0);

  useEffect(() => {
    // Track time on page
    const timeInterval = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    // Track mouse movements
    const handleMouseMove = () => {
      setMouseMovements(prev => prev + 1);
    };

    // Track key strokes
    const handleKeyPress = () => {
      setKeyStrokes(prev => prev + 1);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      clearInterval(timeInterval);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    // Validate user behavior
    const validateUser = () => {
      const isHuman =
        timeOnPage >= 5 && // At least 5 seconds on page
        mouseMovements >= 3 && // At least 3 mouse movements
        keyStrokes >= 1 && // At least 1 keystroke
        honeypotValue === ''; // Honeypot field should be empty

      setIsValid(isHuman);
      onValidation(isHuman);
    };

    validateUser();
  }, [timeOnPage, mouseMovements, keyStrokes, honeypotValue, onValidation]);

  return (
    <div className="relative">
      {/* Honeypot field - hidden from users but visible to bots */}
      <div className="absolute -left-[9999px] opacity-0 pointer-events-none">
        <input
          type="text"
          name="website"
          value={honeypotValue}
          onChange={e => setHoneypotValue(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      {/* Hidden validation fields */}
      <input type="hidden" name="time_on_page" value={timeOnPage} />
      <input type="hidden" name="mouse_movements" value={mouseMovements} />
      <input type="hidden" name="key_strokes" value={keyStrokes} />

      {children}
    </div>
  );
}

// Rate limiting hook
export function useRateLimit(
  action: string,
  limit: number = 5,
  windowMs: number = 60000,
) {
  const [attempts, setAttempts] = useState<number[]>([]);

  const isRateLimited = () => {
    const now = Date.now();
    const recentAttempts = attempts.filter(time => now - time < windowMs);

    if (recentAttempts.length >= limit) {
      return true;
    }

    setAttempts([...recentAttempts, now]);
    return false;
  };

  const resetRateLimit = () => {
    setAttempts([]);
  };

  return { isRateLimited, resetRateLimit };
}

// CAPTCHA-like validation
export function useHumanValidation() {
  const [validationState, setValidationState] = useState({
    timeOnPage: 0,
    mouseMovements: 0,
    keyStrokes: 0,
    scrollDepth: 0,
  });

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setValidationState(prev => ({
        ...prev,
        timeOnPage: prev.timeOnPage + 1,
      }));
    }, 1000);

    let mouseMoveCount = 0;
    let keyPressCount = 0;
    let maxScrollDepth = 0;

    // Track mouse movements
    const handleMouseMove = () => {
      mouseMoveCount++;
      setValidationState(prev => ({ ...prev, mouseMovements: mouseMoveCount }));
    };

    // Track key presses
    const handleKeyPress = () => {
      keyPressCount++;
      setValidationState(prev => ({ ...prev, keyStrokes: keyPressCount }));
    };

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        setValidationState(prev => ({ ...prev, scrollDepth: maxScrollDepth }));
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keypress', handleKeyPress);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timeInterval);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keypress', handleKeyPress);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHuman = () => {
    return (
      validationState.timeOnPage >= 10 &&
      validationState.mouseMovements >= 5 &&
      validationState.keyStrokes >= 2 &&
      validationState.scrollDepth >= 20
    );
  };

  return { validationState, isHuman };
}
