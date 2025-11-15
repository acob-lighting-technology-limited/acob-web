import { faqData, faqCategories } from '../faq-data';

describe('FAQ Data', () => {
  describe('faqData', () => {
    it('should have FAQ entries', () => {
      expect(faqData.length).toBeGreaterThan(20);

      faqData.forEach(faq => {
        expect(faq).toHaveProperty('question');
        expect(faq).toHaveProperty('answer');
        expect(faq).toHaveProperty('category');
      });
    });

    it('should have valid categories', () => {
      faqData.forEach(faq => {
        expect(faqCategories).toContain(faq.category);
      });
    });

    it('should have meaningful questions', () => {
      faqData.forEach(faq => {
        expect(faq.question.length).toBeGreaterThan(10);
        expect(faq.question).toMatch(/\?$/); // Questions should end with ?
      });
    });

    it('should have comprehensive answers', () => {
      faqData.forEach(faq => {
        expect(faq.answer.length).toBeGreaterThan(50); // Reasonable answer length
      });
    });

    it('should cover all defined categories', () => {
      const usedCategories = new Set(faqData.map(faq => faq.category));

      faqCategories.forEach(category => {
        expect(usedCategories.has(category)).toBe(true);
      });
    });
  });

  describe('faqCategories', () => {
    it('should have category definitions', () => {
      expect(faqCategories.length).toBeGreaterThan(0);

      faqCategories.forEach(category => {
        expect(typeof category).toBe('string');
        expect(category.length).toBeGreaterThan(0);
      });
    });
  });
});
