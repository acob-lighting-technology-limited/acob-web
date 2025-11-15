import { productsData, productCategories } from '../products-data';

describe('Products Data', () => {
  describe('productsData', () => {
    it('should have valid product entries', () => {
      expect(productsData.length).toBeGreaterThan(0);

      productsData.forEach(product => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('category');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('specifications');
        expect(product).toHaveProperty('features');
        expect(product).toHaveProperty('image');
        expect(product).toHaveProperty('warranty');
        expect(product).toHaveProperty('applications');
      });
    });

    it('should have unique product IDs', () => {
      const ids = productsData.map(p => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid categories', () => {
      const validCategories = [
        'solar-panels',
        'inverters',
        'batteries',
        'accessories',
      ];

      productsData.forEach(product => {
        expect(validCategories).toContain(product.category);
      });
    });

    it('should have non-empty specifications', () => {
      productsData.forEach(product => {
        expect(product.specifications.length).toBeGreaterThan(0);
        product.specifications.forEach(spec => {
          expect(spec.label).toBeTruthy();
          expect(spec.value).toBeTruthy();
        });
      });
    });

    it('should have non-empty features', () => {
      productsData.forEach(product => {
        expect(product.features.length).toBeGreaterThan(0);
        product.features.forEach(feature => {
          expect(feature.length).toBeGreaterThan(10); // Reasonable feature description length
        });
      });
    });
  });

  describe('productCategories', () => {
    it('should have category definitions', () => {
      expect(productCategories.length).toBe(4);

      productCategories.forEach(category => {
        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('description');
        expect(category).toHaveProperty('icon');
      });
    });
  });
});
