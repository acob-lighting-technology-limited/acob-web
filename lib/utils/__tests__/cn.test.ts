import { cn } from '../cn';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500');
  });

  it('should handle conditional classes', () => {
    expect(cn('base-class', true && 'conditional-class')).toBe(
      'base-class conditional-class'
    );
    expect(cn('base-class', false && 'conditional-class')).toBe('base-class');
  });

  it('should handle tailwind merge conflicts', () => {
    // Later class should override earlier class
    const result = cn('p-4', 'p-8');
    expect(result).toBe('p-8');
  });

  it('should handle empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('', '')).toBe('');
  });

  it('should handle arrays', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });
});
