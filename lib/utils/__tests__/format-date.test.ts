import { formatDate } from '../format-date';

describe('formatDate utility function', () => {
  it('should format ISO date string correctly', () => {
    const date = '2024-01-15T10:30:00Z';
    const formatted = formatDate(date);
    expect(formatted).toMatch(/Jan(uary)? 15, 2024/);
  });

  it('should format Date object correctly', () => {
    const date = new Date('2024-06-20T15:45:00Z');
    const formatted = formatDate(date);
    expect(formatted).toMatch(/Jun(e)? 20, 2024/);
  });

  it('should handle custom format', () => {
    const date = '2024-03-10T08:00:00Z';
    const formatted = formatDate(date, 'yyyy-MM-dd');
    expect(formatted).toBe('2024-03-10');
  });

  it('should handle invalid date gracefully', () => {
    const formatted = formatDate('invalid-date');
    expect(formatted).toBe('Invalid Date');
  });
});
